import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-recovery-request',
  templateUrl: './recovery-request.component.html',
  styleUrl: './recovery-request.component.css'
})
export class RecoveryRequestComponent {

  formSignRecovery: FormGroup;

  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  constructor(private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute, private _titleService: Title) {

      this.formSignRecovery = this.fb.group({
        email: new FormControl('',[Validators.required, Validators.email]),
      });

      
  }

  submit() {

    const { email } = this.formSignRecovery.value;

    this._authService.recoveryRequest(email).subscribe({
      next: async (response: any) => {

      if( response.ok) {
        this.openModal1('success', response.message)
      }
        
        
      },
      error: (error: any) => {

        console.log('error', error);
        if( error.error.message === 'Error: Empty response. There are no subscribers listening to that message') {
          this.openModal1('alert', 'Sin conexión al servidor')
        } 

        this._router.navigateByUrl('/home');
        
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
