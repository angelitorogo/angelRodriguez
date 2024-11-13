import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Boton6Component } from '../boton6/boton6.component';


@Component({
  selector: 'lib-modal-1',
  standalone: true, // Hacemos el componente independiente
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, Boton6Component], // Importamos los módulos necesarios
  templateUrl: './modal1.component.html',
  styleUrls: ['./modal1.component.css'],
})
export class Modal1Component {
  
  @Input() text: string = ''; // El texto a mostrar en el modal
  @Input() type: 'info' | 'success' | 'alert' = 'info'; // Tipo de modal
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  constructor(){}

  // Método para cerrar el modal
  closeModal():void {
    this.close.emit();
  }
}


