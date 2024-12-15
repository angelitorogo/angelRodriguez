import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScreenSizeService } from '../../../shared/services/screen-size.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  formSignUp: FormGroup;

  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              private _router: Router, private _titleService: Title) {

                this.formSignUp = this.fb.group({
                  fullname: new FormControl('', [Validators.required, Validators.minLength(3)]),
                  //surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
                  email: new FormControl('',[Validators.required, Validators.email]),
                  password1: new FormControl('',[Validators.required, Validators.minLength(6)]),
                  password2: new FormControl('',[Validators.required, Validators.minLength(6)]),
                  acepted: new FormControl('off',[Validators.pattern('on')]),
                });


  }
  ngOnInit(): void {
    this._titleService.setTitle('Formuease | Registro');
  }


  submit() {
  
    

    const { email, fullname, password1, password2, acepted } = this.formSignUp.value;

      if (password1 !== password2) {
        //console.log('contraseñas no son iguales')
        this.openModal1('alert', 'Contraseñas no son iguales')
        return;
      }

      const password = password1;

      this._authService.signUp(email, fullname, password).subscribe({
        next: async (response: any) => {

          if (response.token && response.user) {
            this.openModal1('success', 'Usuario creado con exito')
            
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
