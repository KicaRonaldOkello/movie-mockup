import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentProjectService {

  base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  saveInvestmentProject(client):Observable<any> {
    return this.http.post(
      `${this.base_url}SaveInvestmentProject`, client
    ).pipe(
      map(data => data)
    )
  }

  getAllInvestmentProjects(page, limit, params):Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllInvestmentProjects`, {params: {...params, page, limit }}
    ).pipe(
      map(data => data)
    )
  }
}
