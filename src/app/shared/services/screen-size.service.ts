// screen-size.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private isMobileSize = new BehaviorSubject<boolean>(false); // Observable para el tamaño de la pantalla

  constructor() {
    this.checkScreenSize(); // Comprobar el tamaño inicial de la pantalla

    // Añadir un listener para detectar cambios en el tamaño de la pantalla
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private checkScreenSize(): void {
    const isMobile = window.innerWidth < 768; // Define tamaño móvil (puedes ajustar el tamaño según tus necesidades)
    this.isMobileSize.next(isMobile);
  }

  public get isMobile$() {
    return this.isMobileSize.asObservable(); // Devolver observable para que el componente se suscriba
  }
}
