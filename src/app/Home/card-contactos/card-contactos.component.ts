import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contacto } from '../../Interfaces/contacto';
import { ContactosService } from '../../Services/contactos.service';

@Component({
  selector: 'app-card-contactos',
  templateUrl: './card-contactos.component.html',
  styleUrl: './card-contactos.component.css'
})
export class CardContactosComponent {
  constructor( public Contacto: ContactosService){}

  @Output() cambioElTitulo = new EventEmitter<string>()
  flagD: boolean = false;
  @Input() contacto: Contacto = {
    id: 0,
    name : '',
    email : '',
    id_chat: 1
  }
  editarDatos(){
    this.flagD = !this.flagD
  }
  GuardarDatos(){
    this.flagD = !this.flagD
    console.log(this.Contacto.contactos)
  }
  eliminar(){
    this.Contacto.eliminarContacto(this.contacto.id)
  }
  cambiosEnElNombre(){
    this.cambioElTitulo.emit(this.contacto?.name)
    console.log(this.contacto?.name)
    
  }
}

