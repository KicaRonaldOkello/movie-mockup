import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvestmentProjectService } from 'src/app/services/investment-project/investment-project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


declare var cloudinary: any
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  displayCoverImage = false;
  coverImage: any = '';
  officeImages:string[] = [];
  clientForm: FormGroup;
  data = [1, 2, 3];
  uploadingInvestmentProjectDetail = false;
  imageLoader = true;
  officeImage0 = true;
  officeImage1 = true;
  officeImage2 = true;
  officeImage3 = true;
  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private investmentProjectService: InvestmentProjectService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.shareDataService.showAd('true');
    this.shareDataService.showEditable();
    this.matIconRegistry.addSvgIcon(
      "photo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/photo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "plus",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/plus.svg")
    );
  }

  ngOnInit() {
    this.clientForm = this.fb.group({
      location: [''],
      amountRequested: ['0'],
      projectedReturns: [''],
      title: [''],
      description: [''],
      currencyCode: [''],
      category: [''],
    });
  }

  upload() {
    var myWidget = cloudinary.createUploadWidget({
      cloudName: 'do6g6dwlz',
      uploadPreset: 'vdoc0rsk',
      multiple: false
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        this.displayCoverImage = true;
        this.coverImage = result.info.secure_url;
      }
    }
    );

    myWidget.open();
  }


  submitClientForm() {
    this.uploadingInvestmentProjectDetail = true;
    this.clientForm.value.amountRequested = this.clientForm.value.amountRequested.replace(/\,/g,'');
    const formData = {
      id: 0,
      userId: "john doe",
      ...this.clientForm.value,
      coverImage: this.coverImage,
      otherImages: this.officeImages
    };
    this.investmentProjectService.saveInvestmentProject(formData).subscribe(res => {
      if (res.statusDesc === "SUCCESS") {
        this.snackBar.open('Client has been created successfully', '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.clientForm.patchValue({
          location: '',
          amountRequested: '',
          projectedReturns: '',
          title: '',
          description: ''
        });
        this.clientForm.markAsPristine();
        this.clientForm.markAsUntouched();
        this.coverImage = '';
        this.officeImages = [];
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }
      this.uploadingInvestmentProjectDetail = false;
    });
  }

  uploadOfficeImages() {
    var myWidget = cloudinary.createUploadWidget({
      cloudName: 'do6g6dwlz',
      uploadPreset: 'vdoc0rsk',
      multiple: true,
      maxImageWidth: 180,
      maxImageHeight: 160,
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        this.officeImages.push(result.info.secure_url);
        if (this.officeImages.length > 4) {
          this.officeImages.shift();
        }
      }
    }
    );

    myWidget.open();
  }

  isNumber(evt, values) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (key.length == 0) return;
    var regex = /^[0-9,\b]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    }
    
    addCommas(value) {
      const num1 = value.replace(/,/g, '');
        const num2 = Number(num1).toLocaleString('en-US');
        this.clientForm.patchValue({ amountRequested: num2 });
    }

    // loaded(index) {
    //   console.log('hi>>>>>', index);
    //   if (Number(index) === 0) {
    //     this.officeImage0 = false;
    //   } else if (Number(index) === 1) {
    //     this.officeImage1 = false;
    //   } else if (Number(index) === 2) {
    //     this.officeImage2 = false;
    //   } else if (Number(index) === 3) {
    //     this.officeImage3 = false;
    //   }
    // }
}
