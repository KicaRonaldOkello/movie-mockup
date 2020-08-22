import {Component, OnInit} from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToursService} from '../../../services/tours/tours.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';
import Helpers from '../../../helpers/helpers';

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
  userData;
  payment;
  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private toursService: ToursService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
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
      numberOfPeopleMin: [''],
      numberOfPeopleMax: [''],
      ownerId: ['']
    });
    this.getToursPackages({});
    this.userData = Helpers.getUserData();

    this.payment = this.route.snapshot.queryParamMap.get('payment');
    this.successMessage();
    history.pushState(null, '', location.href.split('?')[0]);
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
    let { priceMax, priceMin, numberOfPeopleMax, numberOfPeopleMin } = this.toursForm.value;
    const { location, packageName, ownerId } = this.toursForm.value;

    if (priceMin !== '') {
      priceMin = priceMin.replace(/\,/g, '');
    }
    if (priceMax !== '') {
      priceMax = priceMax.replace(/\,/g, '');
    }
    if (numberOfPeopleMax !== '') {
      numberOfPeopleMax = numberOfPeopleMax.replace(/\,/g, '');
    }
    if (numberOfPeopleMin !== '') {
      numberOfPeopleMin = numberOfPeopleMin.replace(/\,/g, '');
    }

    const data = {
      Location: location,
      PackageName: packageName,
      Price: `${priceMin}-${priceMax}`,
      NumberOfPeople: `${numberOfPeopleMin}-${numberOfPeopleMax}`,
      OwnerId: ownerId
    };
    this.page = 0;
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
    if ((this.pageCount - this.page) > 1) {
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

  deletedItemId(id) {
    this.toursService.deleteTravelPackage(id).subscribe(res => {
      if (res.statusCode === '0') {
        this.packages = this.packages.filter((item) => item.id !== id);
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }

  isChecked(event) {
    if (event.checked) {
      this.toursForm.patchValue({
        ownerId: this.userData.userId
      });
    } else {
      this.toursForm.patchValue({
        ownerId: ''
      });
    }
  }

  successMessage() {
    if (this.payment === 'Success') {
      this.snackBar.open('Your payment has been successful', '', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['green-snackbar']
      });
    }
  }
}
