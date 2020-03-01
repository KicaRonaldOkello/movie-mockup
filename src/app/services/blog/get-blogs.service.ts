import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetBlogsService {

  constructor(private http: HttpClient) { }

  getBlogs(page, limit=12):Observable<any> {
    return this.http.get(
      `https://hebertazurefunctions.azurewebsites.net/api/GetAllBlogArticles?limit=${limit}&page=${page}&code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`
    ).pipe(
      map(data => data),
      catchError((error) => { // Error...
        // Handle 'timeout over' error
        if (error instanceof TimeoutError) {
           return throwError('Timeout Exception');
        }
     
        // Return other errors
        return throwError(error);
      })
    )
  }

  getSingleBlog(id):Observable<any> {
    return this.http.get(
      `https://hebertazurefunctions.azurewebsites.net/api/GetBlogArticle?Id=${id}&code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`
    ).pipe(
      map(data => data)
    )
  }
}
