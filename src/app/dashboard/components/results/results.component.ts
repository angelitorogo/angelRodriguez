import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { EncuestaResponse, Respuesta } from '../../interfaces/tabladata';
import { MetadataResponse } from '../../interfaces/metadata';
import { EstadisticasService } from '../../services/estadisticas.service';
import { ResponseEstadisticas } from '../../interfaces/estadisticas';
import { A } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit{

  id: string = '';
  page: number = 1;
  items: number = 10;

  

  encuestasRespondidas: EncuestaResponse[] = [];
  metadata: MetadataResponse = {
    totalEncuestasRespondidas: 0,
    lastPage: 0,
    page: 0
  }

  nombreEncuesta: string = '';
  fechaEncuesta!: Date;

  encuestaSeleccionada?: EncuestaResponse;

  estadisticas: ResponseEstadisticas[] = [];
  estadisticaSeleccionada?: ResponseEstadisticas;

  data: any[] = [];
  

  viewVertical: [number, number] = [0, 0];
  viewCheck: [ number, number] = [0, 0];
  viewLevel: [ number, number] = [0, 0];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  @ViewChild('templateToolTip') templateToolTip!: TemplateRef<any>;


  constructor(private _dashboardService: DashboardService, 
              private _route: ActivatedRoute,
              private _stadisticasService: EstadisticasService) {

  }


  ngOnInit(): void {
    
    this.id = this._route.snapshot.paramMap.get('id')!;

  
    this.cargarEncuestasRespondidas(this.id);
    this.cargarEstadisticas(this.id);




  }


  cargarEncuestasRespondidas(id: string) {

    this._dashboardService.loadSurveisRespondedById(id).subscribe({
      next: async (response: any) => {

        
        this.encuestasRespondidas = response.encuestasRespondidas;


        this.metadata = response.metadata;

        this.nombreEncuesta = this.encuestasRespondidas[0].Encuesta.nombre;
        this.fechaEncuesta = this.encuestasRespondidas[0].Encuesta.created_at!;


        this.encuestaSeleccionada = this.encuestasRespondidas[0];
        

        setTimeout(() => {
          document.getElementById('item-1')!.classList.add('activa')
        }, 200);

        //console.log(this.encuestasRespondidas)
        //console.log(this.metadata)
        //console.log(this.encuestaSeleccionada)

      },
      error: (error: any) => {

        console.log('error', error);
     
      }      

    })
  }


  seleccion(i: number, item?: EncuestaResponse) {

    for (let i = 1; i < this.encuestasRespondidas.length + 1; i++) {
      
      document.getElementById(`item-${i}`)?.classList.remove('activa');
      if(document.getElementById(`itemb-${i}`)) {
        document.getElementById(`itemb-${i}`)?.classList.remove('activa');
      }
      
      
    }

    this.encuestaSeleccionada = this.encuestasRespondidas[i];
    setTimeout(() => {
      document.getElementById(`item-${i + 1}`)!.classList.add('activa')
      if(document.getElementById(`itemb-${i}`)) {
        document.getElementById(`itemb-${i}`)?.classList.remove('activa');
      }
    }, 200);

    document.getElementById('container-questions')!.scrollTop = 0;

    

  }


  seleccionPregunta(respuesta: Respuesta, i: number) {

    const ancho = window.innerWidth;
    this.data = [];
    this.estadisticaSeleccionada = this.estadisticas[i];

    if(ancho > 768) {

      switch (this.estadisticaSeleccionada.opciones.length) {
        case 2:
  
          this.viewVertical = [ancho/5, 500]
          
          break;
  
        case 3:
  
          this.viewVertical = [ancho/4, 500]
          
          break;
  
        case 4:
  
          this.viewVertical = [ancho/3, 500]
          
          break;
  
        case 5:
  
          this.viewVertical = [ancho/2, 500]
          
          break;
  
        case 6:
  
          this.viewVertical = [ancho/1.5, 500]
          
          break;
      
        default:

          this.viewVertical = [ancho/1.5, 500]
          
          break;
      }

      this.viewCheck = [ancho/2, 500]
      this.viewLevel = [ancho/2, 500]
      
    } else {

      this.viewVertical=[ancho - ((ancho * 5) / 100), 500]
      this.viewCheck = [ancho - ((ancho * 5) / 100), 400]
      this.viewLevel = [ancho, 400]


    }
    
    
    
    const elements = this.estadisticaSeleccionada.estadisticas;

    for (let x = 0; x < elements.length; x++) {
      const element = elements[x];
      this.data.push({
        name: element.respuesta,
        value: element.porcentaje
      })
    }

    
  }


  cargarEstadisticas(id: string) {

    this._stadisticasService.loadEstadisticasById(id!).subscribe({
      next: async (response: ResponseEstadisticas[]) => {

        this.estadisticas = response;
        //this.estadisticaSeleccionada = response[0];


      },
      error: (error: any) => {

        console.log('error', error);

        
      }      

    })

  }


}
