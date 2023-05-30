"use client";
import React, { useEffect, useState } from "react";
import InputDNIPacientePage from "../paciente/inputPaciente";
import { Paciente, TurnoAsignado } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import TurnosAsignadosPacientePage from "./turnosAsignadosPage";


const PageTurnosAsignados: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [paciente, setPaciente] = useState<Paciente>();
  const [turnosAsignados, setTurnosAsignados] = useState<TurnoAsignado[]>();

  const handleSelectPaciente = (paciente: Paciente) => {
    setPaciente(paciente);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchTurnosAsignados = async () => {
      try {
        const response = await fetch(`https://data-detectives-laravel.vercel.app/rest/turnos_asignados_paciente/${paciente.id}`);
        const data = await response.json();
        if (Array.isArray(data?.data)) {
          setTurnosAsignados(data.data);
        } else {
          console.log("La respuesta de la API no contiene un array válido de especialidades:", data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchTurnosAsignados();
  }, []);

  return (
    <div>
      {currentPage === 0 && (
        <InputDNIPacientePage onSelectPaciente={handleSelectPaciente} />
      )}
      {currentPage === 1 && turnosAsignados !== null && (
        <TurnosAsignadosPacientePage turnosAsignados={turnosAsignados} paciente={paciente} />
      )}
    </div>
  );
};

export default PageTurnosAsignados;
