import { Injectable } from '@angular/core';
import { Usuario } from '../Interfaces/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor(  ) { }
  contactos: Usuario[] = [
  ]
  eliminarContacto(id: number){
    for (let index = 0; index < this.contactos.length; index++) {
      if (this.contactos[index].idUsuario === id) {
        this.contactos.splice(index, 1);
      }
    }
    console.log(this.contactos)
  }
}
