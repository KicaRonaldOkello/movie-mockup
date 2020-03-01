import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from "@angular/material/icon";

import { DisplayBlogsComponent } from './display-blogs/display-blogs.component';
import { BlogRoutingModule } from './blog-routing.module';
import { DisplaySingleBlogComponent } from './display-single-blog/display-single-blog.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogCommentsComponent } from './blog-comments/blog-comments.component';



@NgModule({
  declarations: [DisplayBlogsComponent, DisplaySingleBlogComponent, BlogCardComponent, BlogCommentsComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class BlogModule { }
