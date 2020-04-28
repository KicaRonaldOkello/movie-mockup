import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import Helpers from 'src/app/helpers/helpers';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get("skip")) {
      return next.handle(request);
    }
    const data = Helpers.getUserData();
    request = request.clone({
      setHeaders: {
        token: `${data.authToken.tokenValue}`
      }
    });
    return next.handle(request);
  }
}