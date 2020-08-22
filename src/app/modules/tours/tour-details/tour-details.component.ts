import { Component, OnInit } from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ToursService} from '../../../services/tours/tours.service';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss']
})
export class TourDetailsComponent implements OnInit {
  tourDetailsForm: FormGroup;
  packageId;
  data;
  loadingPage = true;
  notFound = '';
  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toursService: ToursService,
  ) {
    this.shareDataService.showAd('false');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.packageId = params.id;
      this.getSingleTourPackage();
    });

    this.tourDetailsForm = this.fb.group({
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
      this.tourDetailsForm.patchValue({ [inputField]: value });
    } else {
      const num1 = value.replace(/,/g, '');
      const num2 = Number(num1).toLocaleString('en-US');
      this.tourDetailsForm.patchValue({ [inputField]: num2 });
    }
  }

  getSingleTourPackage() {
    this.toursService.getSingleToursPackage(this.packageId).subscribe(res => {
      this.data = res;
      this.loadingPage = false;
      if (res.status.statusCode === '100') {
        this.notFound = res.status.statusDesc;
      } else if (res.status.statusCode === '0') {
        this.data = res;
      }
    });
  }

}
