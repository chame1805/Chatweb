import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../../Services/contactos.service';
import { ChatsService } from '../../Services/chats.service';
import { Chat } from '../../Interfaces/chat';
import { ConnectDatabaseService } from '../../Services/connect-list-chats.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  constructor( private _servicioChat: ConnectDatabaseService){
  }
  datos: Chat[] =[]

  ngOnInit(): void {
    this._servicioChat.getChats().subscribe(
      (response) => {
        this.datos = response
        console.log(this.datos);
      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }
}
