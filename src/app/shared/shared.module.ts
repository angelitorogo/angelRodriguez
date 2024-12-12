import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LeerMasComponent } from './pages/leer-mas/leer-mas.component';
import { RouterModule } from '@angular/router';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { Boton6Component } from './components/boton6/boton6.component';
import { FaqComponent } from './pages/faq/faq.component';
import { Modal1Component } from './components/modal1/modal1.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Input4Component } from './components/input4/input4.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RecoveryRequestComponent } from './pages/recovery-request/recovery-request.component';






@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    WrapperComponent,
    HomeComponent,
    LeerMasComponent,
    TermsConditionsComponent,
    FaqComponent,
    ProfileComponent,
    RecoveryComponent,
    RecoveryRequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    Boton6Component,
    Modal1Component,
    Input4Component
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]

})
export class SharedModule { }
