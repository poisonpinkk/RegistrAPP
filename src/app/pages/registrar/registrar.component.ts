import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})


export class RegistrarComponent  implements OnInit {

  usuario = {
    username: '',
    password: '',
    mail: '',
    rol: ''
  };

  apiUrl = 'https://6702d65abd7c8c1ccd3ffe2d.mockapi.io/usuarios';  // URL de la API

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {}

  onSubmit() {
    if (this.usuario.username && this.usuario.password && this.usuario.mail && this.usuario.rol) {
      this.http.post(this.apiUrl, this.usuario).subscribe(response => {
        console.log('Usuario registrado:', response);
        this.router.navigate(['/login']); // Redirige al login tras registrar
      }, error => {
        console.error('Error al registrar el usuario:', error);
      });
    }
  }

}
