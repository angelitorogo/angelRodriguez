import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Modal1Component } from '../shared/components/modal1/modal1.component';
import { Boton6Component } from '../shared/components/boton6/boton6.component';
import { Input4Component } from '../shared/components/input4/input4.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';






@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Modal1Component,
    Boton6Component,
    Input4Component 
  ],

})
export class AuthModule { }
