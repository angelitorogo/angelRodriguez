import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../services/encuestas.service';
import { EncuestaItem } from '../../interfaces/encuesta';
import { AuthService } from '../../../auth/service/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-encuesta',
  templateUrl: './create-encuesta.component.html',
  styleUrl: './create-encuesta.component.css'
})
export class CreateEncuestaComponent implements OnInit{

  comenzar: boolean = false; //cambiar a false
  loading: boolean = false;
  creando: boolean = false; // Cambiar a false
  addImage: boolean = false; // cambiar a false
  addQuestion: boolean = false; //cambiar a false

  selectedFileName: string | null = null;
  selectedFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;

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
  

  constructor(public _encuestasService: EncuestasService, 
              private _authService: AuthService, 
              private _router: Router, 
              private _titleService: Title) {

  }

  ngOnInit(): void {
    this._titleService.setTitle('Formuease | Nueva encuesta');
    this.sesion = this._authService.getIdentity;
    this.token = this._authService.getToken;

  }

  AceptarTitleSurvey() {
    
    this.addImage = true;
    
  }

  aceptar() {
    this.addImage = false;
    this.addQuestion = true;
  }


  onFileSelected(event: any) {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
    } 

    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
    }
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageSrc = reader.result;
      };


      reader.readAsDataURL(file); 

    }

    this.imageSrc = null;

  }

  triggerFileInput() {
    const fileInputButton = document.getElementById('image') as HTMLInputElement;
    fileInputButton.click();
  }

  
  comenzarEncuesta() {


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

    if( this.selectedFile ) {

      let base64Image;

      const reader = new FileReader();

      reader.onload = () => {
          base64Image = reader.result as string;
          this._encuestasService.encuesta.image = base64Image;
              
          this.enviarPeticion();

      };

      reader.readAsDataURL(this.selectedFile); // Convierte el archivo a Base64
  
      
    } else {
               
      this.enviarPeticion();
      

    } 

  }

  enviarPeticion() {

    this._encuestasService.addSurvey(this.titleSurvey).subscribe({
      next: async (response: any) => {

        //console.log(response);

        if (response.encuestaSinCamposExtras.id) {

          this.openModal1('success', 'Se ha creado la encuesta con éxito. Consulta el dashboard para compartirlo o analizar datos')

          this.titleSurvey = '';
          this.comenzar = false;
          this.creando = false;
          this.addQuestion = false;

          this._encuestasService.encuesta = {
            id: '',
            created_at: new Date(),
            nombre: '',
            image: undefined,
            encuestaItem: [] // Array vacío para iniciar sin elementos
          };

          this.imageSrc = null;
          this.selectedFileName = null;
          this.selectedFile =null;
          
        }
        
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

  onOptionChange() {
    document.getElementById('options-trigger')?.classList.toggle('visible')
  }

  selectedOptionFunc(option: string) {
    this.selectedOption = option
    this.activarOptions = true;
    document.getElementById('options-trigger')?.classList.remove('visible')

  }

  escogerQuestion(i: number) {

    this.indexSelected = i;
    this.selected = true;

    this.questionSelected = this._encuestasService.encuesta.encuestaItem[i];

    this.question = this.questionSelected.question;


    switch (this.questionSelected.type) {
      case "TEXT":
        this.selectedOption = "Respuesta texto"
        break;

      case "SELECT":
        this.selectedOption = "Selección de una"
        break;

      case "CHECK":
        this.selectedOption = "Seleccionar una o varias"
        break;

      case "LEVEL":
        this.selectedOption = "Puntuacion"
        break;

    }

     this.questionSelected.type;




    this.responses = this.questionSelected.options || []

    //console.log(this.indexSelected)


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
