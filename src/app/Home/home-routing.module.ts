import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatsComponent } from './chats/chats.component';
import { ContactosComponent } from './contactos/contactos.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
const routes: Routes = [
  { path: 'home/chat', 
    component: ChatComponent },
  {
    path: 'contacto',
    component: ContactosComponent
  },
  {
    path: 'nuevo-chat',
    component: ChatsComponent
  },
  {
    path: "home",
    component : HomeComponent
  },{
    path:"login",
    component:LoginComponent
  },{
    path:"register",
    component:RegisterComponent
  },
  {
    path: '',
    redirectTo : '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
