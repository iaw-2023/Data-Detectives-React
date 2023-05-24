import React from "react";

export interface SecondPageProps {
    selectedSpecialty: Especialidad;
    onSubmit: (formData: FormData) => void;
    formData: FormData;
}
  
export interface Especialidad {
    id: number;
    nombre: string;
    descripcion: string;
}
  
export  interface Profesional {
    id: number;
    nombre: string;
    apellido: string;
    marticula: string;
    email: string;
}
  
export  interface FormData {
    name: string;
    email: string;
}

export interface FirstPageProps {
    specialties: Especialidad[];
    selectedSpecialty?: Especialidad;
    onNext: (selectedSpecialty: Especialidad) => void; 
}