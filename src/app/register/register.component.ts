import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectDatabaseService1 } from '../Services/connect-database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = {
    "nombre": '',
    "email": '',
    "password": ''
  };
  constructor(private userP: ConnectDatabaseService1, private router: Router) {}

  alert : boolean = false
  registerUser() {
    this.userP.enviarDatos(this.userData).subscribe(
      (response) => {
        console.log('Datos enviados', response);
        this.router.navigate(['login'])
      },
      (error) => {
        console.error('Error al enviar datos', error);
        this.alert = !this.alert
      }
    )
    // Resetea el formulario
    this.userData = {
      "nombre": "",
	    "email": "",
	    "password": ""
    };
  }
  cerrarModal(){
    this.alert = !this.alert
  }
}
