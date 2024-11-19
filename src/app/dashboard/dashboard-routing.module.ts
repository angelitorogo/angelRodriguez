import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { EncuestasComponent } from './components/encuestas/encuestas.component';
import { ResultsComponent } from './components/results/results.component';
import { PublishComponent } from './components/publish/publish.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'encuestas',
        component: EncuestasComponent
      },
      {
        path: 'encuesta/:id',
        component: EncuestaComponent
      },
      {
        path: 'resultados/:id',
        component: ResultsComponent
      },
      {
        path: 'publish/:id',
        component: PublishComponent
      },
      {
        path: '**',
        redirectTo: 'encuestas'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
