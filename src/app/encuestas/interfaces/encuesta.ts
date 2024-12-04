// encuesta.model.ts
export interface Encuesta {
    id?: string;
    created_at?: Date;
    nombre: string;
    image?: string;
    encuestaItem: EncuestaItem[];
}

export interface EncuestaItem {
    id?: string;
    question: string;
    type: "EMAIL"|"TEXT" | "SELECT" | "CHECK" | "LEVEL"; // Tipos restringidos a las opciones del JSON
    options?: string[]; // Opcional, ya que no todos los tipos tienen opciones
}