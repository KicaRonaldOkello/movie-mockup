import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { VideosService } from 'src/app/services/videos/videos.service';
import { Observable, forkJoin } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import {VideoCategoriesService} from '../../../services/videoCategories/video-categories.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  controls = false;
  defaultTvDisplay = true;
  chosenCategory;
  displayPlayButton = true;
  myVideo: any;
  api: VgAPI;
  isPlaying: any;
  duration: any;
  sources: Array<Object>;
  numberOfPlay = 0;
  playlistIds = [];
  videos = [];
  noPlaylistItems = false;
  initiallyDisplayPlayButton = false;
  finalVideos = [];
  videoTitle = '';
  videoGenre = '';
  videoCategory = '';
  videoRecommendedAge = '';
  loadingPage = true;
  videoCategories = [];
  loadCategories = true;

  constructor(
    private videoService: VideosService,
    private shareDataService: ShareDataService,
    private videoCategoryService: VideoCategoriesService
    ) {

    this.sources = new Array<Object>();

    this.videoService.getPlaylist().subscribe(data => {
      if (data.playlistsItems.length === 0) {
        this.noPlaylistItems = true;
      } else {
      data.playlistsItems.map(videoItem => {
        return this.playlistIds.push(videoItem.videoId);
      });

      this.getAllVideos(this.playlistIds);
    }
    });

  }

  getAllVideos(videoIds) {
    return forkJoin(
      videoIds.map(
        i => this.videoService.getSingleVideo(i))
    ).subscribe(videos => {
      this.videos = videos;
      this.sources.push(this.videos[0].fileUrl);
      this.videoTitle = this.videos[0].name;
      this.videoGenre = this.videos[0].genre;
      this.videoCategory = this.videos[0].categoryId;
      this.videoRecommendedAge = this.videos[0].recommendedAge;
      this.initiallyDisplayPlayButton = true;
      this.loadingPage = false;
      this.shareDataService.showAd('true');
      this.shareDataService.videoComments(this.videos[0].id);
    });
  }
  setCurrentVideo(source) {
    this.sources = new Array<Object>();
    this.sources.push(source.fileUrl);
    this.videoTitle = source.name;
    this.videoGenre = source.genre;
    this.videoCategory = source.categoryId;
    this.videoRecommendedAge = source.recommendedAge;
    this.api.getDefaultMedia().currentTime = 0;
    this.shareDataService.videoComments(source.id);
  }

  ngOnInit() {
    this.getVideoCategories();
  }

  ngAfterViewInit() {

  }

  mouseEnter() {
    this.controls = true;
  }

  mouseLeave() {
    this.controls = false;
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.play.subscribe(
      (event) => {
        this.displayPlayButton = false;
      }
    );

    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(
      (event) => {
        this.api.play();
      }
    );

    this.api.getDefaultMedia().subscriptions.pause.subscribe(
      (event) => {
        this.displayPlayButton = true;
      }
    );

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      (event) => {

        if (this.numberOfPlay < this.videos.length - 1) {
          this.numberOfPlay = this.numberOfPlay + 1;
        } else {
          this.numberOfPlay = 0;
        }
        this.setCurrentVideo(this.videos[this.numberOfPlay]);
        this.api.play();
      }
    );

    this.api.getDefaultMedia().subscriptions.canPlayThrough.subscribe(() => {
      this.api.play();
    });

    this.api.getDefaultMedia().subscriptions.loadedData.subscribe(() => {
      this.api.play();
    });

  }

  playVideo() {
    const myVideo: any = document.getElementById('singleVideo');

    if (myVideo.paused) {
      myVideo.play();
      this.displayPlayButton = false;
    }
  }

  displayCategoryVideos(category) {
    this.chosenCategory = category;
    this.defaultTvDisplay = false;
  }

  getVideoCategories() {
    this.videoCategoryService.getAllVideoCategories().subscribe(res => {
      this.videoCategories = res.items;
      this.loadCategories = false;

    });
  }
  playCurrentVideo(event) {
    this.setCurrentVideo(event);
  }

}
