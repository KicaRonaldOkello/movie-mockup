import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DisplayTranslatorsComponent} from './display-translators/display-translators.component';
import {TanslatorDetailsComponent} from './tanslator-details/tanslator-details.component';
import {CreateTranslatorComponent} from './create-translator/create-translator.component';
import { AuthGuardService as AuthGuard } from 'src/app/services/guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: DisplayTranslatorsComponent, canActivate: [AuthGuard] },
  { path: 'translator-details', component: TanslatorDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create-translator', component: CreateTranslatorComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslatorServicesRoutingModule { }
