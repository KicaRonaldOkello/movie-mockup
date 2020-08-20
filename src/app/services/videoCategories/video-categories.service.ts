import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoCategoriesService {

  base_url = environment.base_url;
  constructor(private http: HttpClient) { }

  getAllVideoCategories(page= 0, limit= 20, id): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllVideoCategorys?Page=${page}&limit=${limit}`, { params: id}
    ).pipe(
      map(data => data)
    );
  }

  createVideoCategory(videoData): Observable<any> {
    return this.http.post(
      `${this.base_url}SaveVideoCategory`, videoData
    ).pipe(
      map(data => data)
    );
  }

  deleteVideoCategory(videoId): Observable<any> {
    return this.http.delete(
      `${this.base_url}DeleteVideoCategory`, { params: { Id: videoId } }
    ).pipe(
      map(data => data)
    );
  }
}
