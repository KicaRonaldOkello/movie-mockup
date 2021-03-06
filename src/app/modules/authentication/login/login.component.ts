import {Component, OnInit} from '@angular/core';
import {ShareDataService} from 'src/app/services/share-data/share-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

import Helpers from '../../../helpers/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitUserDetail = false;
  returnUrl: string = '';

  constructor(
    private shareDataService: ShareDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
  ) {
    this.shareDataService.showAd('true');

    if (this.router.getCurrentNavigation().extras.state) {
      this.returnUrl = this.router.getCurrentNavigation().extras.state.returnUrl;
    }
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      userId: [''],
      password: ['']
    });
  }

  submitLoginData() {
    this.submitUserDetail = true;
    this.authenticationService.loginUser(this.loginForm.value).subscribe(res => {
      if (res.status.statusCode === '0') {
        this.snackBar.open('Login successful', '', {
          duration: 3000,
          panelClass: ['green-snackbar']
        });
        this.loginForm.reset();
        Helpers.storeUserData(res);
        this.shareDataService.loggedIn();
        if (this.returnUrl !== '') {
          return this.router.navigateByUrl(this.returnUrl);
        }
        res.roleId.toLowerCase() === 'admin' ? this.router.navigateByUrl('/admin') :
          this.router.navigateByUrl('/blog');
      } else if (res.status.statusCode === '800') {
        Helpers.storeUserData(res);
        this.snackBar.open(res.status.statusDesc, '', {
          duration: 6000,
          panelClass: ['green-snackbar']
        });
        this.router.navigate(
          ['/auth/change-password'],
          {queryParams: {id: this.loginForm.get('userId').value}});
      } else {
        this.snackBar.open(res.status.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }

      this.submitUserDetail = false;
    });
  }

}
