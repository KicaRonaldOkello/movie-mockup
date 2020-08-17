import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiquidationService {

  base_url = environment.base_url;
  constructor(private http: HttpClient) { }

  getUserEarnings(userId): Observable<any> {
    return this.http.get(
      `${this.base_url}GetUserEarnings`, {params: { UserId: userId }}
    ).pipe(
      map(data => data)
    );
  }

  getAllLiquidationChannels(): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllLiquidationChannelTypes`
    ).pipe(
      map(data => data)
    );
  }

  getAllIdTypes(): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllKycIDTypes`
    ).pipe(
      map(data => data)
    );
  }

  getAllLiquidations(): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllLiquidations`
    ).pipe(
      map(data => data)
    );
  }

  initiateLiquidation(liquidationData): Observable<any> {
    return this.http.post(
      `${this.base_url}InitiateLiquidation`, liquidationData
    ).pipe(
      map(data => data)
    );
  }
}
