import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Encuesta, EncuestaItem } from "../interfaces/encuesta";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class EncuestasService{

    apiUrl = environment.API_URL;

    encuesta: Encuesta = {
        created_at: new Date(),
        id: '',
        nombre: '',
        encuestaItem: [] // Array vacío para iniciar sin elementos
    };

    constructor( private _http: HttpClient, private _router: Router ){}


    addQuestion(question: string, type:  "TEXT" | "SELECT" | "CHECK" | "LEVEL", options?: string[]) {

        const newQuestion: EncuestaItem = {
            question,
            type,
            options: options ?? [] // Si no hay opciones, inicializamos como un array vacío
        };
    
        this.encuesta.encuestaItem.push(newQuestion);

    }


    addSurvey( title: string):Observable<any>  {
        
        this.encuesta.nombre = title;

        delete this.encuesta.id;
        delete this.encuesta.created_at;

        return this._http.post(`${this.apiUrl}/encuestas/create-survey`, this.encuesta );

    }



}