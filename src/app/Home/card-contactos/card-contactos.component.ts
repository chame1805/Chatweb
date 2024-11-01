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
    idUsuario: 0,
    nombre : '',
    email : '',
    password: ""
  }
  editarDatos(){
    this.flagD = !this.flagD
  }
  GuardarDatos(){
    this.flagD = !this.flagD
    console.log(this.Contacto.contactos)
  }
  eliminar(){
    this.Contacto.eliminarContacto(this.contacto.idUsuario)
  }
  cambiosEnElNombre(){
    this.cambioElTitulo.emit(this.contacto?.nombre)
    console.log(this.contacto?.nombre)
    
  }
}

