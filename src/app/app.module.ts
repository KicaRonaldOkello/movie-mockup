import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BlogModule } from './modules/blog/blog.module';
import { ModalComponent } from './modules/shared/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import { TokenInterceptor } from './services/guards/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedModule,
    MatSnackBarModule,
    BlogModule,
  ],
  exports: [
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
