import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { VideosService } from 'src/app/services/videos/videos.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-display-videos',
  templateUrl: './display-videos.component.html',
  styleUrls: ['./display-videos.component.scss']
})
export class DisplayVideosComponent implements OnInit, OnChanges {

  page = 0;
  pageCount: number;
  videos:any = '';
  limit;
  videosLoading = true;
  @Input() reload: any;
  @Output() updateVideoItem = new EventEmitter();
  constructor(
    private videoService: VideosService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.matIconRegistry.addSvgIcon(
        "previous-page",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/left-arrow.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "next-page",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/right-arrow.svg")
      );
    }

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.videoService.getAllVideos(this.page, this.limit, {}).subscribe(response => {
      this.videos = response.videos;
      this.pageCount = response.pageCount;
      this.videosLoading = false;
    });
  }

  nextPage() {
    if (this.page >= this.pageCount) {
      return;
    } else {
    this.page += 1;
    this.loadVideos();
    }
  }

  previousPage() {
    if (this.page < 1) {
      return;
    } else {
    this.page -= 1;
    this.loadVideos();
  }
}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.reload.currentValue == true) {
      this.loadVideos();
    }
  }

  deletedItem(videoId) {
    const nonDeletedBlogs = this.videos.filter(item => item.id != videoId);
    this.videos = nonDeletedBlogs;
  }

  updateVideo(data) {
    this.updateVideoItem.emit(data);
  }
}
