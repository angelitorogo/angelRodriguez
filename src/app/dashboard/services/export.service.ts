import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  
  constructor() {}

  exportToExcel(data: any, fileName: string, extraData: any): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  
    // 1. Crear la pestaña de Datos Generales
    const generalSheetData = [
      ['Título Encuesta', data.encuestasRespondidas[0].Encuesta.nombre],
      ['Fecha Creación Encuesta', this.formatDate(data.encuestasRespondidas[0].Encuesta.created_at)],
    ];
    const generalSheet = XLSX.utils.aoa_to_sheet(generalSheetData);
    XLSX.utils.book_append_sheet(workbook, generalSheet, 'Datos Generales');
  
    // 2. Crear pestañas para cada pregunta
    const questionsMap = new Map();
  
    // Agrupar respuestas por pregunta
    data.encuestasRespondidas.forEach((response: any) => {
      response.respuestas.forEach((answer: any) => {
        const questionId = answer.EncuestaItem.id;
        if (!questionsMap.has(questionId)) {
          questionsMap.set(questionId, {
            question: answer.EncuestaItem.question,
            type: answer.EncuestaItem.type,
            responses: [],
          });
        }
        questionsMap.get(questionId).responses.push({
          EncuestaRespondidaID: response.id,
          Email: response.email || 'Anónimo',
          Respuesta: answer.respuesta.join(', '),
          FechaRespuesta: this.formatDate(answer.created_at),
        });
      });
    });
  
    let questionIndex = 1;
  
    // Añadir cada pregunta como una pestaña
    questionsMap.forEach((questionData, questionId) => {
      // Obtener estadísticas para la pregunta actual
      const extraQuestionData = extraData.find((q: any) => q.question === questionData.question);
      const statsData = extraQuestionData ? extraQuestionData.estadisticas : [];
      const palabrasComunes = extraQuestionData?.palabrasMasComunes || [];
      const respuestasPopulares = extraQuestionData?.respuestaMasPopular || [];
      const respuestasMenosPopulares = extraQuestionData?.respuestaMenosEscogida || [];
  
      const questionSheetData = [
        ['Pregunta', questionData.question],
        ['Tipo', questionData.type],
        [],
        ['Respuestas'],
        ['Email', 'Respuesta', 'Fecha de Respuesta'], // Encabezados
        ...questionData.responses.map((response: any) => [
          response.Email, response.Respuesta, response.FechaRespuesta,
        ]),
        [],
        ['Estadísticas'],
        ['Respuesta', 'Porcentaje'], // Encabezados de estadísticas
        ...statsData.map((stat: any) => [stat.respuesta.join(', '), stat.porcentaje]),
        [],
        ['Palabras más comunes'],
        ['Palabra', 'Frecuencia'], // Encabezados palabras comunes
        ...palabrasComunes.map((word: any) => [word.palabra, word.frecuencia]),
        [],
        ['Respuesta(s) más popular(es)'],
        ...respuestasPopulares.map((respuesta: any) => [respuesta]),
        [],
        ['Respuesta(s) menos escogida(s)'],
        ...respuestasMenosPopulares.map((respuesta: any) => [respuesta]),
      ];
  
      const worksheet = XLSX.utils.aoa_to_sheet(questionSheetData);
  
      const safeSheetName = `Pregunta ${questionIndex}`;
      XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName);
      questionIndex++;
    });
  
    // Descargar el archivo Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  }
  

  exportToCSV(data: any, fileName: string, extraData: any): void {
    const csvRows: string[] = [];
  
    // 1. Crear cabeceras y datos generales
    csvRows.push('Datos Generales');
    csvRows.push(`Título Encuesta,${data.encuestasRespondidas[0].Encuesta.nombre}`);
    csvRows.push(`Fecha Creación Encuesta,${this.formatDate(data.encuestasRespondidas[0].Encuesta.created_at)}`);
    csvRows.push(''); // Línea vacía para separación
  
    // 2. Crear datos para cada pregunta
    const questionsMap = new Map();
  
    // Agrupar respuestas por pregunta
    data.encuestasRespondidas.forEach((response: any) => {
      response.respuestas.forEach((answer: any) => {
        const questionId = answer.EncuestaItem.id;
        if (!questionsMap.has(questionId)) {
          questionsMap.set(questionId, {
            question: answer.EncuestaItem.question,
            type: answer.EncuestaItem.type,
            responses: [],
          });
        }
        questionsMap.get(questionId).responses.push({
          EncuestaRespondidaID: response.id,
          Email: response.email || 'Anónimo',
          Respuesta: answer.respuesta.join(', '),
          FechaRespuesta: this.formatDate(answer.created_at),
        });
      });
    });
  
    // Generar filas CSV para cada pregunta
    questionsMap.forEach((questionData, questionId) => {
      // Obtener estadísticas para la pregunta actual
      const extraQuestionData = extraData.find((q: any) => q.question === questionData.question);
      const statsData = extraQuestionData ? extraQuestionData.estadisticas : [];
      const palabrasComunes = extraQuestionData?.palabrasMasComunes || [];
      const respuestasPopulares = extraQuestionData?.respuestaMasPopular || [];
      const respuestasMenosPopulares = extraQuestionData?.respuestaMenosEscogida || [];
  
      // Pregunta y tipo
      csvRows.push(`Pregunta:,${questionData.question}`);
      csvRows.push(`Tipo:,${questionData.type}`);
      csvRows.push('');
  
      // Respuestas
      csvRows.push('Respuestas');
      csvRows.push('Email,Respuesta,Fecha de Respuesta'); // Encabezados
      questionData.responses.forEach((response: any) => {
        csvRows.push(`${response.Email},${response.Respuesta},${response.FechaRespuesta}`);
      });
      csvRows.push('');
  
      // Estadísticas
      csvRows.push('Estadísticas');
      csvRows.push('Respuesta,Porcentaje');
      statsData.forEach((stat: any) => {
        csvRows.push(`${stat.respuesta.join(' ')},${stat.porcentaje}`);
      });
      csvRows.push('');
  
      // Palabras más comunes
      if (palabrasComunes.length > 0) {
        csvRows.push('Palabras más comunes');
        csvRows.push('Palabra,Frecuencia');
        palabrasComunes.forEach((word: any) => {
          csvRows.push(`${word.palabra},${word.frecuencia}`);
        });
        csvRows.push('');
      }
  
      // Respuestas más populares
      if (respuestasPopulares.length > 0) {
        csvRows.push('Respuesta(s) más popular(es)');
        respuestasPopulares.forEach((respuesta: any) => {
          csvRows.push(`${respuesta}`);
        });
        csvRows.push('');
      }
  
      // Respuestas menos escogidas
      if (respuestasMenosPopulares.length > 0) {
        csvRows.push('Respuesta(s) menos escogida(s)');
        respuestasMenosPopulares.forEach((respuesta: any) => {
          csvRows.push(`${respuesta}`);
        });
        csvRows.push('');
      }
    });
  
    // Agregar BOM para UTF-8
    const csvContent = '\uFEFF' + csvRows.join('\n'); // Prefijo BOM
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    // Descargar el archivo
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  exportToJSON(data: any, fileName: string, extraData: any): void {
    // Estructura del JSON
    const exportData: any = {
      datosGenerales: {
        tituloEncuesta: data.encuestasRespondidas[0].Encuesta.nombre,
        fechaCreacionEncuesta: this.formatDate(data.encuestasRespondidas[0].Encuesta.created_at),
      },
      preguntas: [],
    };
  
    // Agrupar respuestas por pregunta
    const questionsMap = new Map();
    data.encuestasRespondidas.forEach((response: any) => {
      response.respuestas.forEach((answer: any) => {
        const questionId = answer.EncuestaItem.id;
        if (!questionsMap.has(questionId)) {
          questionsMap.set(questionId, {
            question: answer.EncuestaItem.question,
            type: answer.EncuestaItem.type,
            responses: [],
          });
        }
        questionsMap.get(questionId).responses.push({
          EncuestaRespondidaID: response.id,
          Email: response.email || 'Anónimo',
          Respuesta: answer.respuesta.join(', '),
          FechaRespuesta: this.formatDate(answer.created_at),
        });
      });
    });
  
    // Construir estructura de preguntas con estadísticas
    questionsMap.forEach((questionData, questionId) => {
      const extraQuestionData = extraData.find((q: any) => q.question === questionData.question);
      const statsData = extraQuestionData ? extraQuestionData.estadisticas : [];
      const palabrasComunes = extraQuestionData?.palabrasMasComunes || [];
      const respuestasPopulares = extraQuestionData?.respuestaMasPopular || [];
      const respuestasMenosPopulares = extraQuestionData?.respuestaMenosEscogida || [];
  
      const questionExportData = {
        pregunta: questionData.question,
        tipo: questionData.type,
        respuestas: questionData.responses,
        estadisticas: statsData,
        palabrasMasComunes: palabrasComunes,
        respuestasMasPopulares: respuestasPopulares,
        respuestasMenosEscogidas: respuestasMenosPopulares,
      };
  
      exportData.preguntas.push(questionExportData);
    });
  
    // Crear el blob con los datos JSON
    const jsonContent = JSON.stringify(exportData, null, 2); // `null, 2` para indentar
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  
    // Descargar el archivo
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Método para formatear fechas
  formatDate(date: string): string {
      const formattedDate = new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      });
      return formattedDate;
  }

}
