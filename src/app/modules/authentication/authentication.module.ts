import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [LoginComponent, SingupComponent, ChangePasswordComponent, ForgotPasswordComponent],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
    ]
})
export class AuthenticationModule { }
