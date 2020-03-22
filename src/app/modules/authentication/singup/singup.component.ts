import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

  signupForm: FormGroup;
  submitUserDetail = false;
  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authenticationService: AuthenticationService,
    ) {
    this.shareDataService.showAd('true');
  }

  ngOnInit() {

    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      confirmedPassword: [''],
      roleId: ['USER'],
    });
  }

  sumitData() {
    this.submitUserDetail = true;
    this.authenticationService.signupUser(
      {...this.signupForm.value, userId: this.signupForm.value.email }).subscribe(res => {
      if (res.statusDesc === "SUCCESS") {
        this.snackBar.open('You have been signed up successfully', '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.signupForm.reset();
        this.router.navigateByUrl('/blog');
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }

      this.submitUserDetail = false;
    });
  }

}
