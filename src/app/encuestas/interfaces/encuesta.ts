// encuesta.model.ts
export interface Encuesta {
    nombre: string;
    encuestaItem: EncuestaItem[];
}

export interface EncuestaItem {
    question: string;
    type: "TEXT" | "SELECT" | "CHECK" | "LEVEL"; // Tipos restringidos a las opciones del JSON
    options?: string[]; // Opcional, ya que no todos los tipos tienen opciones
}