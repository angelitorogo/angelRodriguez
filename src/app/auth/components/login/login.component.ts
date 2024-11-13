import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScreenSizeService } from '../../../shared/services/screen-size.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  formSignIn: FormGroup;

  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              private _router: Router) {

    this.formSignIn = this.fb.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    });


  }


  submit() {
  
    console.log(this.formSignIn.value);

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
            console.log(error)
            this.openModal1('alert', error.message)
            
          }
        }
    
        this._router.navigateByUrl('/dashboard');
        
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
