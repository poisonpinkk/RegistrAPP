import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';  // Importamos AlertController


@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.scss'],
})
export class RecuperarPassComponent  implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

    // Método para mostrar la alerta
    async enviarEnlace() {
      const alert = await this.alertController.create({
        header: 'Enlace enviado',
        message: 'Se ha enviado un enlace de recuperación a tu correo electrónico.',
        buttons: ['OK']
      });
  
      await alert.present();
    }

}
