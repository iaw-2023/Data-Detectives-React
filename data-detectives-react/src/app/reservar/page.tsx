"use client";
import React, { useState } from "react";
import FirstPage from "./selectEspecialidadPage";
import SecondPage from "./selectProfesionalPage";
import ThirdPage from "./selectFechaTurnoPage";
import FourthPage from "./selectHoraTurnoPage";
import { Especialidad, TurnoDisponible, Profesional_con_especialidad_id, Paciente } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import FifthPage from "./confirmTurnoPage";



const Formulario: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Especialidad | null>();
  const [selectedProfessional, setSelectedProfessional] = useState<Profesional_con_especialidad_id | null>();
  const [selectedFecha, setSelectedFecha] = useState<string | "">();
  const [selectedTurno, setSelectedTurno] = useState<TurnoDisponible | null>();
  const [primeraConsulta, setPrimerConsulta] = useState<boolean>();


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
  
  
  return (
    <div>
      {currentPage === 1 && (
        <FirstPage selectedSpecialty={selectedSpecialty} onSelectSpecialty={handleSelectSpecialty} />
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
      {currentPage === 5 && selectedSpecialty && selectedProfessional && selectedTurno && (
        <FifthPage selectedSpecialty={selectedSpecialty} selectedProfessional={selectedProfessional} selectedTurno={selectedTurno} primeraConsulta onConfirmTurno={handleConfirmTurno} />
      )}
    </div>
  );
};

export default Formulario;
