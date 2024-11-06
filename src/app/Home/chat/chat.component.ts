import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Mensaje } from '../../Interfaces/mensaje';
import { ChatsService } from '../../Services/chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor(public _mensaje: ChatsService) {}

  usuarioActivo: any = {
    email: "",
    nombre: "",
    idUsuario: 0,
    password: ""
  }

  @Input() msj = {
    hora: "",
    fecha: "",
    estatus: false,
    id_usuario: sessionStorage.getItem("id_user"),
    id_chat: sessionStorage.getItem("id_chat") || 0,
    mensaje: ""
  }

  mensajeDelChat: Mensaje[] = [];

  flag = true;
  user: number = Number(sessionStorage.getItem('id_user')) || 0;

  ngOnInit(): void {
    this._mensaje.getMensajesById(Number(sessionStorage.getItem("id_chat"))).subscribe(data => {
      this.mensajeDelChat = data;
      this._mensaje.mensaje = data;
      this.scrollToBottom(); // Desplazar el scroll hacia abajo
    });
    this._mensaje.getPerteneceTO(Number(sessionStorage.getItem("id_chat"))).subscribe(data => {
      this._mensaje.usuarios = data;
      data.forEach(element => {
        if (element.Usuario_idUsuario != this.user) {
          this._mensaje.getChatsById(element.Usuario_idUsuario).subscribe(data => {
            this.usuarioActivo = data;
          });
        }
      });
      console.log("usuarios en el chat", data);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  enviarMensaje() {
    const date = new Date();
    const hora = (date.getHours() + ":" + date.getMinutes());
    this.msj.hora = hora;
    this._mensaje.addMensaje(this.msj).subscribe(data => {
      this.mensajeDelChat.push(data);
      this._mensaje.updateChat(Number(sessionStorage.getItem("id_chat")), { "ultimo_msj": data.mensaje }).subscribe(data => {
      });
      this.scrollToBottom(); 
    },
      error => {
        console.error('Error al agregar mensaje:', error);
      });

    this.msj = {
      hora: "",
      fecha: "",
      estatus: false,
      id_usuario: sessionStorage.getItem("id_user"),
      id_chat: sessionStorage.getItem("id_chat") || 0,
      mensaje: ""
    };
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('id_chat');
  }
}
