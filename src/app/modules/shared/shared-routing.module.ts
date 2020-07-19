import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from 'src/app/services/guards/auth-guard.service';
import {ChatComponent} from './chat/chat.component';


const routes: Routes = [
  { path: '', component: ChatComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
