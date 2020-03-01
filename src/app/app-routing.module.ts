import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/tv', pathMatch: 'full' },
  { path: 'tv', loadChildren: './modules/tv-stations/tv-stations.module#TvStationsModule'},
  { path: 'blog', loadChildren: './modules/blog/blog.module#BlogModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
