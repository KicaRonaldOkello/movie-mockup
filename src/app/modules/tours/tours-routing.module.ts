import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ToursComponent} from './tours/tours.component';
import {TourDetailsComponent} from './tour-details/tour-details.component';
import {TourPackagePaymentComponent} from './tour-package-payment/tour-package-payment.component';
import {CreateToursPackageComponent} from './create-tours-package/create-tours-package.component';
import { AuthGuardService as AuthGuard } from 'src/app/services/guards/auth-guard.service';


const routes: Routes = [
  {path: '', component: ToursComponent, canActivate: [AuthGuard]},
  {path: 'package-payment', component: TourPackagePaymentComponent, canActivate: [AuthGuard]},
  {path: 'tour-details', component: TourDetailsComponent, canActivate: [AuthGuard]},
  {path: 'create-tours-package', component: CreateToursPackageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToursRoutingModule { }
