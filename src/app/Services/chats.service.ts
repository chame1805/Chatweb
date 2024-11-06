import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Interfaces/contacto';
import { Mensaje } from '../Interfaces/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  mensaje : Mensaje[] = [
  ]

  api: string = "http://34.228.129.198:3000/"
  usuarios: Usuario[]=[]
  private apiUrl = this.api + 'api/mensajes/';
  private apiUrl2 = this.api + 'api/usuarios';
  private apiUrlPert = this.api +  "api/uschat/usuario/"
  private updChat= this.api + "api/chats/"
  constructor(private http: HttpClient) { }

  
  getMensajes(): Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(this.apiUrl)
  }
  getMensajesById(id:number): Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(this.apiUrl + id)
  }
  getChatsById(id: number): Observable<Mensaje>{
    return this.http.get<Mensaje>(this.apiUrl2 + "/" + id)
  }
  addMensaje(mensaje: any): Observable<any>{
    return this.http.post<Mensaje>(this.apiUrl, mensaje);
  }
  updateChat(id:number, data:any): Observable<any>{
    return this.http.put<Mensaje>(this.updChat + id, data);
  }
  getPerteneceTO(id : number): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrlPert + id + "/pertenece")
  }
}
