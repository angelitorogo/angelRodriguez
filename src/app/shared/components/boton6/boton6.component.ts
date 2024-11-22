import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'lib-boton6',
    standalone: true, // Hacemos el componente independiente
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule], // Importamos los módulos necesarios
    templateUrl: './boton6.component.html',
    styleUrls: ['./boton6.component.css'],
})
export class Boton6Component implements OnInit {

    // Propiedades personalizables
    @Input() colorTexto: string = '#ffffff';
    @Input() colorIzq: string = '#ffffff';
    @Input() colorDcha: string = '#000000';
    @Input() buttonText: string| null = 'Aceptar';
    @Input() isDisabled: boolean = false; 
    @Input() type: string = 'button'; 

    disabledColor1: string = '';
    disabledColor2: string = '';
    colorDerechaLight: string = '';
    colorDerechaLighten: string = '';
    colorGradient: string = '';
    colorHoverGradient: string = '';


    @Input() routerLink: string | any[] | null = null; // Propiedad opcional para routerLink
    @Output() buttonClicked = new EventEmitter<void>(); // Emisor del evento de clic
    constructor(private router: Router) {

    }
    ngOnInit(): void {
       this.colorDerechaLight = this.lightenHexColor(this.colorDcha, 10);
       this.colorDerechaLighten = this.lightenHexColor(this.colorDcha, 20);
       this.disabledColor1 = this.generateDisabledColor(this.colorIzq);
       this.disabledColor2 = this.generateDisabledColor(this.colorDcha);
       this.colorGradient = this.generateGradient(this.colorIzq);
       this.colorHoverGradient = this.generateHoverGradient(this.colorIzq);
    }

    generateGradient(hex: string): string {
        const lightenColor = this.lightenHexColor(hex, 40); // Oscurece ligeramente el color en un 20%
        return `linear-gradient(145deg, ${hex}, ${lightenColor})`;
    }

    generateHoverGradient(hex: string): string {
    const lightenColor = this.lightenHexColor(hex, 40); // Oscurece ligeramente el color en un 20%
    return `linear-gradient(145deg, ${lightenColor}, ${hex})`;
    }

    //Metodo para generar color deshabilitado 
    generateDisabledColor(hex: string): string {
        return this.lightenHexColor(hex, 40);
    }

    // Método para aclarar un color hexadecimal
    lightenHexColor(hex: string, amount: number): string {
        let color = hex.replace('#', '');
        if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
        }
    
        const num = parseInt(color, 16);
        const r = Math.min(255, (num >> 16) + amount);
        const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
        const b = Math.min(255, (num & 0x0000ff) + amount);
    
        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    }


    // Emitir el evento de clic o navegar según se necesite
    onClick() {
        this.buttonClicked.emit(); // Emitir el evento de clic

        // Si se proporciona un routerLink, navegar a la ruta
        if (this.routerLink) {
            this.router.navigate(Array.isArray(this.routerLink) ? this.routerLink : [this.routerLink]);
        }
    }
      

    
}