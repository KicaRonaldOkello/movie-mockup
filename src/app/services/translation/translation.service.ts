import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  getAllLanguages(): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllLanguages`,
    ).pipe(
      map(data => data)
    );
  }

  getAllTranslatorPackages(page, limit, params): Observable<any> {
    return this.http.get(
      `${this.base_url}GetAllTranslatorPackages`, {params: { ...params, page, limit }}
    ).pipe(
      map(data => data)
    );
  }

  getTranslatorPackage(Id): Observable<any> {
    return this.http.get(
      `${this.base_url}GetTranslatorPackage`, {params: { Id }}
    ).pipe(
      map(data => data)
    );
  }

  createTranslator(translator): Observable<any> {
    return this.http.post(
      `${this.base_url}SaveTranslatorPackage`, translator
    ).pipe(
      map(data => data)
    );
  }
}
