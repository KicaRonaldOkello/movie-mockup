import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  base_url = environment.base_url;

  constructor(private http: HttpClient) { }


  signupUser(userData):Observable<any> {
    return this.http.post(
      `${this.base_url}RegisterUser`, userData,{headers:{skip:"true"} }
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
      `${this.base_url}LoginUser`, userData,{headers:{skip:"true"} }
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
