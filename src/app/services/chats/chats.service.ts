import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  saveChatMessage(message): Observable<any> {
    return this.http.post(
      `${this.base_url}SaveChatMessage`, message
    ).pipe(
      map(data => data)
    );
  }

  getChatConversations(userId): Observable<any> {
    return  this.http.get(
      `${this.base_url}GetChatConversations`, { params: { ...userId } }
    ).pipe(
      map(data => data)
    );
  }
}
