import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import {ToursService} from '../../../services/tours/tours.service';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var cloudinary: any;
@Component({
  selector: 'app-create-tours-package',
  templateUrl: './create-tours-package.component.html',
  styleUrls: ['./create-tours-package.component.scss']
})
export class CreateToursPackageComponent implements OnInit, AfterViewInit {

  clientForm: FormGroup;
  loadingPage = true;
  displayCoverImage = false;
  coverImage: any = '';
  imageLoader = true;
  supportedCurrencies;
  constructor(
    private fb: FormBuilder,
    private shareDataService: ShareDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    private toursService: ToursService,
    private snackBar: MatSnackBar,
  ) {
    this.shareDataService.showAd('true');
    this.matIconRegistry.addSvgIcon(
      'photo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/photo.svg')
    );
  }

  ngOnInit(): void {
    this.getSupportedCurrencies();
    this.clientForm = this.fb.group({
      location: [''],
      price: ['0'],
      numberOfPeople: ['0'],
      packageName: [''],
      description: [''],
      currencyCode: [''],
      startDate: [''],
    });
  }

  ngAfterViewInit(): void {
    this.loadingPage = false;
    this.cdRef.detectChanges();
  }

  upload() {
    const myWidget = cloudinary.createUploadWidget({
        cloudName: 'do6g6dwlz',
        uploadPreset: 'vdoc0rsk',
        multiple: false
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.displayCoverImage = true;
          this.coverImage = result.info.secure_url;
        }
      }
    );

    myWidget.open();
  }

  isNumber(evt) {
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (key.length == 0) { return; }
    let regex = /^[0-9,\b]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) { theEvent.preventDefault(); }
    }
  }

  addCommas(value, inputField) {
    if (value === '') {
      this.clientForm.patchValue({ [inputField]: value });
    } else {
      const num1 = value.replace(/,/g, '');
      const num2 = Number(num1).toLocaleString('en-US');
      this.clientForm.patchValue({ [inputField]: num2 });
    }
  }

  getSupportedCurrencies() {
    this.toursService.getAllSupportedCurrencies().subscribe(res => {
      this.supportedCurrencies = res.supportedCurrencies;
    });
  }

  submitTravelPackage() {
    this.clientForm.value.price = this.clientForm.value.price.replace(/\,/g, '');
    this.clientForm.value.numberOfPeople = this.clientForm.value.numberOfPeople.replace(/\,/g, '');
    const { location, packageName, description, startDate, currencyCode, numberOfPeople, price } = this.clientForm.value;
    const data = {
      id: 0,
      location,
      packageName,
      coverImageUrl: this.coverImage,
      description,
      startDate: moment(startDate).format('DD/MM/YYYY'),
      currencyCode,
      price,
      numberOfPeople
    };

    this.toursService.saveTravelPackage(data).subscribe(res => {
    const message = 'Your package has been created successfully.';
    if (res.statusDesc === 'SUCCESS') {
        this.snackBar.open(message, '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.clientForm.reset();
        this.coverImage = '';
        this.displayCoverImage = false;
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }
}
