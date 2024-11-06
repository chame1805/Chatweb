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

  private api = "http://34.228.129.198:3000/"
  private apiUrl = this.api +  'api/chats/';
  private apiUrl2 = this.api + 'api/uschat';
  private apiUrl3 =  this.api + "api/uschat/usuario/"
  private apiUrlPert = "{´/usuario/  /chats´}"
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
