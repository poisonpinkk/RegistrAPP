import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicio/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Importamos 'of' para manejar errores

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  clave: string = '';
  loginFailed: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {}
  login(usuario: string, clave: string): void {
    this.authService.buscarBD(usuario, clave).pipe(
      catchError(error => {
        console.error('Error de autenticación', error);
        this.loginFailed = true;  // Mostramos mensaje de error si hay fallo en la autenticación
        return of(false);  // Retornamos false para mantener el flujo
      })
    ).subscribe(isAuthenticated => {
      if (isAuthenticated) {
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
