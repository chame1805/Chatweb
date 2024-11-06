import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Contacto } from '../../Interfaces/Contactos';
import { ConnectListChatsVaciosService } from '../../Services/connect-list-chats-vacios.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit, OnDestroy {
  constructor(public _servicio: ConnectListChatsVaciosService, private cdr: ChangeDetectorRef) {}


  alertaNo= false
  user: number = Number(sessionStorage.getItem('id_user')) || 0
  getDatos(){
    this.user = this._servicio.getLocalStorage()
  }

  contacto: Contacto = {
    id_usuario: this.user,
    idLista_Contacto: 10,
    Usuario_idUsuario: 0
  }

  @Input() cont = {
    id_usuario: this.user ,
    Usuario_idUsuario: 0
  }

  modal: boolean = false;

  flagForModal() {
    this.modal = !this.modal;
  }
  
  
  agregarContacto() {
    console.log("datos", this.cont)
    this.modal = !this.modal;
    this._servicio.NewChat(this.cont).subscribe(
      response => {
        console.log('Nuevo chat agregado:', response);
      },
      error => {
        this.alertaNo = !this.alertaNo
        console.error('Error al agregar nuevo chat:', error);
      }
    );
  }
  cerrarAlerta(){
    this.alertaNo = !this.alertaNo
  }
  ngOnInit(): void {
    this.getDatos()
    this._servicio.getChats().subscribe(data => {
      data.forEach(element => {
        if (element.id_usuario == this.user) {
          this._servicio.chats.push(element);
          this._servicio.getChatsById(element.Usuario_idUsuario).subscribe(data => {
            this._servicio.listaContactos.push(data);
            this.cdr.detectChanges(); // Asegura la actualización de la vista
          });
        } else {
          console.log("no coincide")
        }
      });
    });
    
    
  }

  ngOnDestroy(): void {
    this._servicio.chats = [];
    this._servicio.listaContactos = []
  }
}
