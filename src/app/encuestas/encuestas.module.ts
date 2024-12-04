import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEncuestaComponent } from './components/create-encuesta/create-encuesta.component';
import { EncuestasRoutingModule } from './encuestas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Boton6Component } from "../shared/components/boton6/boton6.component";
import { Modal1Component } from '../shared/components/modal1/modal1.component';
import { TruncatePipe } from './pipes/truncate.pipe';



@NgModule({
  declarations: [
    CreateEncuestaComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    EncuestasRoutingModule,
    SharedModule,
    FormsModule,
    Boton6Component,
    Modal1Component
]
})
export class EncuestasModule { }
