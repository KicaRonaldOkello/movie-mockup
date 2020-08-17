import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import {TermsAndCondtionsComponent} from './terms-and-condtions/terms-and-condtions.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [TermsAndCondtionsComponent],
  imports: [
    CommonModule,
    TermsAndConditionsRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class TermsAndConditionsModule { }
