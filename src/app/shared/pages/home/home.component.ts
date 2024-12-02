import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home-service.service';
import { AuthService } from '../../../auth/service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  identity?: User;

  wrapper= [ //maximo 9 elementos
    {
      image: 'assets/images/example_1.png', backgroundColor: '#ff0000'
    },
    {
      image: 'assets/images/example_5.png', backgroundColor: '#00ff00'
    },
    {
      image: 'assets/images/example_3.png', backgroundColor: '#0000ff'
    },
    {
      image: 'assets/images/example_4.png', backgroundColor: '#ff00AA'
    }  
  ];


  constructor(public _homeService: HomeService, private _authService: AuthService, private _router: Router, private _titleService: Title) {}



  ngOnInit(): void {

    //if( !this.identity ) this._router.navigate(['/auth/login']);

    this._titleService.setTitle('Formuease | Inicio');

    this.prepararMenu();
    
  }


  prepararMenu() {
    //resetear valores mostrar de elementosMenu
    for (let i = 0; i < this._homeService.elementosMenu.length; i++) {
      this._homeService.elementosMenu[i].mostrar = true;
    }

    this.identity = this._authService.getIdentity;
    
    if(this.identity) {
      //como estamos logados no mostramos ni login ni register
      this._homeService.elementosMenu[3].mostrar = false;

      //Si es user o userpro
      if( this.identity?.role != 'ADMIN' ) {
      
        this._homeService.elementosMenu[2].mostrar = false;

      }

    } else {
      //como NO estamos logados solo mostramos login y register
      this._homeService.elementosMenu[0].mostrar = false;
      this._homeService.elementosMenu[1].mostrar = false; 
      this._homeService.elementosMenu[2].mostrar = false;
      this._homeService.elementosMenu[4].mostrar = false;
    }

  }

  

}
