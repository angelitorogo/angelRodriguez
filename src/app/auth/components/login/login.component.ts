import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScreenSizeService } from '../../../shared/services/screen-size.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formSignIn: FormGroup;

  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  returnUrl: string = '/home';

  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute, private _titleService: Title) {

    this.formSignIn = this.fb.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    });


  }

  ngOnInit() {
    this._titleService.setTitle('Formuease | Login');
    // Obtiene el parámetro returnUrl de los queryParams
    this.returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/home';
  }


  submit() {

    const { email, password } = this.formSignIn.value;

    this._authService.logIn(email, password).subscribe({
      next: async (response: any) => {

        if (response) {

          if (response.user.telephone === '') {
            response.user.telephone = null
          }
          
          try {
        
            await this._authService.saveSession(JSON.stringify(response))
            
            
          } catch (error: any) {
            //console.log(error)
            this.openModal1('alert', error.message)
            
          }
        }

        if( this.returnUrl != '/home') {
          this._router.navigateByUrl(this.returnUrl);
        } else {
          this._router.navigateByUrl('/home');
        }
    
        
        
      },
      error: (error: any) => {

        //console.log('error', error);
        if( error.error.message === 'Error: Empty response. There are no subscribers listening to that message') {
          this.openModal1('alert', 'Sin conexión al servidor')
        } else {
          this.openModal1('alert', error.error.message)
        }
        
        
      }      

    })


  } 
  

  openModal1(type: 'info' | 'success' | 'alert', text: string) {
    this.modalType1 = type;
    this.modalText1 = text;
    this.showModal1 = true;
  }

  closeModal1() {
    this.showModal1 = false;
  }
}
