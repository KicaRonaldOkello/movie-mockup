import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentProjectService {

  base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  saveInvestmentProject(client): Observable<any> {
    return this.http.post(
      `${this.base_url}SaveInvestmentProject`, client
    ).pipe(
      map(data => data)
    );
  }
  getSingleInvestmentProject(id): Observable<any> {
    return this.http.get(
      `${this.base_url}GetInvestmentProject`, {params: { Id : id } }
    ).pipe(
      map(data => data)
    );
  }
  deleteInvestmentProject(id): Observable<any> {
    return this.http.delete(
      `${this.base_url}DeleteInvestmentProject`, {params: { Id : id } }
    ).pipe(
      map(data => data)
    );
  }

  getAllInvestmentProjects(page, limit, params): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllInvestmentProjects`, {params: {...params, page, limit }}
    ).pipe(
      map(data => data),
      catchError((error) => {
        if (error instanceof TimeoutError) {
           return throwError('Timeout Exception');
        }
        return throwError(error);
      })
    );
  }
}
