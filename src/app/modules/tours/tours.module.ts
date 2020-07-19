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
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CreateToursPackageComponent } from './create-tours-package/create-tours-package.component';
import {QuillModule} from 'ngx-quill';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ToursComponent,
    ToursCardComponent,
    TourDetailsComponent,
    TourPackagePaymentComponent,
    CreateToursPackageComponent
  ],
    imports: [
        CommonModule,
        ToursRoutingModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatIconModule,
        MatProgressSpinnerModule,
        QuillModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatInputModule,
        MatMomentDateModule,
        SharedModule
    ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
})
export class ToursModule { }
