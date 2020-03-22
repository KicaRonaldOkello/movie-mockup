import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayBlogsComponent } from './display-blogs/display-blogs.component';
import { DisplaySingleBlogComponent } from './display-single-blog/display-single-blog.component';
import { NotFoundComponent } from 'src/app/modules/shared/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: DisplayBlogsComponent },
  { path: ':id', component: DisplaySingleBlogComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }