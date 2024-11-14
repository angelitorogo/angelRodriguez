import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LeerMasComponent } from './pages/leer-mas/leer-mas.component';
import { RouterModule } from '@angular/router';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';






@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LeerMasComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]

})
export class SharedModule { }
