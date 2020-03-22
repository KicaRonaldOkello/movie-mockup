import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { VideosService } from 'src/app/services/videos/videos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

  @Input() data:any;
  controls = false;
  @Output() deletedItemId = new EventEmitter();
  @Output() updateVideo = new EventEmitter();
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private videoService: VideosService,
    ) {
      this.matIconRegistry.addSvgIcon(
        "delete",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/delete.svg")
      );

      this.matIconRegistry.addSvgIcon(
        "refresh",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/refresh.svg")
      );
    }

  ngOnInit() {
  }

  mouseEnter() {
    this.controls = true;
  }

  mouseLeave() {
    this.controls = false;
  }

  deleteVideoItem(videoId) {
    this.videoService.deleteVideo(videoId).subscribe(res => {
      this.snackBar.open('Video has been deleted successfully', '', {
        duration: 5000,
        panelClass: ['green-snackbar']
      });
      this.deletedItemId.emit(videoId);
    });
  }

  updateVideoItem(data) {
    this.updateVideo.emit(data);
  }

}
