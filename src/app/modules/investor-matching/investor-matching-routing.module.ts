import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispplayClientsComponent } from './dispplay-clients/dispplay-clients.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientOrderDetailsComponent } from './client-order-details/client-order-details.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { AuthGuardService as AuthGuard } from 'src/app/services/guards/auth-guard.service';
import {ChatComponent} from '../shared/chat/chat.component';


const routes: Routes = [
  { path: '', component: DispplayClientsComponent},
  { path: 'create-investment-project', component: CreateClientComponent, canActivate: [AuthGuard]},
  { path: 'order-details/:id', component: ClientOrderDetailsComponent,  canActivate: [AuthGuard]},
  { path: 'view-project-details', component: ClientDetailsComponent},
  // { path: 'contact-owner', component: ChatComponent,  canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorMatchingRoutingModule { }
