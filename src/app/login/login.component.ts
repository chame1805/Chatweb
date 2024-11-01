import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacto } from '../Interfaces/contacto';
import { LoginData } from '../Interfaces/login';
import { ConnectDatabaseService } from '../Services/connect-database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: LoginData = {
    nombre: '',
    password: '',
    correo: '',
    id: ''
  };
  
  constructor ( public users: ConnectDatabaseService, private router: Router) {}
  datos: Contacto[] =[]

  ngOnInit(): void {
    this.users.get().subscribe(
      (response) => {
        this.datos = response
        console.log(this.datos);
      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }
  envioDatos() {
    const user = this.datos.find(
      u => u.email === this.loginData.correo && u.password === this.loginData.password
    );

    if (user) {
      console.log('Inicio de sesión exitoso:', user);
      sessionStorage.setItem("id_user", user.idUsuario)
      this.router.navigate(['/home'])
      this.resetForm();
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
