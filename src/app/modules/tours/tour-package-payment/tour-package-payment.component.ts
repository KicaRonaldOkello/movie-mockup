import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {ActivatedRoute} from '@angular/router';
import {ToursService} from '../../../services/tours/tours.service';
import Helpers from '../../../helpers/helpers';
import {OrderService} from '../../../services/order/order.service';
import {environment} from '../../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var getpaidSetup: any;
@Component({
  selector: 'app-tour-package-payment',
  templateUrl: './tour-package-payment.component.html',
  styleUrls: ['./tour-package-payment.component.scss']
})
export class TourPackagePaymentComponent implements OnInit {

  comments: FormControl;
  packageId;
  data;
  loadingPage = true;
  userData;
  urlOrigin;
  paymentVerification;
  payment;
  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toursService: ToursService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.shareDataService.showAd('false');
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.packageId = params.id;
      this.getSingleTourPackage();
    });
    this.userData = Helpers.getUserData();
    this.comments = new FormControl('');
    this.urlOrigin =  window.location.origin;

    this.paymentVerification = this.route.snapshot.queryParamMap.get('paymentVerification');
    this.payment = this.route.snapshot.queryParamMap.get('payment');
    this.failureMessage();
    const param = window.location.href.split('?')[1];
    param.includes('payment') ? history.pushState(null, '', location.href.split('?')[0]) : null;
  }

  getSingleTourPackage() {
    this.toursService.getSingleToursPackage(this.packageId).subscribe(res => {
      this.data = res;
      this.loadingPage = false;
    });
  }

  submitPaymentData() {
    const data = {
      id: 0,
      orderType: 'TOURS_AND_TRAVELS',
      totalAmount: this.data.price,
      payerId: this.userData.userId,
      currencyCode: this.data.currencyCode,
      comments: this.comments.value,
      originalItemId: this.data.id,
      originalSellerId: this.data.ownerId
    };

    this.orderService.saveOrder(data).subscribe(res => {
      this.payWithRave(res.id);
    });
  }

  payWithRave(transactionId) {
    const x = getpaidSetup({
      amount: this.data.price,
      txref: transactionId,
      PBFPubKey: environment.rave_publicKey,
      customer_email: this.userData.userId,
      currency: this.data.currencyCode,
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
        window.location.replace(`${this.urlOrigin}/tours?payment=Success`);
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

