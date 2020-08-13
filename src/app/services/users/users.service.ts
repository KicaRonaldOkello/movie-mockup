import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  base_url = environment.base_url;
  constructor(private http: HttpClient) { }

  getUserByName(userInfo): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllUsers`, {params: { ...userInfo } }
    ).pipe(
      map(data => data)
    );
  }

  getAllUserRoles(): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllUserRoles`,
    ).pipe(
      map(data => data)
    );
  }

  updateUser(updatedData): Observable<any> {
    return this.http.post(
      `${this.base_url}UpdateUser`, updatedData
    ).pipe(
      map(data => data)
    );
  }

  changeUserPassword(updatedData): Observable<any> {
    return this.http.post(
      `${this.base_url}ChangeUserPassword`, updatedData
    ).pipe(
      map(data => data)
    );
  }

  forgotPassword(userId): Observable<any> {
    return this.http.post(
      `${this.base_url}ForgotPassword`, userId
    ).pipe(
      map(data => data)
    );
  }

  addOrRemoveAdmin(userData): Observable<any> {
    return this.http.post(
      `${this.base_url}AddOrRemoveAdmin`, userData
    ).pipe(
      map(data => data)
    );
  }

  blockOrUnblockUser(userData): Observable<any> {
    return this.http.post(
      `${this.base_url}BlockOrUnblockUser`, userData
    ).pipe(
      map(data => data)
    );
  }
}
