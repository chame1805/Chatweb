import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { LoginData } from '../Interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginData = {
    nombre: '',
    password: '',
    correo: '',
    id: ''
  };
  errorMessage: string = '';

  constructor(public loginService: LoginService) {}

  envioDatos() {
    const user = this.loginService.getData().find(
      u => u.correo === this.loginData.correo && u.password === this.loginData.password
    );

    if (user) {
      console.log('Inicio de sesión exitoso:', user);
      this.errorMessage = '';
      this.resetForm();
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos.';
      console.log(this.errorMessage);
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
