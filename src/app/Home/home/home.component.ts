import { Component } from '@angular/core';
import { ContactosService } from '../../Services/contactos.service';
import { ChatsService } from '../../Services/chats.service';
import { Chat } from '../../Interfaces/chat';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public chat: ChatsService, public contacto: ContactosService){
  }
}
