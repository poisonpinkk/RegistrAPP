import { Component, OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import QRious from 'qrious';
// Si el problema persiste con la importación, usa la siguiente línea:
 // Agregado para evitar problemas de importación

@Component({
  selector: 'app-generador',
  templateUrl: './generador.component.html',
  styleUrls: ['./generador.component.scss'],
})
export class GeneradorComponent implements OnInit,AfterViewInit {

  asignaturaId!: string;  // Inicialización con "!"
  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>; // Referencia al canvas
  constructor(private route: ActivatedRoute) { }

  qrData: string = "";
  ngOnInit() {
    // Acceder a los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.asignaturaId = params['asignaturaId'];  // Obtener el valor de asignaturaId
    });
    this.route.queryParams.subscribe(params => {
      this.qrData =params['data'];
      console.log('Datos recibidos qr: ', this.qrData);
    }
    )
  }
  ngAfterViewInit() {
    if (this.qrData){
      this.createQR();
    }
  }
  createQR() {
    const qr = new QRious({
      element: this.qrCanvas.nativeElement,
      value: this.qrData,
      size: 256, // Tamaño del QR
      level: 'M' // Nivel de corrección de errores
    });
  }
}
