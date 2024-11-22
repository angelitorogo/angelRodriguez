import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { Encuesta } from '../../../encuestas/interfaces/encuesta';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent implements OnInit{

  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  encuesta?: Encuesta; 

  responseEncuesta: { 

    id: number,
    question: string,
    response: string[],

  }[] = [];

  checkOption: string[] = [];

  opciones?: HTMLElement;

  rutaResultado: string = '';
  rutaPublish: string = '';

  arraySelects: number[] = [];

  constructor(public _authService: AuthService, private _router: Router, private _dashboardService: DashboardService, private _route: ActivatedRoute) {

  }

  ngOnInit(): void {

    const id = this._route.snapshot.paramMap.get('id')!;
    this.rutaResultado = `/dashboard/resultados/${id}`;
    //this.rutaPublish = `/dashboard/publish/${id}`;
    this.rutaPublish = `/response/survey/${id}`; //Quitar esta y dejar la anterior

    
   
    this.loadSurveyById(id);
      
  }

 

  loadSurveyById(id:string) {
    this._dashboardService.loadSurveyById(id).subscribe({
      next: async (response: any) => {

        this.encuesta = response;
  
      },
      error: (error: any) => {

        console.log('error', error);
        if( error.error.message === 'Error: Empty response. There are no subscribers listening to that message') {
          this.openModal1('alert', 'Sin conexión al servidor')
        } else {
          this.openModal1('alert', error.error.message)
        }
        
        
      }      

    })
  }


  recolectarTextos() {

    for (let i = 0; i < this.encuesta!.encuestaItem.length; i++) {
      const element = this.encuesta!.encuestaItem[i];

      if(element.type === 'TEXT') {
        
        const elementHTML = document.getElementById(`textarea-${i}`) as HTMLTextAreaElement;
        const resp: any = elementHTML.value;

        const question = this.encuesta!.encuestaItem[i].question
        this.responseEncuesta[i] = {
          id: i,
          question: question,
          response: resp
        }
        
        
      }
      
    }

  
  }

  mostrarOpciones(i: number) {
    const opciones = document.getElementById(`opciones-${i}`)!;

    if( opciones.classList.contains('visible')) {
      opciones?.classList.remove('visible');
    } else {
      opciones?.classList.add('visible');
    }

  }

  onSelectChange(event: Event, i: number){
    
    const opciones = document.getElementById(`opciones-${i}`)!;
    opciones?.classList.remove('visible');

    const target = event.target as HTMLLIElement;
    document.getElementById(`selection-option-${i}`)!.innerHTML = target.innerHTML;
   
    const question = this.encuesta!.encuestaItem[i].question
    const resp: any = target.innerHTML;


    this.responseEncuesta[i] = {
      id: i,
      question: question,
      response: resp
    }

  }

  onCheckboxChange(option: any, i: number) {

    this.checkOption.push(option)

    let arrayFinal = Array.from(new Set(this.checkOption));
    const question = this.encuesta!.encuestaItem[i].question

    this.responseEncuesta[i] = {
      id: i,
      question: question,
      response: arrayFinal
    }

  }

  seleccionarLevel(event: Event, option: any, i: number) {

    const target = event.target as HTMLElement;
    

    const options = document.getElementsByClassName('opcion');
    for (let i = 0; i < options.length; i++) {
      
      options[i].classList.remove('active-level')
      
    }

    const question = this.encuesta!.encuestaItem[i].question
    this.responseEncuesta[i] = {
      id: i,
      question: question,
      response: option
    }
    
    target.classList.add('active-level')

  }

  openModal1(type: 'info' | 'success' | 'alert', text: string) {
    this.modalType1 = type;
    this.modalText1 = text;
    this.showModal1 = true;
  }

  closeModal1() {
    this.showModal1 = false;
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {

    if(this.encuesta) {
      for (let i = 0; i < this.encuesta!.encuestaItem.length; i++) {

        const element = this.encuesta!.encuestaItem[i];
  
        if( element.type == 'SELECT') {
      
          //tenemos el i de los select
          const opciones = document.getElementById(`opciones-${i}`)!;
          const divExcluido = document.getElementById(`button-select-${i}`)!;
  
          // Verifica si el clic ocurrió dentro del div excluido
          if (divExcluido.contains(event.target as Node)) {
            return; // Sal del método sin hacer nada
          }
      
          if( opciones.classList.contains('visible')) {
            opciones?.classList.remove('visible');
          }
  
        }
  
      }
  
    }

    
  }
  

  eliminar( id: string | undefined) {


    this._dashboardService.deleteSurvey(id!).subscribe({
      next: async (response: any) => {

        this._router.navigateByUrl('/dashboard/encuestas')

      },
      error: (error: any) => {

        console.log('error', error);
        if( error.error.message === 'Error: Empty response. There are no subscribers listening to that message') {
          this.openModal1('alert', 'Sin conexión al servidor')
        } else {
          this.openModal1('alert', error.error.message)
        }
        
        
      }      

    })
  
  
    

  }


  /*
  aceptar() {

    this.recolectarTextos();

    // Filtrar las posiciones donde el campo `response` está vacío
    const filtrado = this.responseEncuesta.filter(item => item.response.length > 0);

    // Ordenar el array filtrado por el campo `id`, de menor a mayor
    const ordenado = filtrado.sort((a, b) => a.id - b.id);

    this.responseEncuesta = ordenado;

    console.log(this.responseEncuesta);

  }
    */

}
