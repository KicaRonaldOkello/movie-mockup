import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private videoId = new BehaviorSubject('');
  deletedVideoId = this.videoId.asObservable();

  private videoObject = new BehaviorSubject('');
  updateVideo = this.videoObject.asObservable();

  pagination = new BehaviorSubject('');
  paginateInvestmentProject = this.pagination.asObservable();

  displayAd = new BehaviorSubject('false');
  displayAdComponent = this.displayAd.asObservable();

  private videoComment = new BehaviorSubject('');
  videoCommentId = this.videoComment.asObservable();

  private editClientCard = new BehaviorSubject('false');
  makeClientCardEditable = this.editClientCard.asObservable();
  
  constructor() { }

  newVideoId(id) {
    this.videoId.next(id);
  }

  updateVideoItem(video) {
    this.videoObject.next(video);
  }

  traverseToPage(page) {
    this.pagination.next(page);
  }

  showAd(data) {
    this.displayAd.next(data);
  }

  videoComments(id) {
    this.videoComment.next(id);
  }

  showEditable() {
    this.editClientCard.next('true');
  }
}
