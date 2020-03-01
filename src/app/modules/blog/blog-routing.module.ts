import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayBlogsComponent } from './display-blogs/display-blogs.component';
import { DisplaySingleBlogComponent } from './display-single-blog/display-single-blog.component';


const routes: Routes = [
  { path: '', component: DisplayBlogsComponent },
  { path: ':id', component: DisplaySingleBlogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }