import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, AfterViewInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { GetBlogsService } from 'src/app/services/blog/get-blogs.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import Helpers from '../../../helpers/helpers';

@Component({
  selector: 'app-display-blogs',
  templateUrl: './display-blogs.component.html',
  styleUrls: ['./display-blogs.component.scss']
})
export class DisplayBlogsComponent implements OnInit, OnChanges, AfterViewInit {
  blogs: any = '';
  page = 0;
  pageCount: number;
  retryError = false;
  noBlogError = false;
  @Input() displayBlogInAdmin = false;
  @Input() reload;
  @Input() videos: any;
  @Input() displayVideos = false;
  @Input() videoPageCount;
  @Output() updateBlog = new EventEmitter();
  @Output() nextVideos = new EventEmitter();
  constructor(
    private blogService: GetBlogsService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private shareDataService: ShareDataService,

    ) {
      this.matIconRegistry.addSvgIcon(
        'previous-page',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/left-arrow.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'next-page',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/right-arrow.svg')
      );

      this.shareDataService.showAd('true');
    }

  ngOnInit() {
    this.loadBlogs();
  }

  ngAfterViewInit(): void {
    if (Helpers.getChosenLanguage()) {
      this.loadBlogs();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.reload.currentValue === true) {
      this.loadBlogs();
    }
    if (changes.pageCounts.currentValue !== 'undefined') {
      this.pageCount = this.videoPageCount;
    }
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
    if ((this.pageCount - this.page) <= 1) {
      return;
    } else {
    this.page += 1;
    this.loadBlogs();
    }
  }

  nextVideoPage() {
    if ((this.videoPageCount - this.page) <= 1) {
      return;
    } else {
      this.page += 1;
      this.nextVideos.emit(this.page);
    }
  }

  previousPage() {
    if (this.page < 1) {
      return;
    } else {
    this.page -= 1;
    this.loadBlogs();
  }
}

  previousVideoPage() {
    if (this.page < 1) {
      return;
    } else {
      this.page -= 1;
      this.nextVideos.emit(this.page);
    }
  }

deletedItem(BlogId) {
  const nonDeletedBlogs = this.blogs.filter(item => item.id !== BlogId);
  this.blogs = nonDeletedBlogs;
}

updateBlogItem(blog) {
  this.updateBlog.emit(blog);
}

}
