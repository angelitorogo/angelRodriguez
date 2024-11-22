import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    apiUrl = environment.API_URL;

    constructor( private _http: HttpClient, private _router: Router ){}


    
    loadSurveisUser() {
        return this._http.get(`${this.apiUrl}/encuestas/find-all` );
    }

    loadSurveyById(id: string) {
        return this._http.get(`${this.apiUrl}/encuestas/find-one/${id}`);
    }

    deleteSurvey(id: string) {
        return this._http.delete(`${this.apiUrl}/encuestas/delete-one/${id}`);
    }

    loadSurveisRespondedById(id: string) {

        return this._http.get(`${this.apiUrl}/encuestas/find-all-responded/${id}`);
    }
    


}