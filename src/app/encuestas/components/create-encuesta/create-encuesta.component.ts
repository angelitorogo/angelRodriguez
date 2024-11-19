import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../services/encuestas.service';
import { EncuestaItem } from '../../interfaces/encuesta';
import { AuthService } from '../../../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-encuesta',
  templateUrl: './create-encuesta.component.html',
  styleUrl: './create-encuesta.component.css'
})
export class CreateEncuestaComponent implements OnInit{

  comenzar: boolean = false; //cambiar a false
  loading: boolean = false;
  creando: boolean = false; // Cambiar a false
  addQuestion: boolean = false; //cambiar a false

  option: string = '';

  titleSurvey: string = '';
  question: string = '';
  selectedOption: string = '';
  options: string[] = ["Respuesta texto", "Selección de una", "Seleccionar una o varias", "Puntuacion"];
  responses: string[] = [];

  showModal1: boolean = false;
  modalText1: string = 'Este es un mensaje de información';
  modalType1: 'info' | 'success' | 'alert' = 'info';

  questionSelected?: EncuestaItem;
  indexSelected: number|null = null;

  activarOptions: boolean = false;
  selected: boolean = false;

  sesion: any;
  token: any;
  

  constructor(public _encuestasService: EncuestasService, private _authService: AuthService, private _router: Router) {

  }

  ngOnInit(): void {
    this.sesion = this._authService.getIdentity;
    this.token = this._authService.getToken;
  }

  AceptarTitleSurvey() {
    console.log(this.titleSurvey)
    this.addQuestion = true;
  }

  
  comenzarEncuesta() {

    console.log(this.sesion)

    if( !this.sesion ) {
      const currentUrl = this._router.url; // Obtiene la URL actual
      this._router.navigate(['/auth/login'], { queryParams: { returnUrl: currentUrl } });
    }


    this.loading = true;
    this.comenzar = true;
    this.creando = true;

    setTimeout(() => {
      
      this.loading = false;
    }, 500);
    
  }
    

  addOption(opcion:string) {
    this.responses.push(opcion);
    this.option = '';
  }

  guardarAddQuestion() {

    if(this.question != "" && this.selectedOption != "") {

      const pregunta = this.question;
      let tipo: "TEXT" | "SELECT" | "CHECK" | "LEVEL"  = "TEXT";
      let opciones;


      switch (this.selectedOption) {
        case "Respuesta texto":
          tipo = "TEXT"
          break;

        case "Selección de una":
          tipo = "SELECT"
          break;

        case "Seleccionar una o varias":
          tipo = "CHECK"
          break;

        case "Puntuacion":
          tipo = "LEVEL"
          break;
  

      }


      if (this.selectedOption != "Respuesta texto") {

        opciones = this.responses;

      }

      this._encuestasService.addQuestion(pregunta,tipo, opciones);


      this.responses = [];
      this.question = '';
      this.selectedOption = '';
      this.activarOptions = false;

    }

  }

  terminar(){


    

    this._encuestasService.addSurvey(this.titleSurvey).subscribe({
      next: async (response: any) => {

        if (response.id) {

          this.openModal1('success', 'Se ha creado la encuesta con éxito. Consulta el dashboard para compartirlo o analizar datos')

          this.titleSurvey = '';
          this.comenzar = false;
          this.creando = false;
          this.addQuestion = false;

          this._encuestasService.encuesta = {
            id: '',
            created_at: new Date(),
            nombre: '',
            encuestaItem: [] // Array vacío para iniciar sin elementos
        };
          
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

  onOptionChange() {
    this.activarOptions = true;
  }

  escogerQuestion(i: number) {

    this.indexSelected = i;
    this.selected = true;

    this.questionSelected = this._encuestasService.encuesta.encuestaItem[i];

    this.question = this.questionSelected.question;
    this.selectedOption = this.questionSelected.type;
    this.responses = this.questionSelected.options || []

    console.log(this.indexSelected)


  }

  seguirCreando() {
    this.indexSelected = null;
    this.selected = false;
    this.question = '';
    this.selectedOption = '';
    this.responses = [];
  }

  eliminar() {

    this._encuestasService.encuesta.encuestaItem.splice(this.indexSelected!, 1);
    this.responses = [];
    this.question = '';
    this.selectedOption = '';
    this.activarOptions = false;
    this.indexSelected = null;
  }

  openModal1(type: 'info' | 'success' | 'alert', text: string) {
    this.modalType1 = type;
    this.modalText1 = text;
    this.showModal1 = true;
  }

  closeModal1() {
    this.showModal1 = false;
  }

}
