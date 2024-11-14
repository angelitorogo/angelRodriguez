import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  
  constructor(private _router: Router, public _authService: AuthService){}

  logout() {
    this._authService.signOut();
  }
}


