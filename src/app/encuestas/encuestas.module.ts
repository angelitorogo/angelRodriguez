import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEncuestaComponent } from './components/create-encuesta/create-encuesta.component';
import { EncuestasRoutingModule } from './encuestas-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CreateEncuestaComponent
  ],
  imports: [
    CommonModule,
    EncuestasRoutingModule,
    SharedModule
]
})
export class EncuestasModule { }
