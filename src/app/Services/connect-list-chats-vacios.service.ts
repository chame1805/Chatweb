import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../Interfaces/Contactos';
import { Usuario } from '../Interfaces/contacto';

@Injectable({
  providedIn: 'root'
})
export class ConnectListChatsVaciosService {

  listaContactos : Usuario[]=[]
  chats: Contacto[]=[]
  localstorage = Number(sessionStorage.getItem('id_user')) || 0
  private apiUrl = 'http://34.228.129.198:3000/api/contatos';
  private apiUrl2 = 'http://34.228.129.198:3000/api/usuarios';
  constructor(private http: HttpClient) { }

  deleteContacto(id: number): Observable<Contacto>{
    return this.http.delete<Contacto>(this.apiUrl + '/' + id);
  }
  getLocalStorage ( ){
    return this.localstorage
  }
  getChats(): Observable<Contacto[]>{
    return this.http.get<Contacto[]>(this.apiUrl)
  }
  getChatsById(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.apiUrl2 + "/" + id)
  }
  NewChat(data: any): Observable<any> {
    return this.http.post<Contacto>(this.apiUrl, data);
  }
}
