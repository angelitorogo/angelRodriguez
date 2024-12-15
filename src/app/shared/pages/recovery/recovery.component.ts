import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScreenSizeService } from '../../../shared/services/screen-size.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../auth/service/auth.service';
import { ProfileService } from '../../services/profile.service';
import { EncryptionService } from '../../services/encryption.service';
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css'
})
export class RecoveryComponent {

  formPasswordRecovery: FormGroup;


  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  showModal2: boolean = false;
  modalText2: string = 'Este es un mensaje de información';
  modalType2: 'info' | 'success' | 'alert' = 'info';

  isExpired: boolean = false;
  decryptedData: any;



  constructor(
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private _encryptionService: EncryptionService,
    private _authService: AuthService,
    private _profileService: ProfileService,
    private _router: Router) {

      this.formPasswordRecovery = this.fb.group({
        password1: new FormControl('',[Validators.required, Validators.minLength(6)]),
        password2: new FormControl('',[Validators.required, Validators.minLength(6)]),
      });

  }

  ngOnInit(): void {
    // Leer parámetros de la URL
    this._route.queryParams.subscribe((params) => {
      
      const encryptedData = decodeURIComponent(params['data']);
      const iv = decodeURIComponent(params['iv']);

      //console.log(encryptedData)
      //console.log(iv)

      this.decryptedData = this._encryptionService.decrypt(encryptedData, iv);

      //console.log(this.decryptedData)

      if (!this.decryptedData) {
        this.openModal1('alert', 'Enlace expirado');
      }

    });
  }


  submit() {

    const { password1, password2 } = this.formPasswordRecovery.value;

    if (password1 != password2) {
      this.openModal2('alert', 'Las contraseñas no coinciden')
    }


    this._profileService.updatePassword(this.decryptedData, password1).subscribe({
      next: async (response: any) => {

      if( response) {
        this.openModal1('success', 'Contraseña creada correctamente')
      }
        
        
      },
      error: (error: any) => {

        //console.log('error', error);
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
    this._router.navigateByUrl('/home')
    this.showModal1 = false;
  }

  openModal2(type: 'info' | 'success' | 'alert', text: string) {
    this.modalType2 = type;
    this.modalText2 = text;
    this.showModal2 = true;
  }

  closeModal2() {
    this.showModal2 = false;
  }

}
