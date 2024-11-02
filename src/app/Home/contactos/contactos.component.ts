import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Contacto } from '../../Interfaces/Contactos';
import { ConnectListChatsVaciosService } from '../../Services/connect-list-chats-vacios.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit, OnDestroy {

  contacto: Contacto = {
    id_usuario: Number(sessionStorage.getItem('id_user')) || 0,
    idLista_Contacto: 10,
    Usuario_idUsuario: 0
  }

  @Input() cont = {
    id_usuario: Number(sessionStorage.getItem('id_user')) || 0,
    Usuario_idUsuario: 0
  }

  modal: boolean = false;

  flagForModal() {
    this.modal = !this.modal;
  }
  
  constructor(public _servicio: ConnectListChatsVaciosService, private cdr: ChangeDetectorRef) {}
  
  agregarContacto() {
    console.log("datos", this.cont)
    this.modal = !this.modal;
    this._servicio.NewChat(this.cont).subscribe(
      response => {
        console.log('Nuevo chat agregado:', response);
      },
      error => {
        console.error('Error al agregar nuevo chat:', error);
      }
    );
  }
  
  ngOnInit(): void {
    this._servicio.getChats().subscribe(data => {
      data.forEach(element => {
        if (element.id_usuario == sessionStorage.getItem('id_user')) {
          this._servicio.chats.push(element);
          this._servicio.getChatsById(element.Usuario_idUsuario).subscribe(data => {
            this._servicio.listaContactos.push(data);
            this.cdr.detectChanges(); // Asegura la actualización de la vista
          });
        } else {
          console.log("no coincide")
        }
      });
      console.log(this._servicio.chats);
      console.log(this._servicio.listaContactos);
    });
  }

  ngOnDestroy(): void {
    this._servicio.chats = [];
  }
}
