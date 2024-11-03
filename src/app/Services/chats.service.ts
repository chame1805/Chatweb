import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Interfaces/contacto';
import { Mensaje } from '../Interfaces/mensaje';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  mensaje : Mensaje[] = []
  usuarios: Usuario[] = []
  private apiUrl = 'http://localhost:3000/api/mensajes/';
  private apiUrl2 = 'http://localhost:3000/api/usuarios';
  private apiUrlPert = "http://localhost:3000/api/uschat/usuario/"
  private updChat = "http://localhost:3000/api/chats/"
  
  private socket: Socket;

  constructor(private http: HttpClient) { 
    this.socket = io('http://localhost:3000'); // URL del servidor Socket.IO
  }

  getMensajes(): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(this.apiUrl);
  }

  getMensajesById(id: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(this.apiUrl + id);
  }

  getChatsById(id: number): Observable<Mensaje> {
    return this.http.get<Mensaje>(this.apiUrl2 + "/" + id);
  }

  addMensaje(mensaje: any): Observable<any> {
    return this.http.post<Mensaje>(this.apiUrl, mensaje);
  }

  updateChat(id: number, data: any): Observable<any> {
    return this.http.put<Mensaje>(this.updChat + id, data);
  }

  getPerteneceTO(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlPert + id + "/pertenece");
  }

  sendMessage(msg: string) {
    this.socket.emit('mensaje', msg);
  }

  getMessages(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('mensaje', (msg: string) => observer.next(msg));
    });
  }
}
