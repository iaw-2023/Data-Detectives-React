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
    email: string;
    DNI: number;
}

export interface Especialidad_Profesional {
    especialidad: {
      id: number;
      nombre: string;
      descripcion: string;
    };
    id_profesional_especialidad: number;
}

export interface ApiResponseEspecialidadesProfesional {
    data: Especialidad_Profesional[];
}
  
export  interface FormData {
    name: string;
    email: string;
}

export  interface TurnoDisponible {
    fecha: Date;
    hora: Date;
}

export interface TurnoAsignadoProfesional {


}


  
export interface ProfessionalEspecialidad {
    id: number;
    profesional: Profesional;
    especialidad: Especialidad;
    matricula: string;
  }
  
export interface Turno {
    id: number;
    fecha: string;
    hora: string;
    profesional_especialidad: ProfessionalEspecialidad;
    disponible: boolean;
  }
  
export interface Paciente {
    id: number;
    DNI: number;
    nombre_paciente: string;
    apellido_paciente: string;
    direccion_paciente: string;
    telefono_paciente: string;
    email_paciente: string;
    obra_social: string;
  }
  
export interface TurnoAsignado {
    id: number;
    turno: Turno;
    paciente: Paciente;
    fecha_asignacion: string;
    primera_consulta: boolean;
  }
  
export interface TurnoAsignadoData {
    data: TurnoAsignado[];
  }