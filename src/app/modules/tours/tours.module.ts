import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToursRoutingModule } from './tours-routing.module';
import { ToursComponent } from './tours/tours.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ToursCardComponent } from './tours-card/tours-card.component';
import { TourDetailsComponent } from './tour-details/tour-details.component';
import { TourPackagePaymentComponent } from './tour-package-payment/tour-package-payment.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [ToursComponent, ToursCardComponent, TourDetailsComponent, TourPackagePaymentComponent],
  imports: [
    CommonModule,
    ToursRoutingModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
  ]
})
export class ToursModule { }
