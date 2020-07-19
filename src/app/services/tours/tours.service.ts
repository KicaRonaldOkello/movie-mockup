import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  getToursPackages(page, limit, params): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllTravelPackages`, {params: { ...params, page, limit }}
    ).pipe(
      map(data => data)
    );
  }

  getSingleToursPackage(Id): Observable<any> {
    return this.http.get(
      `${this.base_url}GetTravelPackage`, {params: { Id }}
    ).pipe(
      map(data => data)
    );
  }

  getAllSupportedCurrencies(): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllSupportedCurrencies`
    ).pipe(
      map(data => data)
    );
  }

  saveTravelPackage(travelPackage): Observable<any> {
    return this.http.post(
      `${this.base_url}SaveTravelPackage`, travelPackage
    ).pipe(
      map(data => data)
    );
  }

  deleteTravelPackage(id): Observable<any> {
    return this.http.delete(
      `${this.base_url}DeleteTravelPackage`, {params: { Id : id } }
    ).pipe(
      map(data => data)
    );
  }
}
