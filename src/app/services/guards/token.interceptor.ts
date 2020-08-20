import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import Helpers from 'src/app/helpers/helpers';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private excludedUrlsRegex: RegExp[];
  private excludedUrls = [ '.svg' ];
  constructor(private router: Router) {
    this.excludedUrlsRegex =
      this.excludedUrls.map(urlPattern => new RegExp(urlPattern, 'i')) || [];
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const passThrough: boolean =
      !!this.excludedUrlsRegex.find(regex => regex.test(request.url));

    if (passThrough) {
        return next.handle(request);
      } else {
        if (request.headers.get('skip')) {
          return next.handle(request);
        }
        const data = Helpers.getUserData();
        const token = data === null ? 'token' : data.authToken.tokenValue;
        request = request.clone({
          setHeaders: {
            token
          }
        });
        return next.handle(request).pipe(tap(() => {},
          (err: any) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status !== 401) {
                  return;
                }
                this.router.navigateByUrl('/auth');
                return throwError(err);
              }
          }
          ));

      }

  }
}
