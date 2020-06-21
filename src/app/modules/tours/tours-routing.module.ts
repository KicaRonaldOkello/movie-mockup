import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ToursComponent} from './tours/tours.component';
import {TourDetailsComponent} from './tour-details/tour-details.component';
import {TourPackagePaymentComponent} from './tour-package-payment/tour-package-payment.component';


const routes: Routes = [
  {path: '', component: ToursComponent },
  {path: 'package-payment', component: TourPackagePaymentComponent},
  {path: 'tour-details', component: TourDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToursRoutingModule { }
