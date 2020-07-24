import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DisplayTranslatorsComponent} from './display-translators/display-translators.component';
import {TanslatorDetailsComponent} from './tanslator-details/tanslator-details.component';
import {CreateTranslatorComponent} from './create-translator/create-translator.component';


const routes: Routes = [
  { path: '', component: DisplayTranslatorsComponent },
  { path: 'translator-details', component: TanslatorDetailsComponent },
  { path: 'create-translator', component: CreateTranslatorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslatorServicesRoutingModule { }
