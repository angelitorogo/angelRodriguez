import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEncuestaComponent } from './components/create-encuesta/create-encuesta.component';

const routes: Routes = [

  {
    path: 'create',
    component: CreateEncuestaComponent
  },
  {
    path: '**',
    redirectTo: 'create'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestasRoutingModule { }
