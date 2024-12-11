import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Boton6Component } from '../boton6/boton6.component';
import QRCode from 'qrcode';

@Component({
  selector: 'lib-modal-1',
  standalone: true, // Hacemos el componente independiente
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, Boton6Component], // Importamos los módulos necesarios
  templateUrl: './modal1.component.html',
  styleUrls: ['./modal1.component.css'],
})
export class Modal1Component implements OnInit {
  
  @Input() text: string = ''; // El texto a mostrar en el modal
  @Input() type: 'info' | 'success' | 'alert' = 'info'; // Tipo de modal
  @Input() surveyId?: string;
  @Input() name: string = '';
  @Output() close = new EventEmitter<[string, string]>(); // Evento para cerrar el modal

  qrData: string = ''; // El contenido del QR
  qrCodeImage: string | null = null;  


  @Input() share: boolean = false;;

  constructor(){
    
  }
  ngOnInit(): void {
    this.qrData = this.text;
    this.generateQRCode();
  }

  async generateQRCode() {
    try {
      this.qrCodeImage = await QRCode.toDataURL(this.qrData); // Genera el QR como imagen base64
    } catch (err) {
      console.error('Error generando el QR:', err);
    }
  }

  downloadQRCode() {
    if (this.qrCodeImage) {
      const link = document.createElement('a');
      link.href = this.qrCodeImage;
      link.download = 'codigo-qr.png';
      link.click();
    }
  }


  // Método para cerrar el modal
  closeModal(redSocial: string):void {
    //this.metaService.updateMetaTags(surveyTitle, surveyDescription, surveyImage, surveyUrl);
    this.close.emit([redSocial, this.surveyId!]);
  }

 


}


