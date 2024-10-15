import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';  // Importamos AlertController

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

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }

  ngOnInit() {}

  verificarUsuarioOMailExistente(): Observable<boolean> {
    return this.http.get<Usuario[]>(this.apiUrl)  // Obtiene todos los usuarios
      .pipe(
        map((usuarios: Usuario[]) => {
          // Verifica si el username o correo ya existen
          const usuarioExistente = usuarios.some(
            u => u.username === this.usuario.username || u.mail === this.usuario.mail
          );
          return usuarioExistente;
        })
      );
  }
  async mostrarAlertaExito() {
    const alert = await this.alertController.create({
      header: '¡Registro exitoso!',
      message: 'Te has registrado con éxito.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']); // Redirige al login al hacer clic en OK
          }
        }
      ]
    });
  
    await alert.present();
  }

  // Método para mostrar un alert en caso de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Registro fallido',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();  // Muestra el alert
  }


  onSubmit() {
    if (this.usuario.username && this.usuario.password && this.usuario.mail && this.usuario.rol) {
      this.verificarUsuarioOMailExistente().subscribe(usuarioExistente => {
        if (usuarioExistente) {
          this.mostrarAlerta('El username o mail ya están registrados, intente nuevamente.');
        } else {
          this.http.post(this.apiUrl, this.usuario).subscribe(response => {
            console.log('Usuario registrado:', response);
            this.mostrarAlertaExito(); // Llamar al alert de éxito
          }, error => {
            console.error('Error al registrar el usuario:', error);
            this.mostrarAlerta('Ocurrió un error al registrar el usuario.');
          });
        }
      });
    } else {
      this.mostrarAlerta('Por favor, complete todos los campos.');
    }
  }
}
