import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class HomeService {

    // Los elementos que pasarás a lib-nav1
  elementosNav= [
    {
      elemento: 'Home', //mostrar se configurara en cada app, dependiendo de lo que sea, permisos, etc
      link: '/', 
      mostrar: true 
    },
    {
      elemento: 'About',
      link: '/', 
      mostrar: true
    },
    {
      elemento: 'Contact',
      link: '/', 
      mostrar: true
    }
  ];

  elementosMenu = [
    { pos: 0, elemento: 'Profile', link: '/', mostrar: true }, //mostrar se configurara en cada app, dependiendo de lo que sea, permisos, etc
    { pos: 1, elemento: 'Settings',mostrar: true, subMenu: 
      [
        { elemento: 'Language', link: '/', mostrar: true },
        { elemento: 'Theme', link: '/', mostrar: true }
      ],
    },
    { pos: 2, elemento: 'Administration', mostrar: true,
       subMenu: 
       [
        { elemento: 'Logs', link: '/', mostrar: true },
        { elemento: 'Users', link: '/', mostrar: true }
      ], 
    },
    { pos: 3, elemento: 'Login', link: '/auth/login', mostrar: true },
    { pos: 4, elemento: 'Logout', link: '/', mostrar: true },  

  ];

    
  appIcon1: string = 'assets/icons/icono2.webp';


   // Los elementos que pasarás a lib-nav2
   elementosNav2 = [
    { elemento: 'Primero', link: '/', mostrar: true }, //mostrar se configurara en cada app, dependiendo de lo que sea, permisos, etc
    { elemento: 'Segundo',mostrar: true, subMenu: 
      [
        { elemento: 'SegundoA', link: '/', mostrar: true },
        { elemento: 'SegundoB', link: '/', mostrar: true }
      ],
    },
    { elemento: 'Tercero', mostrar: true,
       subMenu: 
       [
        { elemento: 'TerceroA', link: '/', mostrar: true },
        { elemento: 'TerceroB', link: '/', mostrar: true }
      ], 
    },
    { elemento: 'Tercero', mostrar: true,
       subMenu: 
       [
        { elemento: 'TerceroA', link: '/', mostrar: true },
        { elemento: 'TerceroB', link: '/', mostrar: true },
        { elemento: 'TerceroA', link: '/', mostrar: true },
        { elemento: 'TerceroB', link: '/', mostrar: true }
      ], 
    }    

  ];

}