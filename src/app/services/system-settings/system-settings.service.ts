import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {

  base_url = environment.base_url;
  constructor(private http: HttpClient) { }

  getAllSystemSettings(systemData): any {
    return this.http.get(
      `${this.base_url}GetAllSystemSettings`, {params: systemData}
    ).pipe(
      map(data => data)
    );
  }

  saveSystemSetting(systemData): any {
    return this.http.post(
      `${this.base_url}SaveSystemSetting`, systemData
    ).pipe(
      map(data => data)
    );
  }
}
