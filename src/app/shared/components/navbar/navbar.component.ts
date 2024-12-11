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

  irA(route: string, fragmento?: string) {
    this.toggleMenu();

    const menuItems = document.getElementsByClassName('item-link')

    for (let i = 0; i < menuItems.length; i++) {
      const element = menuItems[i];
      
      if( element.classList.contains('active')) {
        element.classList.remove('active')
      }
      
    }

    console.log(route);



    this._router.navigate([route], {fragment: fragmento})
    
  }

}


