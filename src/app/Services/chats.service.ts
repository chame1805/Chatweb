import { Injectable } from '@angular/core';
import { Chat } from '../Interfaces/chat';
import { Mensaje } from '../Interfaces/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor() { }

  mensajes: Mensaje[] = [
    {fecha: "10-10-2024", hora: "10:22", estatus: false, texto: "Hola como estas", id_mensaje: 1, id_usuario: 233382}
  ]
  chats : Chat[] = [
    {id_chat: 1, ultimo: "Hola como estas?", recientes: [], id_mensajes: 1, id_contacto: 233382},
    {id_chat: 2, ultimo: "Que dia?", recientes: [], id_mensajes: 1, id_contacto: 233382},
    {id_chat: 3, ultimo: "", recientes: [], id_mensajes: 1, id_contacto: 233382},


  ]

  addMensaje(mensaje: Mensaje){
    this.mensajes.push(mensaje)
  }

}
