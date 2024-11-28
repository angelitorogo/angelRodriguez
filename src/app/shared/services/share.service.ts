import { Injectable, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ShareService  implements OnInit {

    urlX: string;
    urlFacebook: string;

    surveyId: string = '';

    constructor( private meta: Meta, private title: Title, private route: ActivatedRoute){
        

        const baseUrlX = 'http://localhost:4200/#/response/survey/38f7b017-a528-4478-bcff-eba68dacadf1';
        const urlCodificadaX = encodeURIComponent(baseUrlX);
        const mensajeX = encodeURIComponent('¡Responde a esta encuesta rápidamente!');
        const hashtagsX = encodeURIComponent('encuesta,datos');
        const viaX = 'angelitorogo';

        this.urlX = `https://twitter.com/intent/tweet?url=${urlCodificadaX}&text=${mensajeX}&hashtags=${hashtagsX}&via=${viaX}`;

        const baseUrl = 'http://localhost:4200/response/survey/38f7b017-a528-4478-bcff-eba68dacadf1';

        // Codifica la URL
        const urlCodificada = encodeURIComponent(baseUrl);

        // Construye el enlace para compartir en Facebook
        this.urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${urlCodificada}`;


    }


    ngOnInit(): void {
        // Obtén el ID de la encuesta desde la URL
        this.surveyId = this.route.snapshot.paramMap.get('id') || '';
    
        // Configura dinámicamente los metadatos
        this.setOpenGraphTags();
    }


    setOpenGraphTags(): void {
    const surveyUrl = `https://example.com/response/survey/${this.surveyId}`;
    const surveyTitle = `Encuesta ${this.surveyId}`;
    const surveyDescription = `Responde a la encuesta ${this.surveyId} y ayuda a mejorar.`;
    const surveyImage = `https://example.com/assets/surveys/${this.surveyId}.png`;

    this.title.setTitle(surveyTitle);

    this.meta.addTags([
        { property: 'og:title', content: surveyTitle },
        { property: 'og:description', content: surveyDescription },
        { property: 'og:image', content: surveyImage },
        { property: 'og:url', content: surveyUrl },
        { property: 'og:type', content: 'website' }
    ]);
    }



}