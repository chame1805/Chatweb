import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Interfaces/contacto';

@Injectable({
  providedIn: 'root'
})
export class ConnectDatabaseService {

  private apiUrl = 'http://localhost:3000/api/usuarios'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener datos
  get(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrl)
  }
  enviarDatos(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  
}
