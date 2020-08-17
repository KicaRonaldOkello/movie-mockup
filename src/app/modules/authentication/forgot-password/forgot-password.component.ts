import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {UsersService} from '../../../services/users/users.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  submitUserDetail = false;
  userId: FormControl;
  constructor(
    private shareDataService: ShareDataService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router
    ) {
    this.shareDataService.showAd('true');
  }

  ngOnInit(): void {

    this.userId = new FormControl('');
  }
  submitData() {
    this.submitUserDetail = true;
    this.usersService.forgotPassword({userId: this.userId.value}).subscribe(res => {
      this.submitUserDetail = false;
      if (res.statusDesc === 'SUCCESS') {
        this.snackBar.open('Check your email for the password reset link.', '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.router.navigateByUrl('/auth');
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }
}
