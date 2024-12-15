import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/interfaces/user.interface';
import { Encuesta } from '../../../encuestas/interfaces/encuesta';
import { Metadata } from '../../interfaces/metadata';
import { AuthService } from '../../../auth/service/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrl: './encuestas.component.css'
})
export class EncuestasComponent implements OnInit{

  domain = environment.DOMAIN_URL;

  sesion?:User;

  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  showModal2: boolean = false; //cambiar a false
  modalText2: string = 'https://link_de_la_encuesta.com/link';
  modalType2: 'info' | 'success' | 'alert' = 'info';
  share: boolean = true;

  encuestas: Encuesta[] = [];
  metadata?: Metadata;
  encuestaVer: any;

  mostrarOpciones: boolean = false;
  encuestaSel: number|null = null;

  surveySharedId: string = '';
  urlSharedSurvey: string = '';

  constructor(public _authService: AuthService, 
    private _router: Router, 
    private _dashboardService: DashboardService, 
    private _titleService: Title) {


  }

  ngOnInit(): void {

    this._titleService.setTitle('Formuease | Encuestas');

    this.sesion = this._authService.getIdentity;
    if( !this.sesion ) {
      const currentUrl = this._router.url; // Obtiene la URL actual
      this._router.navigate(['/auth/login'], { queryParams: { returnUrl: currentUrl } });
    } else {
      this.loadSurveisUser();
    }
     
  }

  getTitleFromRoute(route: any): string {
    let title = route.data?.title || '';
    if (route.firstChild) {
      title = this.getTitleFromRoute(route.firstChild) || title;
    }
    return title;
  }

  mostrarEncuesta(i: number) {

    

    const ancho = window.innerWidth;
    if( ancho > 768) return;

    const items = document.getElementsByClassName('item-encuestas');
    const opciones = document.getElementsByClassName('container-opciones');

    if( this.encuestaSel == i) {
      document.getElementById('opciones-'+i)?.classList.remove('visible');
      items[i].classList.remove('seleccionado');
      this.encuestaSel = null;
      return;
    }

    this.mostrarOpciones = true;
    this.encuestaSel = i;

    

    for (let i = 0; i < opciones.length; i++) {
      const element = opciones[i];
      element.classList.remove('visible')
      items[i].classList.remove('seleccionado')
      
    }


    document.getElementById('opciones-'+i)?.classList.add('visible');
    items[i].classList.add('seleccionado')

  }


  loadSurveisUser() {

    this._dashboardService.loadSurveisUser().subscribe({
      next: async (response: any) => {

        if(response.encuestas) {
          this.encuestas = response.encuestas;
          this.metadata = response.metadata;
        }


      },
      error: (error: any) => {

        //console.log('error', error);
        if( error.error.message === 'Error: Empty response. There are no subscribers listening to that message' || error.message === 'Http failure response for https://formuease-api.formuease.com/api/encuestas/find-all: 0 Unknown Error') {
          this.openModal1('alert', 'Sin conexión al servidor')
        } else {
          this.openModal1('alert', error.error.message)
        }
        
        
      }      

    })

  }


  verEncuesta(item: Encuesta) {

    this.encuestaVer = item;

    //console.log(item)
    this._router.navigate(['/dashboard/encuesta', this.encuestaVer.id]);

  }


  eliminar(i: number) {

    const id = this.encuestas[i].id;


    this._dashboardService.deleteSurvey(id!).subscribe({
      next: async (response: any) => {

        if(response.encuestas) {
          this.encuestas = response.encuestas;
          this.metadata = response.metadata;
        }

        //console.log(this.encuestas);
        //console.log(this.metadata);

        this.openModal1('success', 'Encuesta eliminada!')


      },
      error: (error: any) => {

        //console.log('error', error);
        if( error.error.message === 'Error: Empty response. There are no subscribers listening to that message') {
          this.openModal1('alert', 'Sin conexión al servidor')
        } else {
          this.openModal1('alert', error.error.message)
        }
        
        
      }      

    })


  }

  openModal1(type: 'info' | 'success' | 'alert', text: string) {
    this.modalType1 = type;
    this.modalText1 = text;
    this.showModal1 = true;
  }

  closeModal1() {
    this.showModal1 = false;
  }

  clickIconoFill(id: string| undefined) {

    const linkSurvey = `${this.domain}#/response/survey/${id}`;
    this.openModal2('info', linkSurvey, id)

  }

  openModal2(type: 'info' | 'success' | 'alert', text: string, id?: string) {
    this.modalType2 = type;
    this.modalText2 = text;
    this.showModal2 = true;
    if(id) {
      this.surveySharedId = id;
    }
    this.share = true;
  }

  closeModal2(data: [string, string]) {

    const redSocial = data[0];
    const id = data[1];

    let encuesta: any = this.encuestas.find((encuesta) => encuesta?.id === id);
    let urlShared;
    
    if(redSocial) {

      if( redSocial === 'facebook') {
        urlShared = `https://www.facebook.com/sharer/sharer.php?u=https://formuease-api.formuease.com/previews/${id}.html`;
      }

      if( redSocial === 'x') {
        const text = encodeURIComponent("Responde a esta encuesta. No te llevará mas de 1 minuto.");
        const hashtags = encodeURIComponent("Encuesta,FormuEase");
        urlShared = `https://twitter.com/intent/tweet?text=${text}&url=https://formuease-api.formuease.com/previews/${id}.html&hashtags=${hashtags}`;
      }

      if( redSocial === 'linkedin') {
        const title = encodeURIComponent("Responde a esta encuesta. No te llevará mas de 1 minuto.");
        const source = encodeURIComponent(`formuease.formuease.com`);
        urlShared= `https://www.linkedin.com/shareArticle?mini=true&url=https://formuease-api.formuease.com/previews/${id}.html&title=${title}&source=${source}`;

      }

      window.open(urlShared, '_blank');
      

    } else {
      
      this.copiarAlPortapapeles(this.modalText2);
    
    }
    
  
    this.showModal2 = false;

  }

  


  copiarAlPortapapeles(textoACopiar: string) {
    navigator.clipboard.writeText(textoACopiar).then(() => {
      //console.log('Texto copiado al portapapeles con éxito.');
    }).catch(err => {
      console.error('Error al copiar el texto al portapapeles: ', err);
    });
  }


}
