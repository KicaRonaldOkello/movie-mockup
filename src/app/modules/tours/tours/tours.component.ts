import {Component, OnInit} from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToursService} from '../../../services/tours/tours.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
})
export class ToursComponent implements OnInit {
  toursForm: FormGroup;
  pageCount;
  packages = [];
  page = 0;
  limit = 12;
  loadingPackages = true;
  searchingPackages = false;

  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private router: Router,
    private toursService: ToursService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.shareDataService.showAd('false');

    this.matIconRegistry.addSvgIcon(
      'previous-page',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/double-arrow-left.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'next-page',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/double-arrow-right.svg')
    );
  }

  ngOnInit(): void {

    this.toursForm = this.fb.group({
      packageName: [''],
      location: [''],
      priceMin: [''],
      priceMax: [''],
      returnsMin: [''],
      returnsMax: ['']
    });
    this.getToursPackages({});
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
      this.toursForm.patchValue({ [inputField]: value });
    } else {
      const num1 = value.replace(/,/g, '');
      const num2 = Number(num1).toLocaleString('en-US');
      this.toursForm.patchValue({ [inputField]: num2 });
    }
  }

  searchInvestmentProject() {
    let { location, packageName, priceMax, priceMin, returnsMax, returnsMin } = this.toursForm.value;

    if (priceMin !== '') {
      priceMin = priceMin.replace(/\,/g, '');
    }
    if (priceMax !== '') {
      priceMax = priceMax.replace(/\,/g, '');
    }

    const data = {
      Location: location,
      PackageName: packageName,
      Price: `${priceMin}-${priceMax}`,
    };
    this.searchingPackages = true;
    this.getToursPackages(data);
  }

  getToursPackages(queryParams) {
    this.toursService.getToursPackages(this.page, this.limit, queryParams).subscribe(res => {
      this.packages = res.items;
      this.pageCount = res.pageCount;
      this.loadingPackages = false;
      this.searchingPackages = false;
    });
  }

  nextPage() {
    if (this.page < this.pageCount) {
      this.page = this.page + 1;
      this.getToursPackages({});
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.getToursPackages({});
    }
  }
}
