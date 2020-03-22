import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [ModalComponent, NotFoundComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ModalComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
