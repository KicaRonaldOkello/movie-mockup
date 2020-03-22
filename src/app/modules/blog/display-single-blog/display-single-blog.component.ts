import { Component, OnInit } from '@angular/core';
import { GetBlogsService } from 'src/app/services/blog/get-blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-display-single-blog',
  templateUrl: './display-single-blog.component.html',
  styleUrls: ['./display-single-blog.component.scss']
})
export class DisplaySingleBlogComponent implements OnInit {

  blogs: any;
  id: number;
  singleBlog: any;
  commentPosted = false;
  articleDoesNotExist = false;
  errorMessage = '';
  constructor(
    private blogService: GetBlogsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private route: Router,
    private commentService: CommentsService) {
      
    }

  ngOnInit() {
    this.blogService.getBlogs(1, 2).subscribe(blog => {
      this.blogs = blog.articles;
    });

    if (isNaN(Number(this.activatedRoute.snapshot.paramMap.get('id')))) {
      this.route.navigateByUrl('/**');
    } else {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }

    this.blogService.getSingleBlog(this.id).subscribe(blog => {
      if (blog.status.statusCode == '100') {
        this.articleDoesNotExist = true;
        this.errorMessage = blog.status.statusDesc;
      } else {
      this.singleBlog = blog;
      this.singleBlog.htmlBody = this.sanitizer.bypassSecurityTrustHtml(this.singleBlog.htmlBody);
      }
    })

  }

  sendComment(text) {
    if (text.trim() === '') {
      return;
    } else {
      const comment = {
        PageId: `Blog_${this.id}`,
        Comment: text,
        profilePic: "https://placeimg.com/300/300/people",
        UserId:"testUser",
      }
      this.commentService.saveComment(comment).subscribe(result => {
        this.commentPosted = true;
      });
    }
  }

  commentsRecalled(event) {
    this.commentPosted = false;
  }

}
