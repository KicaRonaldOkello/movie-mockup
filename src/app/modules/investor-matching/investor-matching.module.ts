import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { InvestorMatchingRoutingModule } from './investor-matching-routing.module';
import { DispplayClientsComponent } from './dispplay-clients/dispplay-clients.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DisplayClientCardsComponent } from './display-client-cards/display-client-cards.component';
import { ClientCardComponent } from './client-card/client-card.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientOrderDetailsComponent } from './client-order-details/client-order-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateClientComponent } from './create-client/create-client.component';
import { MatDialogModule } from '@angular/material/dialog';
import {ImageModalComponent} from '../shared/image-modal/image-modal.component';
import {SharedModule} from '../shared/shared.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    DispplayClientsComponent,
    DisplayClientCardsComponent,
    ClientCardComponent,
    ClientDetailsComponent,
    ClientOrderDetailsComponent,
    CreateClientComponent,
  ],
  imports: [
    CommonModule,
    InvestorMatchingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    ImageModalComponent
  ]
})
export class InvestorMatchingModule { }
