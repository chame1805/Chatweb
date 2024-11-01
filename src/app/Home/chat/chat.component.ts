import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Mensaje } from '../../Interfaces/mensaje';
import { ChatsService } from '../../Services/chats.service';
import { ContactosService } from '../../Services/contactos.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, DoCheck {

  flag = true;
  constructor(public chat: ChatsService, public contacto: ContactosService){
  }
  ngOnInit(): void {
      
  }
  ngDoCheck(): void {
      this.contador++
  }
  contador = 0
  @Input() msj: Mensaje = {
      hora: "",
      fecha: "",
      estatus: false,
      texto: "",
      id_mensaje: 1,
      id_usuario: 233382
    }
    enviarMensaje(){
      const date  = new Date()
      const hora = (date.getHours()+ ":" + date.getMinutes())
      this.msj.hora = hora
      this.chat.addMensaje(this.msj)
      this.msj = {
        hora: "",
        fecha: "",
        estatus: false,
        texto: "",
        id_mensaje: 1,
        id_usuario: 233382
      }
    }
}
