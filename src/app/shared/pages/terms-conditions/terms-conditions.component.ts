import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.css'
})
export class TermsConditionsComponent implements OnInit{

  identity?: User;

  constructor(private _router: Router, private _titleService: Title) {}



  ngOnInit(): void {

    this._titleService.setTitle('Formuease | Términos y condiciones');
    
  }



  

}
