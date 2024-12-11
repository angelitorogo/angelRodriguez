import { FormControl } from "@angular/forms"

export interface User {
    id: string,
    fullname: string,
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


  export interface MailSendForm {
    email: FormControl<string>,
    nombre: FormControl<string>,
    apellido: FormControl<string>,
    asunto: FormControl<string>,
    text: FormControl<string>,
    extra_field: FormControl<string|null>
  }