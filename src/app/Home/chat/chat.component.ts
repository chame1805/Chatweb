import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Mensaje } from '../../Interfaces/mensaje';
import { ChatsService } from '../../Services/chats.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, DoCheck {

  usuarioActivo : any={
    email:"",
    nombre :"",
    idUsuario:0,
    password : ""
  }
  flag = true;
  constructor(public _mensaje: ChatsService){
  }
  mensajeDelChat : Mensaje[] = [
  ]
  user : number = Number(sessionStorage.getItem('id_user')) || 0
  ngOnInit(): void {
    this._mensaje.getMensajesById(Number(sessionStorage.getItem("id_chat"))).subscribe(data=>{
    this.mensajeDelChat=data
      this._mensaje.mensaje = data
      console.log("datos cargados", this._mensaje.mensaje)
    })
    this._mensaje.getPerteneceTO(Number(sessionStorage.getItem("id_chat"))).subscribe(data=>{
      this._mensaje.usuarios = data
      data.forEach(element => {
        if(element.Usuario_idUsuario != this.user){
          this._mensaje.getChatsById(element.Usuario_idUsuario).subscribe(data=>{
            this.usuarioActivo = data
            console.log(data)
          })
        }
      })
      console.log("usuarios en el chat",data)
    })
  }
  ngDoCheck(): void {
      this.contador++
  }
  contador = 0
  @Input() msj = {
      hora: "",
      fecha: "",
      estatus: false,
      id_usuario: sessionStorage.getItem("id_user"),
      id_chat: sessionStorage.getItem("id_chat") || 0,
      mensaje: ""
    }
    enviarMensaje(){
      const date  = new Date()
      const hora = (date.getHours()+ ":" + date.getMinutes())
      this.msj.hora = hora
      this._mensaje.addMensaje(this.msj).subscribe(data => {
        console.log("mensaje añadido" ,data)
        this._mensaje.updateChat(Number(sessionStorage.getItem("id_chat")), {"ultimo_msj": data.mensaje }).subscribe(data=>{
          console.log("chat actualizado", data)
        })
      },
      error => {
        console.error('Error al agregar mensaje:', error);
      })
      
      this.msj = {
        hora: "",
        fecha: "",
        estatus: false,
        id_usuario: sessionStorage.getItem("id_user "),
        id_chat: sessionStorage.getItem("id_chat") || 0,
        mensaje: ""
      }
    }

}
