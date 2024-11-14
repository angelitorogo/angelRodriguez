import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { LeerMasComponent } from './shared/pages/leer-mas/leer-mas.component';
import { TermsConditionsComponent } from './shared/pages/terms-conditions/terms-conditions.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'more',
    component: LeerMasComponent
  },
  {
    path: 'terms-conditions',
    component: TermsConditionsComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  {
    path: 'surveis',
    loadChildren: () => import('./encuestas/encuestas.module').then( m => m.EncuestasModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule),
  },
  {
    path:'**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
