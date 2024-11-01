import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../Interfaces/contacto';
import { Chat } from '../Interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ConnectDatabaseService {

  private apiUrl = 'http://localhost:3000/api/chats';

  constructor(private http: HttpClient) { }

  // Método para obtener datos
  getChats(): Observable<Chat[]>{
    return this.http.get<Chat[]>(this.apiUrl)
  }
  NewChat(data: Chat): Observable<any> {
    return this.http.post<Chat>(this.apiUrl, data);
  }
  
}
