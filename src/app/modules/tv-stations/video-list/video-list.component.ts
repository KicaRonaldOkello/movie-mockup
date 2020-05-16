import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {VideosService} from '../../../services/videos/videos.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit, OnChanges {

  @Input() private  category;
  @Output() videoToBePlayed = new EventEmitter();
  duration = {};
  videos = [];
  loadVideos = true;
  coverImageUrl = '';
  backgroundImages = {
    Movies: 'planet_ape_final',
    Series: 'matrix',
    Sports: 'soccer-ball',
    News: 'news-anchor',
    Documentary: 'dinklage',
    Live: 'simpsons'
  };
  currentCategory;
  constructor(private videosService: VideosService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadVideos = true;
    if (changes.category) {
      this.currentCategory = changes.category.currentValue.categoryCode;
      this.coverImageUrl = changes.category.currentValue.coverImageUrl;
      this.fetchVideos(changes.category.currentValue.categoryCode);
    }
  }

  onMetadata(e, index) {
    this.duration[index] = parseInt(e.target.duration, 10);
  }

  fetchVideos(category) {
    this.videosService.getAllVideos(0, 20, {category}).subscribe(res => {
      this.videos = res.videos;
      this.loadVideos = false;
    });
  }

  playVideo(event) {
    this.videoToBePlayed.emit(event);
  }
}
