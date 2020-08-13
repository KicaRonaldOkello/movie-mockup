import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslatorServicesRoutingModule} from './translator-services-routing.module';
import { DisplayTranslatorsComponent } from './display-translators/display-translators.component';
import {ReactiveFormsModule} from '@angular/forms';
import { TranslatorCardsComponent } from './translator-cards/translator-cards.component';
import { TanslatorDetailsComponent } from './tanslator-details/tanslator-details.component';
import {MatIconModule} from '@angular/material/icon';
import { CreateTranslatorComponent } from './create-translator/create-translator.component';
import { TranslatorSearchBarComponent } from './translator-search-bar/translator-search-bar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
    declarations: [
        DisplayTranslatorsComponent,
        TranslatorCardsComponent,
        TanslatorDetailsComponent,
        CreateTranslatorComponent,
        TranslatorSearchBarComponent,
    ],
  imports: [
    CommonModule,
    TranslatorServicesRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    NgxMaterialTimepickerModule,
    MatSlideToggleModule,
  ],
    exports: [
        TranslatorCardsComponent
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
    ]
})
export class TranslatorServicesModule { }
