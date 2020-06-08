import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetBlogsService } from 'src/app/services/blog/get-blogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  @Input() data: any;
  @Input() displayDeleteButton = false;
  @Input() displayVideo = false;
  @Output() deletedItemId = new EventEmitter();
  @Output() updateBlogItem = new EventEmitter();
  controls = false;
  constructor(
    private blogService: GetBlogsService,
    private snackBar: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    private shareDataService: ShareDataService) {
      this.matIconRegistry.addSvgIcon(
        'delete',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/delete.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'read',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/book.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'refresh',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/refresh.svg')
      );

    }

  ngOnInit() {
    if(this.data.isYoutubeVideo) {
      this.data.fileUrl = this.data.fileUrl.replace('watch?v=', 'embed/');
      this.data.fileUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.fileUrl);
    }
  }

  truncateHTML(text: string): string {

    const charlimit = 300;
    if (!text || text.length <= charlimit) {
      return text;
    }


    const without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    const shortened = without_html.substring(0, charlimit) + '...';
    return shortened;
  }

  deleteBlog(id) {
    this.openDialog(id, 'blog');
  }

  deleteBlogItem(BlogId: number) {
    this.blogService.deleteBlog(BlogId).subscribe(response => {
      this.snackBar.open('Blog has been deleted successfully', '', {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      this.deletedItemId.emit(BlogId);
    });
  }

  readThisBlog(id) {
    this.router.navigate(['blog', id]);
  }

  updateThisBlog(blog) {
    this.updateBlogItem.emit(blog);
  }

  mouseEnter() {
    this.controls = true;
  }

  mouseLeave() {
    this.controls = false;
  }

  deleteVideoItem(id) {
    this.openDialog(id, 'video');
  }

  updateVideoItem(data) {
    this.shareDataService.updateVideoItem(data);
  }

  openDialog(actionData, dataType): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px', height: '150px',
      data: {dataType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete video') {
        this.shareDataService.newVideoId(actionData);
      } else if (result === 'delete blog') {
        this.deleteBlogItem(actionData);
      }
    });
  }

}
