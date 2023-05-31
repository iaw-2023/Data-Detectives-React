"use client";
import React, { useEffect, useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, ProgressBar } from "react-bootstrap";
import { ThirdPageProps, TurnoDisponible, TurnoDisponibleResponse } from '../types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Container from "../container-fondo";
import Card from '../card';
import { useRouter } from "next/navigation";

const ThirdPage: React.FC<ThirdPageProps> = ({ selectedProfessional, onSelectedFecha }) => {
  const [turnosDisponibles, setTurnosDisponibles] = useState<TurnoDisponible[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTurnosDisponibles = async () => {
      try {
        const id_especialidad = selectedProfessional.id_profesional_especialidad;
        const response = await fetch(`https://data-detectives-laravel-git-new-api-data-detectives.vercel.app/rest/turnos_disponibles_profesional/${id_especialidad}`); 
        const data: TurnoDisponibleResponse = await response.json();

        if (Array.isArray(data?.data)) {
          setTurnosDisponibles(data.data);
          const dates = data.data.map((turno) => {
            const [year, month, day] = turno.fecha.split("-");
            return new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0);
          });
          
          setAvailableDates(dates);
          console.log(data.data);
          console.log(dates);
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
  
  const getSelectedDate = () => {
    if (selectedOption) {
      const [year, month, day] = selectedOption.split("-");
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    return null;
  };

  const handleNextPage = () => {
    if (selectedOption) {
      onSelectedFecha(selectedOption);
    } else {
      console.log("Debe seleccionar un turno antes de continuar.");
    }
    console.log(selectedOption);
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === "year" || view === "decade" || view === "century") {
      console.log("estoy en vista año, o lo que sea");
      return false;
    }

    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return !availableDates.some((availableDate) => {
      const availableDateCopy = new Date(availableDate.getFullYear(), availableDate.getMonth(), availableDate.getDate());
      return currentDate.getTime() === availableDateCopy.getTime();
    });
  };

  const handleBack = () => {
    router.back()
  };

  return (
    <Container>
      <ProgressBar striped variant="info" animated now={60} />
      <Button className="btn mt-2" variant="outline-info" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv>
        <Card>
          <h3 className='text-white text-center mt-3'>Seleccione un turno para {selectedProfessional.profesional.apellido}, {selectedProfessional.profesional.nombre}</h3>
          <CenteredDiv>
            <Calendar
            tileDisabled={tileDisabled}
            onChange={handleSelectTurno as any}
            value={getSelectedDate()}
            />
          </CenteredDiv>
          <Button variant="dark" className="mt-2" onClick={handleNextPage}>
            Siguiente
          </Button>
        </Card>
      </CenteredDiv>
    </Container>
  );
};

export default ThirdPage;
