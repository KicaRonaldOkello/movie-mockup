import { Component, OnInit } from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslationService} from '../../../services/translation/translation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import Helpers from '../../../helpers/helpers';
import * as moment from 'moment';
import {OrderService} from '../../../services/order/order.service';

declare var cloudinary: any;
declare var getpaidSetup: any;
@Component({
  selector: 'app-tanslator-details',
  templateUrl: './tanslator-details.component.html',
  styleUrls: ['./tanslator-details.component.scss']
})
export class TanslatorDetailsComponent implements OnInit {

  uploadUrl;
  paymentVerification;
  payment;
  urlOrigin;
  package;
  userData;
  loadingProfileImage = true;
  loadingPage = true;
  amountToPay = 0;
  isLiveTranslation = false;
  chosenTranslationType;
  hasChosenTranslationType = false;
  liveTranslationForm: FormGroup;
  isSubmitted = false;
  revealEmail = false;
  notFound;
  constructor(
    private shareDataService: ShareDataService,
    private activatedRoute: ActivatedRoute,
    private translationService: TranslationService,
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.shareDataService.showAd('true');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getTranslationPackage(params.id);
    });
    this.liveTranslationForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      meetingLink: ['', Validators.required],
    });
    this.userData = Helpers.getUserData();

    this.urlOrigin =  window.location.origin;
    this.paymentVerification = this.route.snapshot.queryParamMap.get('paymentVerification');
    this.payment = this.route.snapshot.queryParamMap.get('payment');
    this.failureMessage();
  }

  searchTranslationPackage(event) {
    this.shareDataService.searchTranslations(event);
    this.router.navigateByUrl('/translation');
  }

  getTranslationPackage(id) {
    this.translationService.getTranslatorPackage(id).subscribe(res => {
      this.loadingPage = false;
      if (res.status.statusCode === '100') {
        this.notFound = res.status.statusDesc;
      } else if (res.status.statusCode === '0') {
        this.package = res;
      }
    });
  }

  packageToPay(chosenPackage) {
    this.hasChosenTranslationType = true;
    this.chosenTranslationType = chosenPackage;
    this.amountToPay = this.package[chosenPackage];
    chosenPackage === 'liveTranslationPrice' ? this.isLiveTranslation = true : this.isLiveTranslation = false;
  }

  chosenTime(event) {
    this.liveTranslationForm.patchValue({time: event});
  }

  upload() {
    const myWidget = cloudinary.createUploadWidget({
        cloudName: environment.cloudName,
        uploadPreset: environment.uploadPreset,
        multiple: false,
        maxVideoFileSize: environment.maxVideoFileSize,
        maxAudioFileSize: environment.maxVideoFileSize,
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.uploadUrl = result.info.secure_url;
        } else if (error) {
          return this.snackBar.open('Your attachment was not successfully uploaded.', '', {
            duration: 5000,
            panelClass: ['red-snackbar']
          });
        }
      }
    );
    myWidget.open();
  }

  payNow() {
    this.isSubmitted = true;
    const data = {
      id: 0,
      orderType: 'TRANSLATOR_PACKAGES',
      totalAmount: this.amountToPay,
      payerId: this.userData.userId,
      currencyCode: this.package.currencyCode,
      comments: this.getComment(),
      originalItemId: this.package.id,
      originalSellerId: this.package.ownerId,
    };

    !this.isLiveTranslation ? data['attachments'] = [this.uploadUrl] : null;

    this.orderService.saveOrder(data).subscribe(res => {
      this.payWithRave(res.id);
    });
  }

  getComment() {
    if (this.isLiveTranslation) {
      const { date, time, meetingLink } = this.liveTranslationForm.value;
      const finalDate = moment(date).format('DD/MM/YYYY');
      return `Type=LIVE,Date=${finalDate},Time=${time},MeetingLink=${meetingLink}`;
    } else {
      return this.chosenTranslationType.slice(0, -16).toUpperCase();
    }
  }

  payWithRave(transactionId) {
    const x = getpaidSetup({
      amount: this.amountToPay,
      txref: transactionId,
      PBFPubKey: environment.rave_publicKey,
      customer_email: this.userData.userId,
      currency: this.package.currencyCode,
      onClose: () => {},
      callback: (response) => {
        const txref = response.tx.txRef;
        const flutterwaveRef = response.tx.flwRef;
        if (response.tx.chargeResponseCode === '00' || response.tx.chargeResponseCode === '0') {
          this.verifyPayment({OriginalOrderRef: txref, FlutterWaveRef: flutterwaveRef});
        } else {
          window.location.replace(`${window.location.href}?payment=Fail`);
        }
      }
    });

  }

  verifyPayment = (data) => {
    this.orderService.verifyFlutterWavePayment(data).subscribe((res: any) => {
      if (res.statusCode === '0') {
        window.location.replace(`${this.urlOrigin}/translation?payment=Success`);
      } else {
        window.location.replace(`${window.location.href}?paymentVerification=Fail`);
      }
    });
  };

  failureMessage() {
    let message = '';
    if (this.paymentVerification === 'Fail') {
      message = 'Your payment verification was not successful. Please try again';
      this.snackBar.open(message, '', {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    } else if (this.payment === 'Fail') {
      message = 'Payment not successful. Please try again';
      this.snackBar.open(message, '', {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    }

  }
}
