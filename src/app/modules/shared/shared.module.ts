import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';



@NgModule({
  declarations: [ModalComponent, NotFoundComponent, PaymentModalComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ModalComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
