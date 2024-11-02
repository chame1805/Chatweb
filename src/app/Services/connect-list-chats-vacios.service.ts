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
  
  private apiUrl = 'http://localhost:3000/api/contatos';
  private apiUrl2 = 'http://localhost:3000/api/usuarios';
  constructor(private http: HttpClient) { }

  deleteContacto(id: number): Observable<Contacto>{
    return this.http.delete<Contacto>(this.apiUrl + '/' + id);
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
