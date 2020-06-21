import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [ModalComponent, NotFoundComponent, PaymentModalComponent, ImageModalComponent, ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    ModalComponent,
    NotFoundComponent,
  ]
})
export class SharedModule { }
