import {Component, OnInit, HostListener, OnDestroy} from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvestmentProjectService } from 'src/app/services/investment-project/investment-project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import Helpers from 'src/app/helpers/helpers';
import {environment} from '../../../../environments/environment';


declare var cloudinary: any;
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit, OnDestroy {

  displayCoverImage = false;
  coverImage: any = '';
  officeImages: string[] = [];
  clientForm: FormGroup;
  data = [1, 2, 3];
  uploadingInvestmentProjectDetail = false;
  imageLoader = true;
  officeImage0 = true;
  officeImage1 = true;
  officeImage2 = true;
  officeImage3 = true;
  myIvestmentProjects = [];
  editData: any = '';
  isShow: boolean;
  topPosToStartShowing = 100;
  loadingMyInvestmentProjects: boolean;
  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private investmentProjectService: InvestmentProjectService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.shareDataService.showAd('true');
    this.shareDataService.showEditable('true');
    this.matIconRegistry.addSvgIcon(
      'photo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/photo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'plus',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/plus.svg')
    );

    this.shareDataService.deletedProjectId.subscribe(res => {
      if (res !== '') {
        this.loadingMyInvestmentProjects = true;
        this.deleteProject(res);
      }
    });
  }

  ngOnInit() {
    this.clientForm = this.fb.group({
      location: [''],
      amountRequested: ['0'],
      projectedReturnsType: ['Percentage'],
      projectedReturns: ['0'],
      title: [''],
      description: [''],
      currencyCode: [''],
      category: [''],
    });
    this.getInvestmentProjects();

    this.shareDataService.editInvestmentProject.subscribe(res => {
      this.editData = res;
      if (this.editData !== '') {
        const {
          location,
          title,
          amountRequested,
          projectedReturns,
          projectedReturnsType,
          description,
          currencyCode,
          category,
          otherImages,
          coverImage
        } = this.editData;
        this.clientForm.patchValue({
          location,
          title,
          amountRequested: amountRequested.toLocaleString('en-us'),
          projectedReturnsType,
          projectedReturns: projectedReturns.toLocaleString('en-us'),
          description,
          currencyCode,
          category
        });
        this.coverImage = coverImage;
        this.officeImages = otherImages;
        this.displayCoverImage = true;
        this.gotoTop();
      }
    });
  }

  upload() {
    const myWidget = cloudinary.createUploadWidget({
        cloudName: 'do6g6dwlz',
        uploadPreset: 'vdoc0rsk',
        multiple: false,
        clientAllowedFormats: environment.clientAllowedImageFormats,
        maxImageFileSize: environment.maxImageFileSize
    }, (error, result) => {
      if (!error && result && result.event === 'success') {
        this.displayCoverImage = true;
        this.coverImage = result.info.secure_url;
      }
    }
    );

    myWidget.open();
  }


  submitClientForm() {
    const userData = Helpers.getUserData();
    this.uploadingInvestmentProjectDetail = true;
    this.clientForm.value.amountRequested = this.clientForm.value.amountRequested.replace(/\,/g, '');
    this.clientForm.value.projectedReturns = this.clientForm.value.projectedReturns.replace(/\,/g, '');
    const formData = {
      id: this.editData === '' ? 0 : this.editData.id,
      userId: userData.userId,
      ...this.clientForm.value,
      coverImage: this.coverImage,
      otherImages: this.officeImages
    };
    const message = this.editData === '' ? 'Project has been created successfully' :
    'Project has been updated successfully';
    this.investmentProjectService.saveInvestmentProject(formData).subscribe(res => {
      if (res.statusDesc === 'SUCCESS') {
        this.snackBar.open(message, '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.clientForm.patchValue({
          location: '',
          amountRequested: '',
          projectedReturns: '',
          title: '',
          description: '',
          category: ''
        });
        this.clientForm.markAsPristine();
        this.clientForm.markAsUntouched();
        this.coverImage = '';
        this.officeImages = [];
        this.displayCoverImage = false;
        this.getInvestmentProjects();
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
    let myWidget = cloudinary.createUploadWidget({
      cloudName: 'do6g6dwlz',
      uploadPreset: 'vdoc0rsk',
      multiple: true,
      maxImageWidth: 180,
      maxImageHeight: 160,
        clientAllowedFormats: environment.clientAllowedImageFormats,
        maxImageFileSize: environment.maxImageFileSize
    }, (error, result) => {
      if (!error && result && result.event === 'success') {
        this.officeImages.push(result.info.secure_url);
        if (this.officeImages.length > 4) {
          this.officeImages.shift();
        }
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
      const num1 = value.replace(/,/g, '');
      const num2 = Number(num1).toLocaleString('en-US');
      if (inputField === 'projectedReturns') {
        this.clientForm.patchValue({ projectedReturns: num2 });
      } else if (inputField === 'amountRequested') {
        this.clientForm.patchValue({ amountRequested: num2 });
        }
    }


    getInvestmentProjects() {
      this.loadingMyInvestmentProjects = true;
      const userData = Helpers.getUserData();
      this.investmentProjectService.getAllInvestmentProjects(0, 12, { UserId: userData.userId })
      .subscribe(res => {
        this.loadingMyInvestmentProjects = false;
        this.myIvestmentProjects = res.projects;
      });
    }

    @HostListener('window:scroll')
    checkScroll() {
      const scrollPosition = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;

      if (scrollPosition >= this.topPosToStartShowing) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }

    gotoTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    deleteProject(id) {
      this.investmentProjectService.deleteInvestmentProject(id).subscribe(res => {
        if (res.statusCode) {
          this.getInvestmentProjects();
        }
      });
    }

    ngOnDestroy(): void {
      this.shareDataService.showEditable('false');
    }
}
