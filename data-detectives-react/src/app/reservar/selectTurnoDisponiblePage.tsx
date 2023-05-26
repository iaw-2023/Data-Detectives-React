"use client";
import React, { useEffect, useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, ProgressBar } from "react-bootstrap";
import { ThirdPageProps, TurnoDisponible, Especialidad, Profesional } from '../types';

const ThirdPage: React.FC<ThirdPageProps> = ({ selectedSpecialty, selectedProfessional, onNext }) => {
  const [turnosDisponibles, setTurnosDisponibles] = useState<TurnoDisponible[]>([]);
  const [selectedTurno, setSelectedTurno] = useState<TurnoDisponible | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(3);

  useEffect(() => {
    const fetchTurnosDisponibles = async () => {
      try {
        const response = await fetch(`https://data-detectives-laravel.vercel.app/rest/turnos_disponibles_profesional/1`); 
        const data = await response.json();

        if (Array.isArray(data?.data)) {
          setTurnosDisponibles(data.data);
        } else {
          console.log("La respuesta de la API no contiene un array válido de turnos disponibles:", data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTurnosDisponibles();
  }, []);

  const handleNextPage = () => {
    if (selectedTurno) {
      onNext(selectedTurno);
      setCurrentPage(4);
    } else {
      console.log("Debe seleccionar un turno antes de continuar.");
    }
  };

  return (
    <div>
      <CenteredDiv>
        <ProgressBar animated now={80} />
        <h2>Seleccione un turno para {selectedProfessional.apellido}, {selectedProfessional.nombre}</h2>
        {turnosDisponibles.map((turno) => (
          <div key={`${turno.fecha}-${turno.hora}`}>
          <p>Fecha: {turno.fecha.toString()}</p>
          <p>Hora: {turno.hora.toString()}</p>
          <Button variant="primary" onClick={() => setSelectedTurno(turno)}>
            Seleccionar
          </Button>
        </div>  
        ))}
        <Button variant="primary" className="mt-2" onClick={handleNextPage}>
          Siguiente
        </Button>
      </CenteredDiv>
    </div>
  );
};

export default ThirdPage;
