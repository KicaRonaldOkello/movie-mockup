import { Component, OnInit, HostListener } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { VideosService } from 'src/app/services/videos/videos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import {environment} from '../../../../environments/environment';
import {VideoCategoriesService} from '../../../services/videoCategories/video-categories.service';
import Helpers from '../../../helpers/helpers';


declare var cloudinary: any;
@Component({
  selector: 'app-manage-videos',
  templateUrl: './manage-videos.component.html',
  styleUrls: ['./manage-videos.component.scss']
})
export class ManageVideosComponent implements OnInit {

  videoForm: FormGroup;
  reloadVideos = false;
  savingVideo = false;
  updateVideoItemId = '';
  isShow: boolean;
  topPosToStartShowing = 100;
  videos: any = '';
  page: any = 0;
  pageCount: any;
  limit = 12;
  userData;
  videoCategories = [];
  loadingVideoCategories = true;
  constructor(
    private fb: FormBuilder,
    private videoService: VideosService,
    private snackBar: MatSnackBar,
    private shareDataService: ShareDataService,
    private videoCategoriesService: VideoCategoriesService
    ) {
      this.shareDataService.deletedVideoId.subscribe(id => {
        if (id !== '') {
        this.deleteVideoItem(id);
        this.removeDeletedItemFromCurrentData(id);
        }
      });

      this.shareDataService.updateVideo.subscribe(video => {
        if (video !== '') {
          this.updateVideo(video);
        }
      });
      this.userData = Helpers.getUserData();
    }

  ngOnInit() {
    this.videoForm = this.fb.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      RecommendedAge: ['', Validators.required],
      CategoryId: ['', Validators.required],
      FileUrl: ['', Validators.required]
    });
    this.loadVideos();
    this.getAllVideoCategories();
  }

  submitVideo(video) {
    this.savingVideo = true;
    let message = '';
    if (this.updateVideoItemId !== '') {
      video.Id = this.updateVideoItemId;
      message = 'Video has been updated successfully';
    } else {
      video.Id = '0';
      message = 'Video has been created successfully';
    }
    this.videoService.saveVideo(video).subscribe(data => {
      if (data.statusDesc === 'SUCCESS') {
        this.snackBar.open(message, '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.videoForm.patchValue({
          Name: '',
          Description: '',
          Genre: '',
          RecommendedAge: '',
          CategoryId: '',
          FileUrl: ''
        });
        this.loadVideos();
        this.savingVideo = false;
        this.updateVideoItemId = '';
      } else {
        this.snackBar.open(data.statusDesc, '', {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        this.savingVideo = false;
      }
    });
  }

  upload() {
    const myWidget = cloudinary.createUploadWidget({
      cloudName: environment.cloudName,
      uploadPreset: environment.uploadPreset,
      multiple: false,
      maxVideoFileSize: environment.maxVideoFileSize
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.videoForm.patchValue({
                FileUrl: result.info.secure_url
              });
        }
      }
    );

    myWidget.open();
    }

    updateVideo(data) {
      this.updateVideoItemId = data.id;
      this.videoForm.patchValue({
        Name: data.name,
        Description: data.description,
        Genre: data.genre,
        RecommendedAge: data.recommendedAge,
        CategoryId: data.categoryId,
        FileUrl: data.fileUrl
      });
      this.gotoTop();
    }

    @HostListener('window:scroll')
    checkScroll() {
      const scrollPosition = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0;

      if (scrollPosition >= this.topPosToStartShowing) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }

    gotoTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    loadVideos() {
      this.videoService.getAllVideos(this.page, this.limit, {}, {}).subscribe(response => {
        this.videos = response.videos;
        this.pageCount = response.pageCount;
      });
    }

    deleteVideoItem(videoId) {
      this.videoService.deleteVideo(videoId).subscribe(res => {
        this.snackBar.open('Video has been deleted successfully', '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
      });
    }

    removeDeletedItemFromCurrentData(videoId) {
      const nonDeletedBlogs = this.videos.filter(item => item.id !== videoId);
      this.videos = nonDeletedBlogs;
    }

    getAllVideoCategories() {
      this.videoCategoriesService.getAllVideoCategories(0, 30, null).subscribe(res => {
        this.loadingVideoCategories = false;
        this.videoCategories = res.items;
      });
    }

  nextPage(page) {
    this.page = page;
    this.loadVideos();
  }
}
