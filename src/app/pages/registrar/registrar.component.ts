import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaz para los usuarios
interface Usuario {
  id: string;
  username: string;
  password: string;
  mail: string;
  rol: string;
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {

  usuario: Usuario = {  
    id: '',
    username: '',
    password: '',
    mail: '',
    rol: ''
  };

  apiUrl = 'https://6702d65abd7c8c1ccd3ffe2d.mockapi.io/usuarios';  
  mensajeError: string = '';  

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {}

  // Verifica si el usuario o correo ya existen en la API usando Observable
  verificarUsuarioOMailExistente(): Observable<boolean> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?username=${this.usuario.username}&mail=${this.usuario.mail}`)
      .pipe(
        map((usuarios: Usuario[]) => usuarios.length > 0)  // Mapea la respuesta al valor booleano
      );
  }

  onSubmit() {
    if (this.usuario.username && this.usuario.password && this.usuario.mail && this.usuario.rol) {
      this.verificarUsuarioOMailExistente().subscribe(usuarioExistente => {
        if (usuarioExistente) {
          this.mensajeError = 'El nombre de usuario o correo ya están registrados. Intente con otros.';
        } else {
          this.http.post(this.apiUrl, this.usuario).subscribe(response => {
            console.log('Usuario registrado:', response);
            this.router.navigate(['/login']);  // Redirige al login
          }, error => {
            console.error('Error al registrar el usuario:', error);
            this.mensajeError = 'Ocurrió un error al registrar el usuario.';
          });
        }
      });
    } else {
      this.mensajeError = 'Por favor, complete todos los campos.';
    }
  }
}