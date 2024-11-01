import { Injectable } from '@angular/core';
import { Contacto } from '../Interfaces/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor() { }
  contactos: Contacto[] = [
    {id: 233382, name: 'Miguel Gutierrez', email: 'Miguelangelgtzg@gmail.com', id_chat: 1},
    {id: 233377, name: 'Miguel Gomez', email: 'Insano88@gmail.com', id_chat:2},
    {id: 233371, name: 'Jose de jesus', email: 'JoseDJesusCorona@gmail.com', id_chat:3},
  ]
  eliminarContacto(id: number){
    for (let index = 0; index < this.contactos.length; index++) {
      if (this.contactos[index].id === id) {
        this.contactos.splice(index, 1);
      }
    }
    console.log(this.contactos)
  }
}
