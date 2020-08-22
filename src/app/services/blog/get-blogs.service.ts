import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetBlogsService {

  base_url = environment.base_url;

  constructor(private http: HttpClient) { }
  getBlogs(page, limit= 12): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllBlogArticles?limit=${limit}&page=${page}`
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
    );
  }

  getSingleBlog(id): Observable<any> {
    return this.http.get(
      `${this.base_url}GetBlogArticle?Id=${id}`,{ headers:{'skip':'true'} }
    ).pipe(
      map(data => data)
    );
  }

  createBlog(blog): Observable<any> {
    return this.http.post(
      `${this.base_url}SaveBlogArticle?`, blog
    ).pipe(
      map(data => data)
    );
  }

  deleteBlog(id): Observable<any> {
    return this.http.delete(
      `${this.base_url}DeleteBlogArticle?Id=${id}&code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`
    ).pipe(
      map(data => data)
    )
  }
}
