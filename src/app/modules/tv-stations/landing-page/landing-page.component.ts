import { Component, OnInit } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { VideosService } from 'src/app/services/videos/videos.service';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import {VideoCategoriesService} from '../../../services/videoCategories/video-categories.service';
import Helpers from '../../../helpers/helpers';
import {AuthService} from '../../../services/guards/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionsService} from '../../../services/subscriptions/subscriptions.service';
import {OrderService} from '../../../services/order/order.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as getVideoId from 'get-video-id';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  controls = false;
  defaultTvDisplay = true;
  chosenCategory;
  displayPlayButton = true;
  myVideo: any;
  api: VgAPI;
  isPlaying: any;
  duration: any;
  sources;
  paymentVerification;
  payment;
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
  videoDescription = '';
  loadingPage = true;
  videoCategories = [];
  loadCategories = true;
  userLoggedIn;
  userData;
  subscribing = false;
  subscribedCategoryId;
  loadedVideoDuration;
  preselectedCategories = {
    sports: {
      id: 'VideoCategory-637258478209573904',
      categoryCode: 'sports',
      coverImageUrl: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE0MjB9&w=1000&q=80'
    },
    movies: {
      id: 'VideoCategory-637258483333984415',
      categoryCode: 'movies',
      coverImageUrl: 'https://www.pluggedin.com/wp-content/uploads/2020/01/Dawn-of-the-Planet-of-the-Apes-large-1024x585.jpg'
    },
    news: {
      id: 'VideoCategory-637258480776744068',
      categoryCode: 'news',
      coverImageUrl: 'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1492773544/articles/2014/11/06/local-news-anchor-dances-at-his-desk/local-news-anchor-dances-at-his-desk-image_zjuzwr'
    },
    cartoons: {
      id: 'VideoCategory-637259520361363182',
      categoryCode: 'cartoons',
      coverImageUrl: 'https://puzzledpagan.files.wordpress.com/2016/09/021.jpg?w=1300'
    },
    series_current: {
      id: 'VideoCategory-637259521890893291',
      categoryCode: 'series-current',
      coverImageUrl: 'https://www.datingadvice.com/wp-content/uploads/2013/05/featured-large-838.jpg'
    },
    series_complete: {
      id: 'VideoCategory-637259523362275693',
      categoryCode: 'series-complete',
      coverImageUrl: 'https://media.agonybooth.com/wp-content/uploads/2016/07/still-of-keanu-reeves-and-hugo-weaving-in-the-matrix-reloaded-2003-large-picture.jpg'
    }

  };

  constructor(
    private videoService: VideosService,
    private shareDataService: ShareDataService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private subscriptionService: SubscriptionsService,
    private videoCategoryService: VideoCategoriesService
    ) {

    this.sources = [];
    this.shareDataService.showAd('true');
    this.videoService.getPlaylist().subscribe(data => {
      if (data.playlistsItems.length === 0) {
        this.noPlaylistItems = true;
      } else {
      data.playlistsItems.map(videoItem => {
        return this.playlistIds.push(videoItem.videoId);
      });
      this.getVideo(this.playlistIds[0]);
    }
    });

    this.shareDataService.logoutState.subscribe(res => {
      if (res === 'true') {
        this.userLoggedIn = false;
      }
    });
    this.userData = Helpers.getUserData();

  }

  onMetadata(e) {
    this.loadedVideoDuration = parseInt(e.target.duration, 10);
  }

  getVideo(videoId) {
    this.videoService.getSingleVideo(videoId).subscribe(res => {
      this.videos = [res];
      this.initiallyDisplayPlayButton = true;
      this.setCurrentVideo(this.videos[0]);
      this.loadingPage = false;
    });
  }

  setCurrentVideo(source) {
    this.sources = [];
    if (source.isYoutubeVideo) {
       source.fileUrl = getVideoId(source.fileUrl).id;
     }
    this.sources.push(source);
    this.videoTitle = source.name;
    this.videoGenre = source.genre;
    this.videoCategory = source.categoryId;
    this.videoRecommendedAge = source.recommendedAge;
    this.videoDescription = source.description;
    this.shareDataService.videoComments(source.id);
  }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.getVideoCategories();
    Helpers.getUserData() ? this.userLoggedIn = true : this.userLoggedIn = false;
    this.paymentVerification = this.route.snapshot.queryParamMap.get('paymentVerification');
    this.payment = this.route.snapshot.queryParamMap.get('payment');
    this.failureMessage();
    history.pushState(null, '', location.href.split('?')[0]);
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

        if (this.numberOfPlay < this.playlistIds.length - 1) {
          this.numberOfPlay = this.numberOfPlay + 1;
        } else {
          this.numberOfPlay = 0;
        }
        this.initiallyDisplayPlayButton = false;
        this.getVideo(this.playlistIds[this.numberOfPlay]);
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
    this.videoCategoryService.getAllVideoCategories(
      undefined,
      undefined,
      {
        UserId: this.userData ? this.userData.userId : null
      }).subscribe(res => {
      this.videoCategories = res.items;
      this.loadCategories = false;

    });
  }
  playCurrentVideo(event) {
    this.setCurrentVideo(event);
  }

  checkIfUserIsLoggedIn(category) {
    if (this.auth.isAuthenticated(this.router.url)) {
      this.displayCategoryVideos(category);
    } else {
      this.auth.isAuthenticated(this.router.url);
    }
  }

  failureMessage() {
    let message = '';
    if (this.paymentVerification === 'Fail') {
      message = 'Your payment verification was not successful. Please try again';
      this.snackBar.open(message, '', {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    } else if (this.payment === 'Fail') {
      message = 'Your payment not successful. Please try again';
      this.snackBar.open(message, '', {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    } else if (this.payment === 'Success') {
      message = 'You payment was successful';
      this.snackBar.open(message, '', {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
    }

  }

  subscribeToCategory(categoryId) {
    this.subscribing = true;
    this.subscribedCategoryId = categoryId;
    const data = {
      id: 0,
      userId: this.userData.userId,
      subscriptionType: 'onlineTV',
      categoryId
    };
    this.subscriptionService.saveUserSubscription(data).subscribe(res => {
      this.subscribing = false;
      if (res.statusCode === '0') {
      const index = this.videoCategories.findIndex((category => category.categoryCode === categoryId));
      this.videoCategories[index].isSubscribed = true;
      } else {
      this.snackBar.open(`Error: You could not subscribe to the category ${categoryId}`, '', {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    }
    });
  }

  unSubscribeFromCategory(CategoryId) {
    this.subscribing = true;
    this.subscribedCategoryId = CategoryId;
    const data = {
    UserId: this.userData.userId,
    CategoryId
  };
    this.subscriptionService.deleteUserSubscription(data).subscribe(res => {
    this.subscribing = false;
    if (res.statusCode === '0') {
      const index = this.videoCategories.findIndex((category => category.categoryCode === CategoryId));
      this.videoCategories[index].isSubscribed = false;
    } else {
      this.snackBar.open(`Error: You could not unsubscribe to the category ${CategoryId}`, '', {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    }
    });
}


  onYoutubePlayerReady(event) {
    event.target.playVideo();
    this.loadedVideoDuration = event.target.getDuration();
  }

  onStateChange(event) {
    if (event.data === 0) {
      if (this.numberOfPlay < this.playlistIds.length - 1) {
        this.numberOfPlay = this.numberOfPlay + 1;
      } else {
        this.numberOfPlay = 0;
      }
      this.initiallyDisplayPlayButton = false;
      this.getVideo(this.playlistIds[this.numberOfPlay]);
    }
  }

}
