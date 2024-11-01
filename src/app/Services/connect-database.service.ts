import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../Interfaces/contacto';

@Injectable({
  providedIn: 'root'
})
export class ConnectDatabaseService {

  private apiUrl = 'http://localhost:3000/api/usuarios'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener datos
  get(): Observable<Contacto[]>{
    return this.http.get<Contacto[]>(this.apiUrl)
  }

  
  enviarDatos(data: Contacto): Observable<any> {
    return this.http.post<Contacto>(this.apiUrl, data);
  }
  
}
