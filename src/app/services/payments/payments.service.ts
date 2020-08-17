import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  base_url = environment.base_url;
  constructor(private http: HttpClient) { }

  getAllPayments(paginationData): any {
    return this.http.get(
      `${this.base_url}GetAllPayments`, {params: paginationData}
    ).pipe(
      map(data => data)
    );
  }

  getAllPaymentTypes(): any {
    return this.http.get(
      `${this.base_url}GetAllPaymentTypes`
    ).pipe(
      map(data => data)
    );
  }
}
