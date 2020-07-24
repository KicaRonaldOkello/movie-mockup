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

  private displayUsername = new BehaviorSubject('');
  username = this.displayUsername.asObservable();

  private investmentProject = new BehaviorSubject('');
  editInvestmentProject = this.investmentProject.asObservable();

  private projectId = new BehaviorSubject('');
  deletedProjectId = this.projectId.asObservable();

  private  investorMatching = new BehaviorSubject('');
  investorMatchingData = this.investorMatching.asObservable();

  private logout = new BehaviorSubject('');
  logoutState = this.logout.asObservable();

  private searchTranslationPackage = new BehaviorSubject('');
  translationParameters = this.searchTranslationPackage.asObservable();

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

  showEditable(value) {
    this.editClientCard.next(value);
  }

  loggedIn() {
    this.displayUsername.next('true');
  }

  editProject(data: any) {
    this.investmentProject.next(data);
  }

  deleteProject(id) {
    this.projectId.next(id);
  }

  sendInvestorMatchingData(data) {
    this.investorMatching.next(data);
  }

  loggedOut() {
    this.logout.next('true');
  }

  searchTranslations(data) {
    this.searchTranslationPackage.next(data);
  }
}
