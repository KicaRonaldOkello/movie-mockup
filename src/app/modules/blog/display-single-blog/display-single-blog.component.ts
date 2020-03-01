import { Component, OnInit } from '@angular/core';
import { GetBlogsService } from 'src/app/services/blog/get-blogs.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments/comments.service';

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
    private commentService: CommentsService) { }

  ngOnInit() {
    this.blogService.getBlogs(1, 2).subscribe(blog => {
      this.blogs = blog.articles;
    });
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.blogService.getSingleBlog(this.id).subscribe(blog => {
      if (blog.status.statusCode == '100') {
        this.articleDoesNotExist = true;
        this.errorMessage = blog.status.statusDesc;
      } else {
      this.singleBlog = blog;
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
