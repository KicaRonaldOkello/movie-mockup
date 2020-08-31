import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../services/share-data/share-data.service';
import { CommentsService } from '../services/comments/comments.service';
import { FormControl } from '@angular/forms';
import Helpers from '../helpers/helpers';

@Component({
  selector: 'app-ad-component',
  templateUrl: './ad-component.component.html',
  styleUrls: ['./ad-component.component.scss']
})
export class AdComponentComponent implements OnInit {

  displayComponent;
  displayComments = false;
  comments =  [];
  noComments = false;
  loadingComments;
  writtenComment = new FormControl('');
  videoId;
  postingComment = false;
  userData;
  constructor(
    private router: Router,
    private shareDataService: ShareDataService,
    private commentsService: CommentsService) {
    this.userData = Helpers.getUserData();
  }


  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event['url']) {
          this.checkRoute(event['url']);
      }
  });

    if (this.router.url === '/' || this.router.url === '/tv') {
    this.checkRoute('/tv');
  }
    this.shareDataService.videoCommentId.subscribe(res => {
     if (res !== '') {
       this.videoId = res;
       this.writtenComment.setValue('');
       this.loadComments(res);
     }
   });
  }

  checkRoute(url) {
    if (url.startsWith('/tv')) {
      this.displayComments = true;
  } else {
    this.displayComments = false;
  }

}

  loadComments(id) {
    this.loadingComments = true;
    this.commentsService.getComments(`Video_${id}`).subscribe(res => {
        this.loadingComments = false;
        if (res.comments.length === 0) {
        this.noComments = true;
      } else {
        this.noComments = false;
        this.comments = res.comments;
      }
    });
  }

  submitComment() {
    if (this.writtenComment.value !== '') {
      this.postingComment = true;
      const comment = {
        PageId: `Video_${this.videoId}`,
        comment: this.writtenComment.value,
        profilePic: this.userData.profilePicUrl,
        userId: this.userData.userId,
      };

      this.commentsService.saveComment(comment).subscribe(result => {
        this.comments.unshift(comment);
        this.noComments = false;
        this.postingComment = false;
        this.writtenComment.setValue('');
      });
    }
  }

}
