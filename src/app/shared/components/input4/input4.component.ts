import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-input-4',
  standalone: true, // Hacemos el componente independiente
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule], // Importamos los módulos necesarios
  templateUrl: './input4.component.html',
  styleUrls: ['./input4.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Input4Component),
    multi: true
  }]
})
export class Input4Component implements ControlValueAccessor, OnInit {
 
    @Input() type: string = 'text'; // Tipo de input
    @Input() id: string = ''; // Id de input
    @Input() label: string = ''; // Tipo de input
    @Input() placeholder: string = 'Campo por defecto'; // Placeholder del input
    @Input() valor: string = '';

    @Input() colorTexto: string = '#333333';
    @Input() colorBackground: string = '#f3f3f3';
    @Input() colorFocusInput: string = '#2a9cf4';

    @Input() isDisabled: boolean = false; // Para deshabilitar el input
    @Input() valuesRadio: string[] = ['Opcion1', 'Opcion2', 'Opcion3'];
    @Input() invalid: boolean | undefined = false; // Para color de label
    @Input() touched: boolean | undefined = false; // Para color de label
    



    inputValue: any = '';
    lightenBackgroundColor: string = '#fff';
    fileName: string | null = null;
    gradientColor: string = '';
    gradientHoverColor: string = '';
    colorFocusInputShadow: string = '';
    colorBorde: string = '';
    colorFocusInputDark: string = '';
    colorPlaceholder: string = '';
    colorHoverPlaceholder: string = '';
    gradientColorButton: string = '';
    hoverGradientColorButton: string = '';
    colorTextoButton: string = '';

    
    value: any;

    onChange = (_: any) => {};
    onTouched = () => {};

    constructor() {}

    ngOnInit(): void {
      
      // Generar un ID único si no se ha proporcionado
      if (!this.id) {
        this.id = this.generateUniqueId();
      }

      this.gradientColor = this.generateGradient(this.colorBackground);
      this.gradientHoverColor = this.generateHoverGradient(this.colorBackground);
      this.colorFocusInputShadow = this.crearColorShadow(this.colorFocusInput);
      this.colorBorde = this.darkenHexColor(this.colorBackground, 20);
      this.colorFocusInputDark = this.darkenHexColor(this.colorFocusInput, 20);
      this.colorHoverPlaceholder = this.lightenHexColor(this.colorTexto, 20);
      this.colorPlaceholder = this.lightenHexColor(this.colorHoverPlaceholder, 60);
      this.gradientColorButton = this.generateGradient(this.colorFocusInput);
      this.hoverGradientColorButton = this.generateHoverGradient(this.colorFocusInput);
      this.colorTextoButton = this.getColorTextForButton(this.colorFocusInput);

    }

    // Método para generar un degradado sutil en base a un color hexadecimal
    generateGradient(hex: string): string {
      const lightenColor = this.lightenHexColor(hex, 20); // Oscurece ligeramente el color en un 20%
      return `linear-gradient(145deg, ${hex}, ${lightenColor})`;
    }

    generateHoverGradient(hex: string): string {
      const lightenColor = this.lightenHexColor(hex, 20); // Oscurece ligeramente el color en un 20%
      return `linear-gradient(145deg, ${lightenColor}, ${hex})`;
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

    // Método para oscurecer un color hexadecimal
    darkenHexColor(hex: string, amount: number): string {
      let color = hex.replace('#', '');
      if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
      }

      const num = parseInt(color, 16);
      const r = Math.max(0, (num >> 16) - amount);
      const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
      const b = Math.max(0, (num & 0x0000ff) - amount);

      return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    }


    getColorTextForButton(hex: string): string {
      // Eliminar el símbolo '#' si está presente
      hex = hex.replace('#', '');
      
      // Convertir el valor hexadecimal a números RGB
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      // Calcular la luminancia usando la fórmula de percepción humana
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Decidir el color del ícono basado en la luminancia del fondo
      // Usaremos 128 como punto medio (escala de 0 a 255) para decidir claro u oscuro
      return luminance > 128 ? '#000000' : '#FFFFFF';
  }


    crearColorShadow(hex: string):string {

      return  hex + '80';

    }



    // Método para generar un ID único basado en el label y un número aleatorio
    private generateUniqueId(): string {
      const randomId = Math.random().toString(36).substring(2, 9);
      return `${this.label.replace(/\s+/g, '_').toLowerCase()}_${randomId}`;
    }
  

    writeValue(value: any): void {
      if (value !== undefined) {
          this.inputValue = value;
      }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onInputChange(event: Event, value: string): void {
     
        this.value = (event.target as HTMLInputElement).value;

        const id = (event.target as HTMLInputElement).id;
        if(id == this.id) {
            const colorPicker = document.getElementById(this.id);
            colorPicker!.style.backgroundColor = this.value;
        }

        this.inputValue = this.value;
        this.onChange(this.value);
        this.onTouched();
      

    }


    onRadioChange(event: Event, value: string) {
      this.inputValue = value;
      this.onChange(this.inputValue); // Notificamos el cambio de valor al formulario reactivo
      this.onTouched(); // Marcamos el campo como tocado
  }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input && input.files && input.files.length > 0) {
          this.fileName = input.files[0].name;
        } else {
          this.fileName = null;
        }
        this.onTouched();
        this.onChange(input.files); // O lo que necesites pasar según tu lógica

      }



}