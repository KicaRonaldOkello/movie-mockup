import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './modules/shared/not-found/not-found.component';
import { RoleGuardService as RoleGuard } from './services/guards/role-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule', canActivate: [RoleGuard], data: { 
    expectedRole: 'admin'
  } },
  { path: 'auth', loadChildren: './modules/authentication/authentication.module#AuthenticationModule' },
  // { path: 'tv', loadChildren: './modules/tv-stations/tv-stations.module#TvStationsModule'},
  { path: 'blog', loadChildren: './modules/blog/blog.module#BlogModule'},
  // { path: 'investor-matching', loadChildren: './modules/investor-matching/investor-matching.module#InvestorMatchingModule'},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
