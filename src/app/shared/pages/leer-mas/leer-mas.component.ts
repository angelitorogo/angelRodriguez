import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home-service.service';
import { AuthService } from '../../../auth/service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-leer-mas',
  templateUrl: './leer-mas.component.html',
  styleUrl: './leer-mas.component.css'
})
export class LeerMasComponent implements OnInit{

  identity?: User;

  constructor(private _router: Router) {}



  ngOnInit(): void {

    
    
  }



  

}
