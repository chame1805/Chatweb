import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { LoginData } from '../Interfaces/login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData: LoginData = {
    nombre: '',
    password: '',
    correo: '',
    id: ''
  };
  currentId = 1;

  constructor(private loginService: LoginService) {}

  registerUser() {
    this.userData.id = this.currentId.toString();
    this.currentId++;
    this.loginService.addData(this.userData);
    console.log('Usuario registrado:', this.userData);

    // Resetea el formulario
    this.userData = {
      nombre: '',
      password: '',
      correo: '',
      id: ''
    };
  }
}
