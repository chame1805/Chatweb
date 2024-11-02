import { Injectable } from '@angular/core';
import { Chat } from '../Interfaces/chat';
import { Mensaje } from '../Interfaces/mensaje';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../Interfaces/Contactos';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  mensaje : Mensaje[] = [
  ]

  private apiUrl = 'http://localhost:3000/api/mensajes';
  private apiUrl2 = 'http://localhost:3000/api/usuarios';
  constructor(private http: HttpClient) { }

  
  getMensajes(): Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(this.apiUrl)
  }
  getChatsById(id: number): Observable<Mensaje>{
    return this.http.get<Mensaje>(this.apiUrl2 + "/" + id)
  }
  addMensaje(mensaje: any): Observable<any>{
    return this.http.post<Mensaje>(this.apiUrl, mensaje);
  }
}
