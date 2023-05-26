import React from "react";

export interface FirstPageProps {
    specialties: Especialidad[];
    selectedSpecialty?: Especialidad | null;
    onSelectSpecialty: (specialty: Especialidad) => void;
}

export interface SecondPageProps {
    selectedSpecialty: Especialidad;
    selectedProfessional?: Profesional | null;
    onSelectedProfessional: (professional: Profesional) => void;
}

export interface ThirdPageProps {
    selectedSpecialty: Especialidad;
    selectedProfessional: Profesional;
    selectedTurno?: TurnoDisponible | null;
    onNext: (turno: TurnoDisponible) => void;
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

export  interface TurnoDisponible {
    fecha: Date;
    hora: Date;
}