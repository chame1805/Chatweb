import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Interfaces/contacto';
import { Chat } from '../Interfaces/chat';
import { UsuarioHasChat } from '../Interfaces/UsuarioHasChat';

@Injectable({
  providedIn: 'root'
})
export class ConnectDatabaseService {

  private apiUrl = 'http://localhost:3000/api/chats';


  private apiUrl2 = 'http://localhost:3000/api/uschat';

  constructor(private http: HttpClient) { }
  
  getChats(): Observable<Chat[]>{
    return this.http.get<Chat[]>(this.apiUrl)
  }
  NewChat(data: Chat): Observable<any> {
    return this.http.post<Chat>(this.apiUrl, data);
  }
  newUsChat(data: UsuarioHasChat): Observable<any>{
    return this.http.post<UsuarioHasChat>(this.apiUrl2, data)
  }
  
}
