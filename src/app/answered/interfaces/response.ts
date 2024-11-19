
  
export interface  responseEncuesta {
    encuestaId?: string,
    email: string,
    respuestas: responseEncuestaItem[] 
}

export interface responseEncuestaItem {
    encuestaItemId: string;
    respuesta: string[];
}