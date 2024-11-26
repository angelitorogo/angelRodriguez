import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  menuOpen = false;
  
  constructor(private _router: Router, public _authService: AuthService){}

  logout() {
    this.menuOpen = false;
    this._authService.signOut();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  irA(ruta: string, fragmento?: string) {
    this.toggleMenu();
    this._router.navigate([ruta], {fragment: fragmento})
  }

}


