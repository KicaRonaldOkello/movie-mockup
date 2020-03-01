import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(commentId):Observable<any> {
    return this.http.get(
      `https://hebertazurefunctions.azurewebsites.net/api/GetAllPageComments?PageId=Blog_${commentId}&code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`
    ).pipe(
      map(data => data)
    )
  }

  saveComment(comment):Observable<any> {
    return this.http.post(
      `https://hebertazurefunctions.azurewebsites.net/api/SavePageComment?&code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`,
    comment).pipe(
      map(data => data)
    )
  }
  
}
