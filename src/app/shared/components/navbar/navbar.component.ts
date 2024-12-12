import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{

  menuOpen = false;
  rutaActual: string = '';
  
  
  constructor(private router: Router, public _authService: AuthService, private activatedRoute: ActivatedRoute){}


  ngOnInit(): void {
    
    // Leer la ruta completa
    this.router.events.subscribe(() => {
      this.rutaActual = this.router.url;
      this.cambiarActive(this.rutaActual)
    });

  }


  cambiarActive(ruta: string) {

    const items = document.getElementsByClassName('item-link');
    const icono = document.getElementsByClassName(' bi-person-circle');

    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      if(element.classList.contains('active')) {
        element.classList.remove('active')
      }
    }

    if(icono[0] && icono[0].classList.contains('active')) {
      icono[0].classList.remove('active')
    }


    switch (ruta) {
      case '/home':
          items[0].classList.add('active')  
      break;

      case '/surveis/create':
          items[1].classList.add('active')  
      break;

      case '/dashboard/encuestas':
          items[2].classList.add('active')  
      break;

      case '/profile':
          icono[0].classList.add('active')  
      break;

      case '/auth/register':
          items[3].classList.add('active')  
      break;
    
      default:
        break;
    }
    

  }



  logout() {
    const items = document.getElementsByClassName('item-link');
    const icono = document.getElementsByClassName(' bi-person-circle');
    
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      if(element.classList.contains('active')) {
        element.classList.remove('active')
      }
    }

    if(icono[0] && icono[0].classList.contains('active')) {
      icono[0].classList.remove('active')
    }


    this.menuOpen = false;
    this._authService.signOut();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  irA(route: string, event: Event) {
    
    const items = document.getElementsByClassName('item-link');
    const icono = document.getElementsByClassName(' bi-person-circle');

    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      if(element.classList.contains('active')) {
        element.classList.remove('active')
      }
    }

    if(icono[0] && icono[0].classList.contains('active')) {
      icono[0].classList.remove('active')
    }

    this.toggleMenu();

    let element = event.target as HTMLElement;


    //console.log(element)


    element.classList.add('active')


    this.router.navigate([route])
    
  }

}


