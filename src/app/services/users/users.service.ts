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

  getUserByName(name): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllUsers`, {params: name }
    ).pipe(
      map(data => data)
    );
  }
}
