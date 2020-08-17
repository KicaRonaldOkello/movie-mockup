import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TermsAndConditionsService {

  base_url = environment.base_url;
  constructor(private http: HttpClient) { }

  getTermsAndConditions(): Observable<any> {
    return this.http.get(
      `${this.base_url}GetTermsAndConditions`,
    ).pipe(
      map(data => data)
    );
  }
}
