import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HomeService {

  apiUrl = environment.API_URL;

  constructor(private _http: HttpClient) {

  }


  sendMail(email: string, nombre: string, apellido: string, asunto: string, text: string):Observable<any> {
    return this._http.post(`${this.apiUrl}/mail/create-mail`, { email, nombre, apellido, asunto, text });
  }





}