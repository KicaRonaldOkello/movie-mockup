import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { GetBlogsService } from 'src/app/services/blog/get-blogs.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-display-blogs',
  templateUrl: './display-blogs.component.html',
  styleUrls: ['./display-blogs.component.scss']
})
export class DisplayBlogsComponent implements OnInit {
  blogs = '';
  page = 0;
  pageCount: number;
  retryError = false;
  noBlogError = false;
  constructor(
    private blogService: GetBlogsService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.matIconRegistry.addSvgIcon(
        "previous-page",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/left-arrow.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "next-page",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/right-arrow.svg")
      );
    }

  ngOnInit() {
    this.loadBlogs();
  }
  reloadBlog() {
    this.retryError = false;
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getBlogs(this.page).subscribe(blog => {
      if (blog.articles.length < 1) {
        this.noBlogError = true;
      } else {
      this.blogs = blog.articles;
      this.pageCount = blog.pageCount;
      }
    },
    (error) => {
      this.retryError = true;
    });
  }

  nextPage() {
    this.page += 1;
    this.loadBlogs();
  }

  previousPage() {
    if (this.page < 1) {
      return;
    } else {
    this.page -= 1;
    this.loadBlogs();
  }
}

}
