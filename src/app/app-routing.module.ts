import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { LeerMasComponent } from './shared/pages/leer-mas/leer-mas.component';
import { TermsConditionsComponent } from './shared/pages/terms-conditions/terms-conditions.component';
import { FaqComponent } from './shared/pages/faq/faq.component';
import { ProfileComponent } from './shared/pages/profile/profile.component';
import { RecoveryComponent } from './shared/pages/recovery/recovery.component';
import { RecoveryRequestComponent } from './shared/pages/recovery-request/recovery-request.component';


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
    path: 'faqs',
    component: FaqComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'recovery-request',
    component: RecoveryRequestComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
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
    path: 'response',
    loadChildren: () => import('./answered/answered.module').then( m => m.AnsweredModule),
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
