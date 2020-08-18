import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  saveOrder(orderData): Observable<any> {
    return this.http.post(
      `${this.base_url}SaveOrder`, orderData
    ).pipe(
      map(data => data)
    );
  }

  verifyFlutterWavePayment(paymentData) {
    return this.http.get(
      `${this.base_url}VerifyAndSaveFlutterwavePayment`, { params: paymentData }
    ).pipe(
      map(data => data)
    );
  }
}
