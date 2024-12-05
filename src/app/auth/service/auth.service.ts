import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { HomeService } from "../../shared/services/home-service.service";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiUrl = environment.API_URL;
    public identity: any;
    public token: any;

    constructor( private _http: HttpClient, private _router: Router, private _homeService: HomeService ){}


    signUp(email: string, fullname: string, password: string):Observable<any> {
        return this._http.post(`${this.apiUrl}/auth/register`, { email, fullname, password });
    }

    logIn(email: string, password: string):Observable<any> {
        return this._http.post(`${this.apiUrl}/auth/login`, { email, password });
    }

    signOut() {
        
        //restaurar el menu a lo que teniamos, con todo mostrandose
        
        //console.log(this._homeService.elementosMenu)
        localStorage.clear();
        this._router.navigate(['/home']);
        //location.reload();
        
    }

    async saveSession(data: string) {

        localStorage.setItem('session', data)

    }

    get imageProfile() :string|null {
        return this.getIdentity.image;
    }

    get getIdentity(): any {

        let data = JSON.parse(localStorage.getItem('session')!);
        

        if (data != undefined) {
            this.identity = data.user;
        } else {
            this.identity = null;
        }

        return this.identity;

    }


    get getToken(): any {
  
        let sesion = JSON.parse(localStorage.getItem('session')!);
        

        if (sesion != undefined) {
            this.token = sesion.token;

        } else {
            this.token = null;
        }

        return this.token;
    }



}