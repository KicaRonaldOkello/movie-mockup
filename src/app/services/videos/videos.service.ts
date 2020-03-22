import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http: HttpClient) { }


  getPlaylist(playlistId=1):Observable<any> {
    return this.http.get(
      `https://hebertazurefunctions.azurewebsites.net/api/GetPlaylist?Id=${playlistId}&code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`
    ).pipe(
      map(data => data)
    )
  }

  getSingleVideo(videoId):Observable<any> {
    return this.http.get(
      `https://hebertazurefunctions.azurewebsites.net/api/GetVideo?Id=${videoId}&code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`
    ).pipe(
      map(data => data)
    )
  }

  getAllVideos(page, limit=12):Observable<any> {
    return this.http.get(
      `https://hebertazurefunctions.azurewebsites.net/api/GetAllVideos?limit=${limit}&page=${page}&code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`
    ).pipe(
      map(data => data)
    )
  }

  saveVideo(video):Observable<any> {
    return this.http.post(
      `https://hebertazurefunctions.azurewebsites.net/api/SaveVideo?code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`, video
    ).pipe(
      map(data => data)
    )
  }

  deleteVideo(videoId):Observable<any> {
    return this.http.delete(
      `https://hebertazurefunctions.azurewebsites.net/api/DeleteVideo?Id=${videoId}&code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`,
    ).pipe(
      map(data => data)
    )
  }

  savePlaylistItems(video):Observable<any> {
    return this.http.post(
      `https://hebertazurefunctions.azurewebsites.net/api/SavePlaylistItems?code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`, video
    ).pipe(
      map(data => data)
    )
  }


}
