import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { ResponseEstadisticas } from "../interfaces/estadisticas";


@Injectable({
    providedIn: 'root'
})
export class EstadisticasService {

    apiUrl = environment.API_URL;

    constructor( private _http: HttpClient, private _router: Router ){}


    loadEstadisticasById(encuestaId: string): Observable<ResponseEstadisticas[]> {
        return this._http.post<ResponseEstadisticas[]>(`${this.apiUrl}/estadisticas/general`, {encuestaId} );
    }
    


}