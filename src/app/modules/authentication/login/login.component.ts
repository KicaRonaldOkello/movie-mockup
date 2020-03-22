import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import Helpers from '../../../helpers/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitUserDetail = false;
  constructor(
    private shareDataService: ShareDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    ) {
    this.shareDataService.showAd('true');
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      userId: [''],
      password: ['']
    })
  }

  submitLoginData() {
    this.submitUserDetail = true;
    this.authenticationService.loginUser(this.loginForm.value).subscribe(res => {
      if (res.status.statusDesc === "SUCCESS") {
        this.snackBar.open('Login successful', '', {
          duration: 3000,
          panelClass: ['green-snackbar']
        });
        this.loginForm.reset();
        Helpers.storeUserData(res);
        res.roleId.toLowerCase() == 'admin' ? this.router.navigateByUrl('/admin') :
        this.router.navigateByUrl('/blog');
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
