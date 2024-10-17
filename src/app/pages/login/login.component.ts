import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicio/auth.service'; //importamos para verificar si un usuario y su contraseña son validos
import { catchError } from 'rxjs/operators'; //manejo de errores
import { of } from 'rxjs'; // Importamos 'of' para manejar errores

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  clave: string = '';
  loginFailed: boolean = false; //para mostrar un mensaje de error en la vista 

  private authService = inject(AuthService); //inyecta el servicio de autenticacion para validar las credenciales
  private router = inject(Router); //navegar entre paginas

  constructor() {}

  ngOnInit(): void {}

  //metodo login 
  login(usuario: string, clave: string): void {
    this.authService.buscarBD(usuario, clave).pipe(  //Llama al método buscarBD en el AuthService para validar las credenciales
      catchError(error => {
        console.error('Error de autenticación', error);  //imprime error 
        this.loginFailed = true;  // Mostramos mensaje de error si hay fallo en la autenticación
        return of(false);  // Retornamos false para mantener el flujo
      })
    ).subscribe(isAuthenticated => {
      if (isAuthenticated) {  //cuando las credenciales son correctas se ejecuta el bloque del codigo
        const user = this.authService.getCurrentUser();  // Obtenemos el usuario actual
        this.usuario = '';
        this.clave = '';
        this.loginFailed = false;  // Reseteamos el error si el login es exitoso
        if (user.rol === 'docente') {
          this.router.navigate(['/docente']);  // Redirige al componente de docente
        } else if (user.rol === 'alumno') {
          this.router.navigate(['/alumno']);  // Redirige al componente de alumno
        } else {
          this.router.navigate(['/login']);  // Si no tiene rol válido, regresa al login
        }
      } else {
        this.loginFailed = true;  // Si no está autenticado, mostramos error
      }
    });
  }
}
