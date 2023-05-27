"use client";
import React, { useEffect, useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, ProgressBar } from "react-bootstrap";
import { ThirdPageProps, TurnoDisponible, TurnoDisponibleResponse } from '../types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const ThirdPage: React.FC<ThirdPageProps> = ({ selectedProfessional, onSelectedFecha }) => {
  const [turnosDisponibles, setTurnosDisponibles] = useState<TurnoDisponible[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchTurnosDisponibles = async () => {
      try {
        const id_especialidad = selectedProfessional.id_profesional_especialidad;
        const response = await fetch(`https://data-detectives-laravel.vercel.app/rest/turnos_disponibles_profesional/${id_especialidad}`); 
        const data: TurnoDisponibleResponse = await response.json();

        if (Array.isArray(data?.data)) {
          setTurnosDisponibles(data.data);
          const dates = data.data.map((turno) => new Date(turno.fecha));
          setAvailableDates(dates);
        } else {
          console.log("La respuesta de la API no contiene un array válido de turnos disponibles:", data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTurnosDisponibles();
  }, []);

  const handleSelectTurno = (date: Date) => {
    const dateFormat = formatDate(date); 
    console.log(selectedOption);
    setSelectedOption(dateFormat);
  };
  
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  

  const handleNextPage = () => {
    if (selectedOption) {
      onSelectedFecha(selectedOption);
    } else {
      console.log("Debe seleccionar un turno antes de continuar.");
    }
    console.log(selectedOption);
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    return !availableDates.some(
      (availableDate) =>
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate()
    );
  };

  return (
    <div>
      <CenteredDiv>
        <ProgressBar animated now={80} />
        <h2>Seleccione un turno para {selectedProfessional.profesional.apellido}, {selectedProfessional.profesional.nombre}</h2>
        <Calendar
          tileDisabled={tileDisabled}
          onChange={handleSelectTurno as any}
          value={selectedOption ? new Date(selectedOption) : null}
        />
        <Button variant="primary" className="mt-2" onClick={handleNextPage}>
          Siguiente
        </Button>
      </CenteredDiv>
    </div>
  );
};

export default ThirdPage;
