import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../Interfaces/chat';
import { UsuarioHasChat } from '../Interfaces/UsuarioHasChat';
import { Compuesto } from '../Interfaces/Compuesto';

@Injectable({
  providedIn: 'root'
})
export class ConnectDatabaseService {

  private apiUrl = 'http://localhost:3000/api/chats/';
  private apiUrl2 = 'http://localhost:3000/api/uschat';
  private apiUrl3 = "http://localhost:3000/api/uschat/usuario/"
  constructor(private http: HttpClient) { }
  
  getChats(id: number): Observable<Chat[]>{
    return this.http.get<Chat[]>(this.apiUrl2 + "/usuario/" + id + "/chats" )
  }
  getChatsById(id: number): Observable<Compuesto>{
    return this.http.get<Compuesto>(this.apiUrl + id )
  }
  NewChat(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  newUsChat(data: UsuarioHasChat): Observable<any>{
    return this.http.post<UsuarioHasChat>(this.apiUrl2, data)
  }
  getUsersChat(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl3 + id + "/pertenece" )
  }
}
