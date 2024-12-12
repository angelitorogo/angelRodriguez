// screen-size.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  apiUrl = environment.API_URL;

  constructor(private _http: HttpClient ) {

  }


  updateUser(id: string, email: string, fullname: string, telephone: string):Observable<User> {

    return this._http.patch(`${this.apiUrl}/auth/update`, {id, email, fullname, telephone}).pipe(
        map((response) => {
            return response as User;
        })
    );
    
  }

  updatePassword(id: string, password: string):Observable<User> {

    return this._http.patch(`${this.apiUrl}/auth/update-password`, {id, password}).pipe(
        map((response) => {
            return response as User;
        })
    );
    
  }

}
