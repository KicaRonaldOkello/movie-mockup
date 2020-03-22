import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvestmentProjectService {

  constructor(private http: HttpClient) { }

  saveInvestmentProject(client):Observable<any> {
    return this.http.post(
      `https://hebertazurefunctions.azurewebsites.net/api/SaveInvestmentProject?code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`, client
    ).pipe(
      map(data => data)
    )
  }

  getAllInvestmentProjects(page, limit, title?):Observable<any> {
    let filters = new HttpParams().set('page', page).set('limit', limit);
    if (title) {
      filters = filters.append('title', title);
    }
    return this.http.get(
      `https://hebertazurefunctions.azurewebsites.net/api/GetAllInvestmentProjects?&code=tjNVpZgpeDGDhSfGWpOHsV25A0T7EFOzkPigTNsoE7NpLQxfqtEIRA==`, {params: filters}
    ).pipe(
      map(data => data)
    )
  }
}
