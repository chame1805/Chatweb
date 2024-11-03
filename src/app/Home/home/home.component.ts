import { Component, OnInit } from '@angular/core';
import { ConnectDatabaseService1 } from '../../Services/connect-database.service';
import { ConnectDatabaseService } from '../../Services/connect-list-chats.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  constructor( private _servicioChat: ConnectDatabaseService, private  _user: ConnectDatabaseService1){
  }

  datos: any[] = []
  chats:any[] = []
  id_user = Number(sessionStorage.getItem("id_user"))
  ngOnInit(): void {
    this._servicioChat.getChats(this.id_user).subscribe(
      (response) => {
        this.datos = response
        this.datos.forEach(element=>{
            this._servicioChat.getChatsById(element.Chat_idChat).subscribe(
              (respons) => {
                let dta = {
                  idChat: respons.idChat,
                  mensaje: respons.ultimo_msj,
                  users: ""
                }
                this._servicioChat.getUsersChat(element.Chat_idChat).subscribe(
                  (resp) => {
                    resp.forEach(element=>{
                      this._user.getById(element.Usuario_idUsuario).subscribe(
                        (response) => {
                          if(response.idUsuario != Number(sessionStorage.getItem('id_user')) ){
                            dta.users += response.nombre + " "
                            
                          } 
                        }
                      )
                    })

                  })
                  console.log(dta)
                this.chats.push(dta)

              },(error) => { console.error( 'Error al obtener datos', error ) }
            )
        })
      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }
  
}
