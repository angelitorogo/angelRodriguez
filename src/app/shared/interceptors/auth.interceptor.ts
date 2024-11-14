import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../../auth/service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _autService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const sesion = this._autService.getIdentity;
    const token = this._autService.getToken;

    console.log(sesion)
    console.log(token)

    if (sesion) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._autService.signOut();
        }
        return throwError(() => error);
      })
    );
  }
}
