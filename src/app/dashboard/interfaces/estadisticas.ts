export interface ResponseEstadisticas {
    question:                string;
    type:                    string;
    opciones:                string[];
    respuestas:              Respuesta[];
    estadisticas:            Estadistica[];
    palabrasMasComunes?:     PalabrasMasComunes[];
    respuestaMasPopular?:    string[];
    respuestaMenosEscogida?: string[];
}

export interface Estadistica {
    respuesta:  string[];
    porcentaje: number;
}

export interface PalabrasMasComunes {
    palabra:    string;
    frecuencia: number;
}

export interface Respuesta {
    email:     null | string;
    respuesta: string[];
}
