import { CommonModule } from '@angular/common';
import { NgModule,  } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { ChatsComponent } from './chats/chats.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CardContactosComponent } from './card-contactos/card-contactos.component';
import { ContactosComponent } from './contactos/contactos.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChatsComponent,
    NotFoundComponent,
    CardContactosComponent,
    ContactosComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
