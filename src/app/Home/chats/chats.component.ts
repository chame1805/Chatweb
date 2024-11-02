import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../../Interfaces/chat';
import { UsuarioHasChat } from '../../Interfaces/UsuarioHasChat';
import { ConnectListChatsVaciosService } from '../../Services/connect-list-chats-vacios.service';
import { ConnectDatabaseService } from '../../Services/connect-list-chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit, AfterContentInit, OnDestroy {

  idUsuario: number = sessionStorage.getItem('id_user') as string | null ? parseInt(sessionStorage.getItem('id_user')!) : 0;

  uschat: UsuarioHasChat={
    Chat_idChat : 0,
    Usuario_idUsuario : this.idUsuario
  }
  chat: Chat = {
    idChat: 1,
    ultimo_msj : ''
  }

  constructor( public _servicio: ConnectListChatsVaciosService, private _serv: ConnectDatabaseService, private router: Router ){}
  ngOnInit(): void {
    this._servicio.getChats().subscribe(data => {
      data.map(element => {
        if(element.id_usuario == sessionStorage.getItem('id_user')){
          this._servicio.chats.push(element)
        }
      })
  })
    for (let index = 0; index < this._servicio.chats.length; index++) {
      this._servicio.getChatsById(this._servicio.chats[index].Usuario_idUsuario).subscribe(data =>{
        this._servicio.listaContactos.push(data)
      })
    }
    console.log(this._servicio.chats)
    console.log( this._servicio.listaContactos);
  }
  ngAfterContentInit(): void {
  }
  CrearChat(){
    this._serv.NewChat(this.chat).subscribe(
      response => {
        console.log('Nuevo chat agregado:', response);
        this.uschat.Chat_idChat = this.chat.idChat
        this._serv.newUsChat(this.uschat).subscribe(
          response=>{
            console.log('Nuevo usuario agregado a chat:', response)
            this.router.navigate(['/chat'])
          }
        )
      },
      error => {
        console.error('Error al agregar nuevo chat:', error);
      }
    );
  }
  ngOnDestroy(): void {
    this._servicio.chats = []
  }

}

