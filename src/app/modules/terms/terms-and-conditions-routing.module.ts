import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TermsAndCondtionsComponent} from './terms-and-condtions/terms-and-condtions.component';


const routes: Routes = [  { path: '', component: TermsAndCondtionsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsAndConditionsRoutingModule { }
