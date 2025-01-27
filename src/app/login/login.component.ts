import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Interfaces/contacto';
import { LoginData } from '../Interfaces/login';
import { ConnectDatabaseService1 } from '../Services/connect-database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cerrarModal(){this.alert = !this.alert}
  datos: Usuario[] =[]
  loginData: LoginData = {
    nombre: '',
    password: '',
    correo: '',
    id: ''
  };
  alert : boolean =false
  constructor ( public users: ConnectDatabaseService1, private router: Router) {}
  ngOnInit(): void {
    this.users.get().subscribe(
      (response) => {
        this.datos = response
      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }
  envioDatos() {
    this.datos.length == 0 ? this.alert = !this.alert : ""
    for (let index = 0; index < this.datos.length; index++) {
      if( this.datos[index].email == this.loginData.correo && this.datos[index].password == this.loginData.password ){
        sessionStorage.setItem("id_user", this.datos[index].idUsuario)
        this.router.navigate(['/inicio'])
      }
      else{
        console.log('Inicio de sesión fallido');
        this.alert = !this.alert
      }
    }
    
  }


  resetForm() {
    this.loginData = {
      nombre: '',
      password: '',
      correo: '',
      id: ''
    };
  }
}
