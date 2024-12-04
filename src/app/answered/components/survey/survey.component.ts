import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { Encuesta } from '../../../encuestas/interfaces/encuesta';
import { responseEncuesta, responseEncuestaItem } from '../../interfaces/response';
import { SurveysService } from '../../services/surveys.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent implements OnInit{

  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  id: string = '';
  encuesta!: Encuesta; 

  response: { 

    id: number,
    encuestaItemId: string,
    question: string,
    respuesta: string[],

  }[] = [];

  email: string = '';

  // DECLARAR LAS RESPUESTAS QUE SE ENVIARAN
  responseEncuesta: responseEncuesta = {
    email: '',
    encuestaId: '',
    respuestas: []
  };

  numPreguntas: number = 0;
  preguntaActual: number = 1;
  idActual: string = '';
  questionsIds: HTMLElement[] = [];

  checkOption: string[] = [];
  continuar: boolean = true;

  colorBoton: string = '#1a1a1a';
  textButtonSig: string = 'Siguiente';
  textButtonAnt: string = 'Anterior';
  opcionEscogida: string|null = null;


  mostrarMensaje: boolean = false; //cambiar a false


  constructor(public _authService: AuthService, 
              private _router: Router, 
              private _dashboardService: DashboardService,
              private _route: ActivatedRoute,
              private _surveysService: SurveysService,
              private _titleService: Title) {

  }



  ngOnInit(): void {

    this._titleService.setTitle('Formuease | Responde a esta encuesta');

    this.id = this._route.snapshot.paramMap.get('id')!;
   
    this.loadSurveyById(this.id);
    
    //console.log(this.response);
    
  }


  recopilarIds() {

    for (let i = 0; i < this.encuesta!.encuestaItem.length; i++) {

      this.questionsIds.push(document.getElementById(`question-${i}`)!)

    }


    this.idActual = this.questionsIds[0].id;
    document.getElementById(this.idActual)?.classList.add('visible');



  }


  loadSurveyById(id:string) {
    this._dashboardService.loadSurveyById(id).subscribe({
      next: async (response: any) => {

        //console.log(response)

        this.encuesta = response;

        this.encuesta?.encuestaItem.unshift({
          
          question: 'Correo electrónico',
          type: 'EMAIL',
        })


        this.numPreguntas = this.encuesta!.encuestaItem.length;

       

        setTimeout(() => {
          this.recopilarIds();
        }, 500);

        


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


  openModal1(type: 'info' | 'success' | 'alert', text: string) {
    this.modalType1 = type;
    this.modalText1 = text;
    this.showModal1 = true;
  }

  closeModal1() {
    this.showModal1 = false;
  }


  siguiente() {


    if(this.encuesta.encuestaItem[this.preguntaActual - 1].type === 'EMAIL') {
      const elementHTML = document.getElementById(`input-${this.preguntaActual - 1}`) as HTMLInputElement;
      let resp: string[] = [];
      resp.push(elementHTML.value);

      let question = this.encuesta!.encuestaItem[this.preguntaActual - 1].question
      this.response[this.preguntaActual - 1] = {
        id: this.preguntaActual - 1,
        encuestaItemId: this.encuesta!.encuestaItem[this.preguntaActual - 1].id!,
        question: question,
        respuesta: resp
      }


    } else if(this.encuesta.encuestaItem[this.preguntaActual - 1].type === 'TEXT') {
      const elementHTML = document.getElementById(`textarea-${this.preguntaActual - 1}`) as HTMLTextAreaElement;
      let resp: string[] = [];
      resp.push(elementHTML.value);

      let question = this.encuesta!.encuestaItem[this.preguntaActual - 1].question
      this.response[this.preguntaActual - 1] = {
        id: this.preguntaActual - 1,
        encuestaItemId: this.encuesta!.encuestaItem[this.preguntaActual - 1].id!,
        question: question,
        respuesta: resp
      }

      
        
    } 

    this.preguntaActual++;

    if( this.preguntaActual > this.numPreguntas) {
      this.preguntaActual--;
    }

    if(this.preguntaActual == this.numPreguntas) {
      this.colorBoton = '#008800';
    } else {
      this.colorBoton = '#1a1a1a';
    }

    this.idActual = `question-${this.preguntaActual - 1}`;

    //cambiar estilo para que se vea el id actual y se quiten el resto

    for (let i = 0; i < this.questionsIds.length; i++) {
      const element = this.questionsIds[i];
      element.classList.remove('visible')
    }

    document.getElementById(this.idActual)?.classList.add('visible');
   
    if(document.getElementById(`iconCheck-${this.preguntaActual - 1}`)?.classList.contains('visible')) {
      this.continuar = true;
      
    } else {
      this.continuar = false;
    }

    
  }

  anterior() {

    this.preguntaActual--;

    if( this.preguntaActual < 1) {
      this.preguntaActual = 1;
    }

    this.idActual = `question-${this.preguntaActual - 1}`;


    //cambiar estilo para que se vea el id actual y se quiten el resto

    for (let i = 0; i < this.questionsIds.length; i++) {
      const element = this.questionsIds[i];
      element.classList.remove('visible')
    }

    document.getElementById(this.idActual)?.classList.add('visible');

    if(document.getElementById(`iconCheck-${this.preguntaActual - 1}`)?.classList.contains('visible')) {
      this.continuar = true;
    } else {
      this.continuar = false;
    }

    if( this.preguntaActual == 1) {
      this.continuar = true;
    }

  }

  onInputEmail(event: Event, i: number) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = (event.target as HTMLTextAreaElement).value;


    if(emailPattern.test(email)) {
      document.getElementById(`iconCheck-${i}`)?.classList.add('visible');
      this.continuar = true;


    } else if (email === ''){
      document.getElementById(`iconCheck-${i}`)?.classList.remove('visible');
      this.continuar = true;

      
      
    } else {
      document.getElementById(`iconCheck-${i}`)?.classList.remove('visible');
      this.continuar = false;


    }
  }

  onInput(event: Event, i: number) {
    const textareaValue = (event.target as HTMLTextAreaElement).value;
    if( textareaValue.length > 3) {
      document.getElementById(`iconCheck-${i}`)?.classList.add('visible');
      this.continuar = true;

      const question = this.encuesta!.encuestaItem[i].question;
      let resp: string[] = [];
      resp.push(textareaValue);

      this.response[i] = {
        id: i,
        encuestaItemId: this.encuesta!.encuestaItem[i].id!,
        question: question,
        respuesta: resp
      }
      
    } else {
      document.getElementById(`iconCheck-${i}`)?.classList.remove('visible');
      this.continuar = false;

      const question = this.encuesta!.encuestaItem[i].question;
      let resp: string[] = [];

      this.response[i] = {
        id: i,
        encuestaItemId: this.encuesta!.encuestaItem[i].id!,
        question: question,
        respuesta: resp
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

  /*SELECT*/
  onSelectChange(event: Event, i: number){
    
    const opciones = document.getElementById(`opciones-${i}`)!;
    opciones?.classList.remove('visible');
    const button = document.getElementById(`button-select-${i}`)!;
    

    const target = event.target as HTMLLIElement;
    document.getElementById(`selection-option-${i}`)!.innerHTML = target.innerHTML;
   
    const question = this.encuesta!.encuestaItem[i].question
    let resp: string[] = [];
    resp.push(target.innerHTML);
 

    button.innerHTML = resp[0];
    document.getElementById(`iconCheck-${i}`)?.classList.add('visible');
    this.continuar = true;



    this.response[i] = {
      id: i,
      encuestaItemId: this.encuesta!.encuestaItem[i].id!,
      question: question,
      respuesta: resp
    }

  }

  /*CHECK*/
  onCheckboxChange(event: Event, option: any, i: number) {

    let checked: any;
    checked = (event.target as HTMLInputElement).checked;

   

    if( checked) {
      this.checkOption.push(option)
    } else {

      this.checkOption = this.checkOption.filter(
        (item) => item !== option
      );

    }

    

    let arrayFinal = Array.from(new Set(this.checkOption));
    const question = this.encuesta!.encuestaItem[i].question

    this.response[i] = {
      id: i,
      encuestaItemId: this.encuesta!.encuestaItem[i].id!,
      question: question,
      respuesta: arrayFinal
    }

    if (this.response[i].respuesta!.length != 0) {
      document.getElementById(`iconCheck-${i}`)?.classList.add('visible');
      this.continuar = true;
      
    } else {
      document.getElementById(`iconCheck-${i}`)?.classList.remove('visible');
      this.continuar = false;
    }

    

  }

  /*LEVEL*/
  seleccionarLevel(event: Event, option: any, i: number) {

    const target = event.target as HTMLElement;
    

    const options = document.getElementsByClassName('opcion');
    for (let i = 0; i < options.length; i++) {
      
      options[i].classList.remove('active-level')
      
    }

    let opcion: string[] = [];
    opcion.push(option)

    const question = this.encuesta!.encuestaItem[i].question
    this.response[i] = {
      id: i,
      encuestaItemId: this.encuesta!.encuestaItem[i].id!,
      question: question,
      respuesta: opcion
    }
    
    target.classList.add('active-level')
    document.getElementById(`iconCheck-${i}`)?.classList.add('visible');
    this.continuar = true;


  }




  aceptar() {

    this.formatearResponse(this.response);

  }


  formatearResponse( response: {id: number,encuestaItemId: string,question: string,respuesta: string[]}[]) {

    let resp= response.map(({ id, question, ...resto }) => resto);

    if(resp[0].respuesta[0] != '') {
      this.responseEncuesta.email = resp[0].respuesta[0];
    } else {
      this.responseEncuesta.email = undefined;
    }

    resp.shift();
    
    this.responseEncuesta.encuestaId = this.encuesta.id;
    this.responseEncuesta.respuestas = resp;


    console.log(this.responseEncuesta)
    this.enviarResponse(this.responseEncuesta);

  }


  enviarResponse(response: responseEncuesta) {

    this._surveysService.sendResponseSurvey(response).subscribe({
      next: async (response: any) => {

        if( response.response) {
          this.mostrarMensaje = true;
        }

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


  volverContestar() {
    this.mostrarMensaje = false;
    this.response = [];
    this.email = '';
    this.preguntaActual = 1;
    this.idActual = '';

    this.loadSurveyById(this.id);

  }
  

}
