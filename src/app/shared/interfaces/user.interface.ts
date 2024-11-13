export interface User {
    id: string,
    name: string,
    surname: string,
    email: string,
    role: string,
    image: string,
    telephone: string,
    active:boolean,
    theme: number,
    language: string,
    created_at: Date,
    updated_at: Date
  }