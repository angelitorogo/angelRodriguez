import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/interfaces/user.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  sesion?:User;
  
  constructor(public _authService: AuthService, private _router: Router) {


  }

  ngOnInit(): void {
    this.sesion = this._authService.getIdentity;
  }



  

}
