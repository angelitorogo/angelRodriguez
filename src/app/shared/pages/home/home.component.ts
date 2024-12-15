import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home-service.service';
import { AuthService } from '../../../auth/service/auth.service';
import { Router } from '@angular/router';
import { MailSendForm, User } from '../../interfaces/user.interface';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  identity?: User;

  wrapper= [ //maximo 9 elementos
    {
      image: 'assets/images/example_1.png', backgroundColor: '#ff0000'
    },
    {
      image: 'assets/images/example_5.png', backgroundColor: '#00ff00'
    },
    {
      image: 'assets/images/example_3.png', backgroundColor: '#0000ff'
    },
    {
      image: 'assets/images/example_4.png', backgroundColor: '#ff00AA'
    }  
  ];

  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  form: ReturnType<FormBuilder['group']>;



  constructor(public _homeService: HomeService, 
              private _authService: AuthService, 
              private _router: Router, 
              private _titleService: Title, 
              private _formBuilder: FormBuilder) {

                this.form = this._formBuilder.group<MailSendForm>({
                  email: this._formBuilder.nonNullable.control('',[Validators.required, Validators.email]),
                  nombre: this._formBuilder.nonNullable.control('', Validators.required),
                  apellido: this._formBuilder.nonNullable.control('', Validators.required),
                  asunto: this._formBuilder.nonNullable.control('',  Validators.required),
                  text: this._formBuilder.nonNullable.control('', Validators.required),
                  extra_field: this._formBuilder.control('')
                });

              }


  ngOnInit(): void {

    this._titleService.setTitle('Formuease | Inicio');
    

  }


  

  submit() {

    if (this.form.invalid || this.form.value.extra_field != '') {
      return;
    }

    const { email, nombre, apellido, asunto, text} = this.form.value;


    this._homeService.sendMail(email, nombre, apellido, asunto, text).subscribe({
      next: async( response: any ) => {
        this.openModal1('success', 'Hemos recibido su consulta. Le contestaremos lo antes posible')
        
      },
      error: (error: any) => {
        //console.log(error)
        this.openModal1('alert', 'No ha sido posible envíar su consulta, inténtelo de nuevo pasados unos instantes')
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
    this.form = this._formBuilder.group<MailSendForm>({
      email: this._formBuilder.nonNullable.control('',[Validators.required, Validators.email]),
      nombre: this._formBuilder.nonNullable.control('', Validators.required),
      apellido: this._formBuilder.nonNullable.control('', Validators.required),
      asunto: this._formBuilder.nonNullable.control('',  Validators.required),
      text: this._formBuilder.nonNullable.control('', Validators.required),
      extra_field: this._formBuilder.control('')
    });
  }

  

}
