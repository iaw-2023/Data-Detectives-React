"use client";
import React, { useEffect, useState } from "react";
import FirstPage from "./selectEspecialidadPage";
import SecondPage from "./selectProfesionalPage";
import ThirdPage from "./selectFechaTurnoPage";
import FourthPage from "./confirmTurnoPage";
import { Especialidad, TurnoDisponible, Profesional_con_especialidad_id } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';

const Formulario: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Especialidad | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Profesional_con_especialidad_id | null>(null);
  const [selectedFecha, setSelectedFecha] = useState<Date | null>(null);
  const [selectedTurno, setSelectedTurno] = useState<TurnoDisponible | null>(null);

  const handleSelectSpecialty = (specialty: Especialidad) => {
    setSelectedSpecialty(specialty);
    setCurrentPage(2);
  };

  const handleSelectProfessional = (professional: Profesional_con_especialidad_id) => {
    setSelectedProfessional(professional);
    setCurrentPage(3);
  };

  const handleSelectFecha = (fecha: Date) => {
    setSelectedFecha(fecha);
    setCurrentPage(4);
  };

  const handleSelectTurno = (turno: TurnoDisponible) => {
    setSelectedTurno(turno);
    setCurrentPage(5);
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
        <FourthPage selectedSpecialty={selectedSpecialty} selectedProfessional={selectedProfessional} selectedFecha={selectedFecha} />
      )}
    </div>
  );
};

export default Formulario;
