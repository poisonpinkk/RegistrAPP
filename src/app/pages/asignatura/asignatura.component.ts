import { Component, inject, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicio/auth.service';
@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.scss'],
})
export class AsignaturaComponent  implements OnInit {

  usuario: string = ''; // Campo para almacenar el nombre del usuario
  private authService = inject(AuthService);

  subscriptionAuthService: Subscription = new Subscription;

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() { // Desuscribirse del observable del nombre del usuario
    if (this.subscriptionAuthService) {
      this.subscriptionAuthService.unsubscribe();
    }
  }

}
