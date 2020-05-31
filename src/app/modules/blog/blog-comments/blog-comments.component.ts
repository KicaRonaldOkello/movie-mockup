import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommentsService } from 'src/app/services/comments/comments.service';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.scss']
})
export class BlogCommentsComponent implements OnInit, OnChanges {
  @Input() commentId: number;
  @Input() commentPosted;
  @Output() commentsRecalled = new EventEmitter();
  comments: any;
  constructor(private commentsService: CommentsService) {

  }

  ngOnInit() {
    this.getComments();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.commentPosted.currentValue === true) {
      this.getComments();
      this.commentsRecalled.emit('Comments recalled');
    }
  }

  getComments() {
    this.commentsService.getComments(`Blog_${this.commentId}`).subscribe(comments =>{
      this.comments = comments.comments;
    })
  }

}
