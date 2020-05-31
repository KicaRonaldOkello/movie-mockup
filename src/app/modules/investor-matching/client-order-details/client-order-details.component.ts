import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import Helpers from '../../../helpers/helpers';
import {FormControl} from '@angular/forms';
import {Utils} from '../../../utils/utils';
import {OrderService} from '../../../services/order/order.service';
import { environment } from '../../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {InvestmentProjectService} from '../../../services/investment-project/investment-project.service';

declare var getpaidSetup: any;
@Component({
  selector: 'app-client-order-details',
  templateUrl: './client-order-details.component.html',
  styleUrls: ['./client-order-details.component.scss']
})
export class ClientOrderDetailsComponent implements OnInit {

  data;
  id;
  amountPaid: FormControl;
  isNumber = Utils.isNumber;
  userData;
  submitData = false;
  loadingData = true;
  loadingCoverImage = true;
  urlOrigin;
  paymentVerification;
  payment;
  constructor(
    private shareDataService: ShareDataService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private investmentProjectService: InvestmentProjectService,
    private router: Router
  ) {
    this.shareDataService.showAd('true');
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData(this.id);
    this.amountPaid = new FormControl('');
    this.userData = Helpers.getUserData();
    this.urlOrigin =  window.location.origin;

    this.paymentVerification = this.route.snapshot.queryParamMap.get('paymentVerification');
    this.payment = this.route.snapshot.queryParamMap.get('payment');
    this.failureMessage();
    history.pushState(null, '', location.href.split('?')[0]);
  }

  getData(id) {
    this.investmentProjectService.getSingleInvestmentProject(id).subscribe(res => {
      this.data = res;
      this.loadingData = false;
    });
  }

  goBack() {
    this.router.navigateByUrl('/investor-matching');
  }

  submitOrderData() {
    this.submitData = true;
    const data = {
      id: 0,
      orderType: 'INVESTMENT-PROJECT',
      totalAmount: this.amountPaid.value.replace(/\,/g, ''),
      payerId: this.userData.userId,
      currencyCode: this.data.currencyCode,
      comments: this.data.id
    };
    this.orderService.saveOrder(data).subscribe(res => {
    this.payWithRave(res.id);
    });
  }

  addCommas(value) {
    const num1 = value.replace(/,/g, '');
    const num2 = Number(num1).toLocaleString('en-US');

    this.amountPaid.patchValue(num2);
  }

  payWithRave(transactionId) {
    const x = getpaidSetup({
      amount: this.amountPaid.value.replace(/\,/g, ''),
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
        window.location.replace(`${this.urlOrigin}/investor-matching?payment=Success`);
      } else {
        window.location.replace(`${window.location.href}?paymentVerification=Fail`);
      }
    });
  }

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
