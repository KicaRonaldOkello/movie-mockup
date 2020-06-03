import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { VideosService } from 'src/app/services/videos/videos.service';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-playlist',
  templateUrl: './manage-playlist.component.html',
  styleUrls: ['./manage-playlist.component.scss']
})
export class ManagePlaylistComponent implements OnInit {

  videos: any = '';
  page = 0;
  duration = {};
  unselectedDuration = {};
  selectedVideos: any = [];
  playlistIds = [];
  noPlaylistItems = false;
  loadingVideoLists = true;
  newPlaylistIds = [];
  uploadingVideoList = false;
  limit = 12;
  constructor(private videoService: VideosService, private snackBar: MatSnackBar, ) {
  }

  ngOnInit() {
    this.loadVideos();
  }

  onMetadata(e, index) {
    this.duration[index] = parseInt(e.target.duration, 10);
  }

  onUnselectedMetadata(e, index) {
    this.unselectedDuration[index] = parseInt(e.target.duration, 10);
  }

  getAllVideos(videoIds) {
    return forkJoin(
      videoIds.map(
        i => this.videoService.getSingleVideo(i))
    ).subscribe(videos => {
      this.selectedVideos = videos;
      this.loadingVideoLists = false;
    });
  }

  getPlaylistItems() {
    this.videoService.getPlaylist().subscribe(data => {
      if (data.playlistsItems.length === 0) {
        this.loadingVideoLists = false;
      } else {
      data.playlistsItems.map(videoItem => {
        return this.playlistIds.push(videoItem.videoId);
      });
      const videosToLoad = this.videos.filter(item => !this.playlistIds.includes(item.id));
      this.videos = videosToLoad;
      this.getAllVideos(this.playlistIds);
    }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  loadVideos() {
    this.videoService.getAllVideos(this.page, this.limit, {}, {}).subscribe(response => {
      this.videos = response.videos;
      this.getPlaylistItems();
    });
  }

  submitVideos() {
    this.uploadingVideoList = true;
    this.newPlaylistIds = [];
    this.selectedVideos.map(video => this.newPlaylistIds.push(video.id));
    const data = {
      PlaylistId: 1,
      VideoIds: this.newPlaylistIds
    };

    this.videoService.savePlaylistItems(data).subscribe(res => {
      this.uploadingVideoList = false;
      if (res.statusDesc === 'SUCCESS') {
        this.snackBar.open('Playlist has been updated succesfully', '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
      }
    });
  }

}
