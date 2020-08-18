import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {AdComponentComponent} from '../../ad-component/ad-component.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatComponent} from './chat/chat.component';
import {SharedRoutingModule} from './shared-routing.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UserModalComponent } from './user-modal/user-modal.component';
import { DeleteUserModalComponent } from './delete-user-modal/delete-user-modal.component';
import { LiquidationRequestModalComponent } from './liquidation-request-modal/liquidation-request-modal.component';
import { SystemSettingModalComponent } from './system-setting-modal/system-setting-modal.component';


@NgModule({
  declarations: [
    ModalComponent,
    NotFoundComponent,
    PaymentModalComponent,
    ImageModalComponent,
    AdComponentComponent,
    ChatComponent,
    UserModalComponent,
    DeleteUserModalComponent,
    LiquidationRequestModalComponent,
    SystemSettingModalComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatTooltipModule,
  ],
  exports: [
    ModalComponent,
    NotFoundComponent,
    AdComponentComponent,
    ChatComponent
  ]
})
export class SharedModule { }
