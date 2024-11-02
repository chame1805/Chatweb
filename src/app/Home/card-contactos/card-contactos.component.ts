import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioHasChat } from '../../Interfaces/UsuarioHasChat';
import { Usuario } from '../../Interfaces/contacto';
import { ConnectListChatsVaciosService } from '../../Services/connect-list-chats-vacios.service';
import { ConnectDatabaseService } from '../../Services/connect-list-chats.service';

@Component({
  selector: 'app-card-contactos',
  templateUrl: './card-contactos.component.html',
  styleUrl: './card-contactos.component.css'
})
export class CardContactosComponent {
  constructor( private _servicio: ConnectListChatsVaciosService, private _serv: ConnectDatabaseService,private router: Router){}

  idUsuario: number = sessionStorage.getItem('id_user') as string | null ? parseInt(sessionStorage.getItem('id_user')!) : 0;

  uschat: UsuarioHasChat={
    Chat_idChat : 0 ,
    Usuario_idUsuario : this.idUsuario
  }
  chat= {
    ultimo_msj : ''
  }
  @Output() cambioElTitulo = new EventEmitter<string>()
  flagD: boolean = false;
  @Input() cont = {
    id_usuario: 0,
    Usuario_idUsuario: 0
  }
  @Input() contacto: Usuario = {
    idUsuario: 0,
    nombre : '',
    email : '',
    password: ""
  }
  editarDatos(){
    this.flagD = !this.flagD
  }
  GuardarDatos(){
    //se guarda lo editado
  }
  eliminar(): void {
    this._servicio.deleteContacto(this.contacto.idUsuario).subscribe(
      (response) => {
        console.log('Contacto eliminado:', response);
      },
      (error) => {
        console.error('Error al eliminar contacto', error);
      }
    );
  }
  irAlChat(){
    alert("al chat")
    this._serv.NewChat(this.chat).subscribe(
      response => {
        console.log('Nuevo chat agregado:', response);
        this.uschat.Chat_idChat = response.idChat
        this._serv.newUsChat(this.uschat).subscribe(
          response=>{
            console.log('Nuevo usuario agregado a chat:', response)
            this.router.navigate(['home/chat'])
          },error =>{
            console.log("error al ir al chat", error)
          }
        )
      },
      error => {
        console.error('Error al agregar nuevo chat:', error);
      }
    );
  }
  cambiosEnElNombre(){
    this.cambioElTitulo.emit(this.contacto?.nombre)
    console.log(this.contacto?.nombre)
    
  }
}

