import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { Modal1Component } from '../shared/components/modal1/modal1.component';
import { Boton6Component } from '../shared/components/boton6/boton6.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { EncuestasComponent } from './components/encuestas/encuestas.component';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from './components/results/results.component';
import { PublishComponent } from './components/publish/publish.component';



@NgModule({
  declarations: [
    DashboardComponent,
    EncuestaComponent,
    EncuestasComponent,
    ResultsComponent,
    PublishComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    Modal1Component,
    Boton6Component

  ]
})
export class DashboardModule { }
