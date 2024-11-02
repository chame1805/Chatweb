import { Component } from '@angular/core';
import { Usuario } from '../Interfaces/contacto';
import { ConnectDatabaseService } from '../Services/connect-database.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData: Usuario = {
    "nombre": '',
    "email": '',
    "password": '',
    "idUsuario": 1
  };
  constructor(private userP: ConnectDatabaseService) {}

  registerUser() {
    this.userP.enviarDatos(this.userData).subscribe(
      (response) => {
        console.log('Datos enviados', response);
      },
      (error) => {
        console.error('Error al enviar datos', error);
      }
    )

    // Resetea el formulario
    this.userData = {
      "nombre": "",
	    "email": "",
	    "password": "",
	    "idUsuario": undefined
    };
  }
}
