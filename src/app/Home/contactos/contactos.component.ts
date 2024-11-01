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
    idUsuario: undefined,
    nombre:'',
    email: '',
    password: ""
  }
  modal: boolean = false 
  constructor(public contactos: ContactosService ){}
  flagForModal(){
    this.modal = !this.modal
  }
  agregarContacto(){
    this.contactos.contactos.push(this.cont)
    this.cont = {
      idUsuario: 0,
      nombre:'',
      email: '',
      password: ""
    }
  }
}
