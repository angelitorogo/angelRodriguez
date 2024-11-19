import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { responseEncuesta } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  apiUrl = environment.API_URL;

  constructor(private _http: HttpClient, private _router: Router ) { }


  sendResponseSurvey(responseSurvey: responseEncuesta):Observable<any> {
    return this._http.post(`${this.apiUrl}/encuestas/response-survey`, responseSurvey);
  }



}
