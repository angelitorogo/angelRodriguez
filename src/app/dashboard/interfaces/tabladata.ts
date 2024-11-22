import { Encuesta } from "../../encuestas/interfaces/encuesta";

export interface EncuestaResponse {
    id: string;
    created_at: string;
    email: string;
    encuestaId: string;
    Encuesta: Encuesta
    respuestas: Respuesta[];
}
  
export interface Respuesta {
    id: string;
    encuestaItemId: string;
    encuestaRespondidaId: string;
    respuesta: string[];
    created_at: string;
    EncuestaItem: EncuestaItem;
}
  
export interface EncuestaItem {
    id: string;
    question: string;
    type: string;
    options: string[];
    created_at: string;
}
  