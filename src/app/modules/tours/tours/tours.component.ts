import { Component, OnInit } from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  toursForm: FormGroup;
  toursData = Array(9);

  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
  ) {
    this.shareDataService.showAd('false');
  }

  ngOnInit(): void {

    this.toursForm = this.fb.group({
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
    if (key.length == 0) { return; }
    const regex = /^[0-9,\b]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) { theEvent.preventDefault(); }
    }
  }

  addCommas(value, inputField) {
    if (value === '') {
      this.toursForm.patchValue({ [inputField]: value });
    } else {
      const num1 = value.replace(/,/g, '');
      const num2 = Number(num1).toLocaleString('en-US');
      this.toursForm.patchValue({ [inputField]: num2 });
    }
  }

}
