import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  base_url = environment.base_url;
  constructor(private http: HttpClient) { }


  getPlaylist(playlistId= 1): Observable<any> {
    return this.http.get(
      `${this.base_url}GetPlaylist?Id=${playlistId}`
    ).pipe(
      map(data => data)
    );
  }

  getSingleVideo(videoId): Observable<any> {
    return this.http.get(
      `${this.base_url}GetVideo?Id=${videoId}`
    ).pipe(
      map(data => data)
    );
  }

  getAllVideos(page, limit= 12, category, orderBy): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllVideos?limit=${limit}`, { params: { page, ...category, ...orderBy}}
    ).pipe(
      map(data => data)
    );
  }

  saveVideo(video): Observable<any> {
    return this.http.post(
      `${this.base_url}SaveVideo`, video
    ).pipe(
      map(data => data)
    );
  }

  deleteVideo(videoId): Observable<any> {
    return this.http.delete(
      `${this.base_url}DeleteVideo?Id=${videoId}`,
    ).pipe(
      map(data => data)
    );
  }

  savePlaylistItems(video): Observable<any> {
    return this.http.post(
      `${this.base_url}SavePlaylistItems`, video
    ).pipe(
      map(data => data)
    );
  }


}
