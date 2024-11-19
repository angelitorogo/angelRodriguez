import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnsweredRoutingModule } from './answered-routing.module';
import { SurveyComponent } from './components/survey/survey.component';
import { Boton6Component } from '../shared/components/boton6/boton6.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SurveyComponent
  ],
  imports: [
    CommonModule,
    AnsweredRoutingModule,
    SharedModule,
    Boton6Component
  ]
})
export class AnsweredModule { }
