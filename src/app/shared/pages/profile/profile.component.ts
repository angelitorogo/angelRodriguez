import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators, ValueChangeEvent } from '@angular/forms';
import { AuthService } from '../../../auth/service/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  sesion!: User;
  formSignUp: FormGroup;

  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  constructor(private _router: Router, private _titleService: Title, private fb: FormBuilder, public _authService: AuthService, private _profileService: ProfileService) {


    this.formSignUp = this.fb.group({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.pattern(/^[0-9]{9,10}$/) ])
    });
    
  }

  ngOnInit(): void {

    this._titleService.setTitle('Formuease | Términos y condiciones');
    this.sesion = this._authService.getIdentity;


    if (this.formSignUp) {
      this.formSignUp.patchValue({
        fullName: this.sesion?.fullname || '',
        email: this.sesion?.email || '',
        telephone: this.sesion?.telephone || ''
      });
    } else {
      console.error('El formulario no está inicializado.');
    }

  }



  submit() { 

    const { email, fullName, telephone } = this.formSignUp.value;

    this._profileService.updateUser(this.sesion.id, email, fullName, telephone).subscribe({
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

        if (response.token && response.user) {
          
          this.openModal1('success', 'Usuario actualizado con exito')
          
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
