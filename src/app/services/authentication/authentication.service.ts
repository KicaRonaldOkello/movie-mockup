import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  signupUser(userData):Observable<any> {
    return this.http.post(
      `https://hebertazurefunctions.azurewebsites.net/api/RegisterUser`, userData
    ).pipe(
      map(data => data),
      // catchError((error) => {
      //   if (error instanceof TimeoutError) {
      //      return throwError('Timeout Exception');
      //   }
      //   return throwError(error);
      // })
    )
  }

  loginUser(userData):Observable<any> {
    return this.http.post(
      `https://hebertazurefunctions.azurewebsites.net/api/LoginUser`, userData
    ).pipe(
      map(data => data),
      // catchError((error) => {
      //   if (error instanceof TimeoutError) {
      //      return throwError('Timeout Exception');
      //   }
      //   return throwError(error);
      // })
    )
  }
}
