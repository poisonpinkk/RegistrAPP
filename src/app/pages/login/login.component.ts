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
        if (usuario === 'docente') {
          this.router.navigate(['/docente']);
        } else {
          this.router.navigate(['/alumno']);
        }
      } else {
        this.loginFailed = true;
      }
    });
  }
}