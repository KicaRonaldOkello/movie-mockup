import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ShareDataService} from '../../../services/share-data/share-data.service';

@Component({
  selector: 'app-tour-package-payment',
  templateUrl: './tour-package-payment.component.html',
  styleUrls: ['./tour-package-payment.component.scss']
})
export class TourPackagePaymentComponent implements OnInit {

  paymentSearchForm: FormGroup;
  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
  ) {
    this.shareDataService.showAd('false');
  }

  ngOnInit(): void {

    this.paymentSearchForm = this.fb.group({
      username: [''],
      location: [''],
      amountMin: [''],
      amountMax: [''],
      returnsMin: [''],
      returnsMax: ['']
    });
  }


  isNumber(evt) {
    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (key.length === 0) { return; }
    const regex = /^[0-9,\b]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) { theEvent.preventDefault(); }
    }
  }

  addCommas(value, inputField) {
    if (value === '') {
      this.paymentSearchForm.patchValue({ [inputField]: value });
    } else {
      const num1 = value.replace(/,/g, '');
      const num2 = Number(num1).toLocaleString('en-US');
      this.paymentSearchForm.patchValue({ [inputField]: num2 });
    }
  }
}
