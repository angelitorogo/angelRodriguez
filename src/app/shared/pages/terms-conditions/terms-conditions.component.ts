import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.css'
})
export class TermsConditionsComponent implements OnInit{

  identity?: User;

  constructor(private _router: Router) {}



  ngOnInit(): void {

    
    
  }



  

}
