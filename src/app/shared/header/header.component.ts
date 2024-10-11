import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicio/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usuario: string = '';  // Definimos la propiedad usuario
  private subscriptionAuthService: Subscription | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Suscribimos al usuario actual desde AuthService
    this.subscriptionAuthService = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.usuario = user.username;  // Asigna el username del usuario
      } else {
        this.usuario = '';  // Si no hay usuario, vacía la variable
      }
    });
  }

  ngOnDestroy() {
    if (this.subscriptionAuthService) {
      this.subscriptionAuthService.unsubscribe();
    }
  }
}