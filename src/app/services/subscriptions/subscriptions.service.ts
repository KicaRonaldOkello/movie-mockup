import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  base_url = environment.base_url;
  constructor(private http: HttpClient) { }

  checkPayTvSubscriptionStatus(data): Observable<any>  {
    return this.http.get(
      `${this.base_url}CheckPayTVSubscriptionStatus`, { params : data}
    ).pipe(
      map(response => response)
    );
  }

  saveUserSubscription(data): Observable<any> {
    return this.http.post(
      `${this.base_url}SaveUserSubscription`, data
    ).pipe(
      map(response => response)
    );
  }

  deleteUserSubscription(data): Observable<any> {
    return this.http.delete(
      `${this.base_url}DeleteUserSubscription`, { params: data }
    ).pipe(
      map(response => response)
    );
  }
}
