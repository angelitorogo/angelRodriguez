import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(private meta: Meta, private title: Title) {}

  /**
   * Establece el título y las metaetiquetas dinámicamente.
   * @param title Título de la página.
   * @param description Descripción de la página.
   * @param image URL de la imagen.
   * @param url URL de la página.
   */
  updateMetaTags(title: string, description: string, image: string, url: string): void {
    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
