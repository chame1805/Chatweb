import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDatabaseService1 } from '../../Services/connect-database.service';
import { ConnectDatabaseService } from '../../Services/connect-list-chats.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  constructor(private router: Router, private _serv: ConnectDatabaseService, private _servicioChat: ConnectDatabaseService, private  _user: ConnectDatabaseService1){
  }

  idUsuario: number = sessionStorage.getItem('id_user') as string | null ? parseInt(sessionStorage.getItem('id_user')!) : 0;

  persona1: any ;
  persona2: any ;
  datos: any[] = []
  chats:any[] = []
  id_user = Number(sessionStorage.getItem("id_user"))
  ngOnInit(): void {
    this._servicioChat.getChats(this.id_user).subscribe(
      (response) => {
        //console.log("primera peticion",response)
        this.datos = response
        this.datos.forEach(element=>{
            this._servicioChat.getChatsById(element.Chat_idChat).subscribe(
              (respons) => {
                //console.log("segunda peticion",respons)
                let dta = {
                  idChat: respons.idChat,
                  mensaje: respons.ultimo_msj,
                  users: "",
                  idUser: 0
                }
                this._servicioChat.getUsersChat(element.Chat_idChat).subscribe(
                  (resp) => {
                    //console.log("tercera peticion",resp);
                    resp.forEach(element=>{
                      this._user.getById(element.Usuario_idUsuario).subscribe(
                        (response) => {
                          //console.log("cuarta peticion",response)
                          if(response.idUsuario != Number(sessionStorage.getItem('id_user')) ){
                            dta.users += response.nombre
                            dta.idUser = response.idUsuario
                          } 
                        }
                      )
                    })
                  })
                  //console.log("--------------------------------------------", dta)
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
  irAlChat( id: number){
    this._serv.getChats(this.idUsuario).subscribe(
      (response) => {
        this.persona1 = response
      }
    )
    this._serv.getChats(id).subscribe(
      (response) => {
        this.persona2 = response
      }
    )
    if(this.persona1 && this.persona2){
    for (let i = 0; i < this.persona1.length; i ++) {
      for (let j = 0; j < this.persona2.length; j++) {
        if(this.persona1[i].Chat_idChat == this.persona2[j].Chat_idChat ){
          console.log("coindiden aqui: [" + i + "][" +j + "]")
          sessionStorage.setItem("id_chat", this.persona1[i].Chat_idChat )
          this.router.navigate(['home/chat'])
        }
      }      
    }
  } 
  }
  
}
