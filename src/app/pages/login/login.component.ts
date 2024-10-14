import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicio/auth.service';

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
    this.authService.buscarBD(usuario, clave).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        const user = this.authService.getCurrentUser();  // Obtenemos el usuario actual
        this.usuario='';
        this.clave='';
        if (user.rol === 'docente') {
          this.router.navigate(['/docente']);  // Redirige al componente de docente
        } else if (user.rol === 'alumno') {
          this.router.navigate(['/alumno']);  // Redirige al componente de alumno
        } else {
          this.router.navigate(['/login']);  // Si no tiene rol válido, regresa al login
        }
      } else {
        this.loginFailed = true;
      }
    });
  }
}
