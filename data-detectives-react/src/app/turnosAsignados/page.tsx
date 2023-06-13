"use client";
import React, { useEffect, useState } from "react";
import InputDNIPacientePage from "../paciente/inputPaciente";
import { Paciente, Turno } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowTurnosAsignadosPage from "./turnosAsignadosPage";


const TurnosAsignadosPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [turnosAsignados, setTurnosAsignados] = useState<Turno[]>([]);

  const handleSelectPaciente = (paciente: Paciente) => {
    setPaciente(paciente);
    setCurrentPage(2);
  };

  return (
    <div>
      {currentPage === 1 && (
        <InputDNIPacientePage onSelectPaciente={handleSelectPaciente} />
      )}
      {currentPage === 2 && paciente!=null && (
        <ShowTurnosAsignadosPage paciente={paciente} turnosAsignados={turnosAsignados} />
      )}
    </div>
  );
};

export default TurnosAsignadosPage;
