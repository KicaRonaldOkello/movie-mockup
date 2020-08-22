import {Component, OnInit} from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import Helpers from '../../../helpers/helpers';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {UsersService} from '../../../services/users/users.service';
import {VideosService} from '../../../services/videos/videos.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LiquidationService} from '../../../services/liquidation/liquidation.service';

declare var cloudinary: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData;
  profileFrom: FormGroup;
  liquidationForm: FormGroup;
  loadingProfileImage = true;
  coverImage;
  submittingForm = false;
  submittingLiquidationForm = false;
  amountEarned;
  liquidationChannels = [];
  idTypes = [];
  loadEarnings = false;
  loadChannelTypes = true;
  panelOpenState = false;
  showAmountEarned = false;
  uploadUrl;
  accountDetailsPlaceholder = '';
  accountDetailsPlaceholderData = {
    BANK_ACCOUNT: 'AccountNames: Nsubuga Kasozi,\n BankName: STANBIC,\n Country: UGANDA,\n AccountNumber:12343526,\n Branch:Wandegeya,\n SwiftCode: 14526161',
    MOBILE_MONEY: 'Phone: +256734000000,\n' +
      'Telecom: Airtel,\n' +
      'Country: Uganda'
  };

  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private liquidationService: LiquidationService
  ) {
    this.shareDataService.showAd('true');
    this.userData = Helpers.getUserData();
  }

  ngOnInit(): void {
    this.coverImage = this.userData.profilePicUrl;
    this.profileFrom = this.fb.group({
      name: [this.userData.name],
      userId: [this.userData.userId],
      email: [this.userData.email]
    });
    this.liquidationForm = this.fb.group({
      kycIDType: [''],
      kycIDUrl: [''],
      kycIDNumber: [''],
      liquidationChannel: [''],
      liquidationChannelAccountDetails: [''],
      phoneNumber: ['']

    });
    this.getLiquidationChannels();
    this.getAllIdTypes();
  }

  upload() {
    const myWidget = cloudinary.createUploadWidget({
        cloudName: environment.cloudName,
        uploadPreset: environment.uploadPreset,
        maxImageFileSize: environment.maxImageFileSize,
        multiple: false
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.loadingProfileImage = true;
          this.coverImage = result.info.secure_url;
        }
      }
    );

    myWidget.open();
  }

  chooseIdType(event) {
    this.liquidationForm.patchValue({
      kycIDType: event
    });
  }

  chooseChannel(event) {
    this.accountDetailsPlaceholder = this.accountDetailsPlaceholderData[event];
    this.liquidationForm.patchValue({
      liquidationChannel: event
    });
  }

  updateUserData() {
    this.submittingForm = true;
    const {userId, name, email} = this.profileFrom.value;
    const data = {
      userId,
      name,
      email,
      profilePicUrl: this.coverImage
    };
    this.usersService.updateUser(data).subscribe(res => {
      this.submittingForm = false;
      if (res.statusCode === '0') {
        this.userData.name = data.name;
        this.userData.email = data.email;
        this.userData.profilePicUrl = data.profilePicUrl;
        Helpers.storeUserData(this.userData);

        this.snackBar.open('You profile has been updated successfully.', '', {
          duration: 3000,
          panelClass: ['green-snackbar']
        });
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }

  getUserEarnings() {
    this.loadEarnings = true;
    this.liquidationService.getUserEarnings(this.userData.userId).subscribe(res => {
      this.loadEarnings = false;
      this.showAmountEarned = true;
      this.amountEarned = res.totalAmountEarned;
    });
  }

  getLiquidationChannels() {
    this.liquidationService.getAllLiquidationChannels().subscribe(res => {
      this.loadChannelTypes = false;
      this.liquidationChannels = res.items;
    });
  }

  getAllIdTypes() {
    this.liquidationService.getAllIdTypes().subscribe(res => {
      this.idTypes = res.items;
    });
  }

  uploadId() {
    const myWidget = cloudinary.createUploadWidget({
        cloudName: environment.cloudName,
        uploadPreset: environment.uploadPreset,
        maxImageFileSize: environment.maxImageFileSize,
        multiple: false
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.uploadUrl = result.info.secure_url;
          this.liquidationForm.patchValue({
            kycIDUrl: result.info.secure_url
          });
        }
      }
    );

    myWidget.open();
  }

  submitData() {
    this.submittingLiquidationForm = true;
    const data = {
      id: 0,
      amount: 0,
      requesterId: this.userData.userId,
      ...this.liquidationForm.value
    };
    this.liquidationService.initiateLiquidation(data).subscribe(res => {
      this.submittingLiquidationForm = false;
      if (res.statusCode === '0') {
        this.liquidationForm.reset();
        this.snackBar.open('You liquidation request has been initiated successfully.', '', {
          duration: 3000,
          panelClass: ['green-snackbar']
        });
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }
}
