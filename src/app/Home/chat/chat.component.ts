import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Mensaje } from '../../Interfaces/mensaje';
import { ChatsService } from '../../Services/chats.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, DoCheck {

  flag = true;
  constructor(public mensaje: ChatsService){
  }
  mensajeDelChat : Mensaje[] = [
  ]
  user : number = Number(sessionStorage.getItem('id_user')) || 0
  ngOnInit(): void {
    
    this.mensaje.getMensajes().subscribe(data=>{
      data.forEach(element => {
        if(this.user == element.id_usuario){
          this.mensajeDelChat.push(element)
        }
        console.log("del chat",this.mensajeDelChat)
      })
      this.mensaje.mensaje = data
      console.log("datos cargados", this.mensaje.mensaje)
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
      id_chat: 8,
      mensaje: ""
    }
    enviarMensaje(){
      const date  = new Date()
      const hora = (date.getHours()+ ":" + date.getMinutes())
      this.msj.hora = hora
      this.mensaje.addMensaje(this.msj).subscribe(data => {
        console.log("mensaje añadido" ,data)
      },
      error => {
        console.error('Error al agregar mensaje:', error);
      })
      this.msj = {
        hora: "",
        fecha: "",
        estatus: false,
        id_usuario: sessionStorage.getItem("id_user "),
        id_chat: 6,
        mensaje: ""
      }
    }
}
