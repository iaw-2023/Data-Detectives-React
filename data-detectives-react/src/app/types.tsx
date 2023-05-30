import React from "react";

export interface InputDNIPacienteProps {
    paciente?: Paciente | null;
    onSelectPaciente: (paciente: Paciente) => void;
}

export interface FirstPageProps {
    specialties: Especialidad[];
    selectedSpecialty?: Especialidad | null;
    onSelectSpecialty: (specialty: Especialidad) => void;
}

export interface SecondPageProps {
    selectedSpecialty: Especialidad;
    selectedProfessional?: Profesional_con_especialidad_id | null;
    onSelectedProfessional: (professional_specialty: Profesional_con_especialidad_id) => void;
}

export interface ThirdPageProps {
    selectedProfessional: Profesional_con_especialidad_id;
    onSelectedFecha: (fecha: string) => void;
}

export interface FourthPageProps {
    selectedSpecialty: Especialidad;
    selectedProfessional: Profesional_con_especialidad_id;
    selectedFecha: string;
    selectedTurno?: TurnoDisponible | null;
    onSelectedTurno: (turno: TurnoDisponible) => void;
}

export interface FifthPageProps {
    selectedSpecialty: Especialidad;
    selectedProfessional: Profesional_con_especialidad_id;
    selectedTurno: TurnoDisponible;
    primeraConsulta: boolean;
    paciente: Paciente;
    onConfirmTurno: (turnoAsignado: TurnoDisponible, profesional_especialidad: Profesional_con_especialidad_id, primera_consulta:boolean) => void;
}

export interface SearchPageProps {
    profesional: Profesional | null;
    especialidades: Especialidad_Profesional[];
    selectedEspecialidad: Especialidad_Profesional | null;
    turnosAsignados: TurnoAsignadoProfesional[];
    dni: string;
    setDNI: (dni: string) => void;
    handleSearch: () => void;
    handleEspecialidadChange: (option: Especialidad_Profesional | null) => void;
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
    id: number;
    fecha: string;
    hora: string;
}

export interface TurnoAsignadoProfesional {
    id: number;
    turno: Turno;
    paciente: Paciente;
    fecha_asignacion: Date;
    primer_consulta: Boolean;
}

export interface Profesional_con_especialidad_id {
    profesional: Profesional;
    id_profesional_especialidad: number;
}

export interface Profesional_Especialidad {
    id: number;
    profesional: Profesional;
    especialidad: Especialidad;
    matricula: string;
}
  
export interface Turno {
    id: number;
    fecha: string;
    hora: string;
    profesional_especialidad: Profesional_Especialidad;
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

  export interface TurnoDisponibleResponse {
    data: TurnoDisponible[];
  }