"use client";
import React, { useEffect, useState } from "react";
import InputDNIPacientePage from "./inputPaciente";
import FirstPage from "./selectEspecialidadPage";
import SecondPage from "./selectProfesionalPage";
import ThirdPage from "./selectFechaTurnoPage";
import FourthPage from "./selectHoraTurnoPage";
import { Especialidad, TurnoDisponible, Profesional_con_especialidad_id, Paciente } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import FifthPage from "./confirmTurnoPage";


const Formulario: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Especialidad | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Profesional_con_especialidad_id | null>(null);
  const [selectedFecha, setSelectedFecha] = useState<string | "">();
  const [selectedTurno, setSelectedTurno] = useState<TurnoDisponible | null>(null);
  const [primeraConsulta, setPrimerConsulta] = useState<boolean>();

  const handleSelectPaciente = (paciente: Paciente) => {
    setPaciente(paciente);
    setCurrentPage(1);
  };

  const handleSelectSpecialty = (specialty: Especialidad) => {
    setSelectedSpecialty(specialty);
    setCurrentPage(2);
  };

  const handleSelectProfessional = (professional: Profesional_con_especialidad_id) => {
    setSelectedProfessional(professional);
    setCurrentPage(3);
  };

  const handleSelectFecha = (fecha: string) => {
    setSelectedFecha(fecha);
    setCurrentPage(4);
  };

  const handleSelectTurno = (turno: TurnoDisponible) => {
    setSelectedTurno(turno);
    setCurrentPage(5);
  };

  const handleConfirmTurno = (turno: TurnoDisponible, profesional_especialidad:Profesional_con_especialidad_id, primeraConsulta:boolean) => {
    setPrimerConsulta(primeraConsulta);
  };

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch("https://data-detectives-laravel.vercel.app/rest/especialidades");
        const data = await response.json();
        if (Array.isArray(data?.data)) {
          setEspecialidades(data.data);
          setSelectedSpecialty(data.data[0] || null);
        } else {
          console.log("La respuesta de la API no contiene un array válido de especialidades:", data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchEspecialidades();
  }, []);
  
  return (
    <div>
      {currentPage === 0 && (
        <InputDNIPacientePage onSelectPaciente={handleSelectPaciente} />
      )}
      {currentPage === 1 && (
        <FirstPage specialties={especialidades} selectedSpecialty={selectedSpecialty} onSelectSpecialty={handleSelectSpecialty} />
      )}
      {currentPage === 2 && selectedSpecialty && (
        <SecondPage selectedSpecialty={selectedSpecialty} onSelectedProfessional={handleSelectProfessional} selectedProfessional={selectedProfessional} />
      )}
      {currentPage === 3 && selectedProfessional && (
        <ThirdPage  selectedProfessional={selectedProfessional} onSelectedFecha={handleSelectFecha} />
      )}
      {currentPage === 4 && selectedSpecialty && selectedProfessional && selectedFecha && (
        <FourthPage selectedSpecialty={selectedSpecialty} selectedProfessional={selectedProfessional} selectedFecha={selectedFecha} onSelectedTurno={handleSelectTurno} />
      )}
      {currentPage === 5 && selectedSpecialty && selectedProfessional && selectedTurno && paciente && (
        <FifthPage paciente={paciente} selectedSpecialty={selectedSpecialty} selectedProfessional={selectedProfessional} selectedTurno={selectedTurno} primeraConsulta onConfirmTurno={handleConfirmTurno} />
      )}
    </div>
  );
};

export default Formulario;
