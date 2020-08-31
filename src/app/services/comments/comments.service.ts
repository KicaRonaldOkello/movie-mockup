import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  base_url = environment.base_url;
  constructor(private http: HttpClient) { }

  getComments(commentId): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllPageComments?PageId=${commentId}`, { headers: { skip: 'true'} }
    ).pipe(
      map(data => data)
    );
  }

  saveComment(comment): Observable <any> {
    return this.http.post(
      `${this.base_url}SavePageComment`,
    comment).pipe(
      map(data => data)
    );
  }
}
