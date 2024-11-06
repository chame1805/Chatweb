import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class CardContactosComponent implements OnInit, OnDestroy{
  constructor( private _servicio: ConnectListChatsVaciosService, private _serv: ConnectDatabaseService,private router: Router){}

  idUsuario: number = sessionStorage.getItem('id_user') as string | null ? parseInt(sessionStorage.getItem('id_user')!) : 0;

  ngOnInit(): void {
  }
  uschat: UsuarioHasChat={
    Chat_idChat : 0 ,
    Usuario_idUsuario : this.idUsuario
  }
  chat= {
    ultimo_msj : ''
  }
  flagD: boolean = false;
  @Input() cont = {
    id_usuario: 0,
    Usuario_idUsuario: 0
  }
  @Input() idList : number = 0
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
  }
  eliminar(): void {
    this._servicio.deleteContacto(this.idList).subscribe(
      (response) => {
        console.log('Contacto eliminado:', response);
      },
      (error) => {
        console.error('Error al eliminar contacto', error);
      }
    );
  }
  persona1: any ;
  persona2: any ;
  existe=false
  irAlChat(){
    this._serv.getChats(this.idUsuario).subscribe(
      (response) => {
        this.persona1 = response
      }
    )
    this._serv.getChats(this.contacto.idUsuario).subscribe(
      (response) => {
        this.persona2 = response
      }
    )
    if(this.persona1 && this.persona2){
    for (let i = 0; i < this.persona1.length; i ++) {
      for (let j = 0; j < this.persona2.length; j++) {
        if(this.persona1[i].Chat_idChat == this.persona2[j].Chat_idChat ){
          console.log("coindiden aqui: [" + i + "][" +j + "]")
          sessionStorage.setItem("id_chat", this.persona1[i].Chat_idChat )
          this.existe = true
          this.router.navigate(['home/chat'])
        }
      }      
    }
  }
    if(!this.existe){
      this.noexiste()
    }
    
  }
  cambiosEnElNombre(){
    
  }
  noexiste(){
    this._serv.NewChat(this.chat).subscribe(
      response => {
        console.log('Nuevo chat agregado:', response);
        sessionStorage.setItem("id_chat", response.idChat)
        this.uschat.Chat_idChat = response.idChat
        sessionStorage.setItem("id_chat",response.idChat )
        this._serv.newUsChat(this.uschat).subscribe(
          response=>{
            console.log('Nuevo usuario agregado a chat:', response)
          },error =>{
            console.log("error al ir al chat", error)
          }
        )
        let uschat: UsuarioHasChat={
          Chat_idChat : Number(sessionStorage.getItem("id_chat")) || 0,
          Usuario_idUsuario : this.contacto.idUsuario
        }
        this._serv.newUsChat(uschat).subscribe(
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
  ngOnDestroy(): void {
      
  }

}

