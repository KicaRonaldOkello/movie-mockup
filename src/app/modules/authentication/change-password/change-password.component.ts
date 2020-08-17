import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import Helpers from '../../../helpers/helpers';
import {ValidatorService} from '../../../services/validator/validator.service';
import {UsersService} from '../../../services/users/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitUserDetail = false;
  returnUrl = '';
  userData;
  userId;
  constructor(
    private shareDataService: ShareDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private customValidator: ValidatorService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.shareDataService.showAd('true');

    if (this.router.getCurrentNavigation().extras.state) {
      this.returnUrl = this.router.getCurrentNavigation().extras.state.returnUrl;
    }

    this.userData = Helpers.getUserData();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params.id;
    });

    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmedPassword: ['', Validators.required]
    },
      {
        validator: this.customValidator.MatchPassword('newPassword', 'confirmPassword'),
      });
  }

  submitLoginData() {
    this.submitUserDetail = true;
    if (this.changePasswordForm.valid) {
      this.usersService.changeUserPassword({
        ...this.changePasswordForm.value, userId: this.userId ? this.userId : this.userData.userId
      }).subscribe(res => {
        this.submitUserDetail = false;
        if (res.statusDesc === 'SUCCESS') {
              this.snackBar.open('Password update successful', '', {
                duration: 3000,
                panelClass: ['green-snackbar']
              });
              this.userId ? this.router.navigateByUrl('/auth') : this.router.navigateByUrl('/profile');
            } else {
              this.snackBar.open(res.statusDesc, '', {
                duration: 6000,
                panelClass: ['red-snackbar']
              });
            }
      });
    }
  }

}
