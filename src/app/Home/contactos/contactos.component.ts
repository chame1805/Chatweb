import { Component, Input } from '@angular/core';
import { Contacto } from '../../Interfaces/contacto';
import { ContactosService } from '../../Services/contactos.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.css'
})
export class ContactosComponent {

  @Input() cont: Contacto = {
    id: undefined,
    name:'',
    email: '',
    id_chat: 0
  }
  modal: boolean = false 
  constructor(public contactos: ContactosService ){}
  flagForModal(){
    this.modal = !this.modal
  }
  agregarContacto(){
    this.cont.id_chat = this.contactos.contactos.length + 1
    this.contactos.contactos.push(this.cont)
    this.cont = {
      id: 0,
      name:'',
      email: '',
      id_chat: 0
    }
  }
}
