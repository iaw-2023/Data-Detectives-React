"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CenteredDiv from "../reservar/centeredDiv";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {  ApiResponseEspecialidadesProfesional, Especialidad_Profesional, ShowTurnosProfesionalProps, TurnoAsignadoProfesional } from '../types';
import Container from "../container-fondo";
import { useRouter } from "next/navigation";
import Card from '../card';
import Calendar from "react-calendar";
import CardComponent from "../card";

const ShowTurnoProfesional: React.FC<ShowTurnosProfesionalProps> = ({ profesional }) => {

    const [especialidadesProfesional, setEspecialidadesProfesional] = useState<Especialidad_Profesional[]>([]);
    const [turnosAsignados, setTurnosAsignados] = useState<TurnoAsignadoProfesional[]>([]);
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>();

  const router = useRouter();  

  const handleBack = () => {
    router.back()
  };
  
  const fetchTurnosAsignados = async (especialidad: Especialidad_Profesional) => {
    const response_turnos = await fetch(
      `https://data-detectives-laravel-1kywjtt0d-data-detectives.vercel.app/rest/turnos_asignados_profesional/${especialidad.id_profesional_especialidad}`
    );
    const data_turnos = await response_turnos.json();
    if (response_turnos.ok) {
      return data_turnos.data;
    }
    return null;
  };

  const searchTurnos = async () => {
    const newTurnosAsignados: TurnoAsignadoProfesional[] = [];
    console.log(especialidadesProfesional);
    for (const especialidad of especialidadesProfesional) {
      const turnosAsignados = await fetchTurnosAsignados(especialidad);
      if (turnosAsignados) {
        newTurnosAsignados.concat(turnosAsignados.data);
        console.log("turnos asignadosss", turnosAsignados);
      }
    }
    setTurnosAsignados(newTurnosAsignados);
  };
    
    const tileDisabled = ({ date }: { date: Date }) => {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return !availableDates.some((availableDate) => {
          const availableDateCopy = new Date(availableDate.getFullYear(), availableDate.getMonth(), availableDate.getDate());
          return currentDate.getTime() === availableDateCopy.getTime();
        });
      };
      
      const handleSelectAsignados = (date: Date) => {
        const dateFormat = formatDate(date); 
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
  
  useEffect(() => {
    const fetchEspecialidadesProfesional = async () => {
      try {
        var id_profesional = profesional.id;
        console.log(id_profesional);
        const response_specialities = await fetch(`https://data-detectives-laravel-e5p4ga6p5-data-detectives.vercel.app/rest/profesional_especialidades/${id_profesional}`);
        const data_specialities = await response_specialities.json();

        if (response_specialities.ok) {
          const apiResponse: ApiResponseEspecialidadesProfesional = data_specialities;
          setEspecialidadesProfesional(apiResponse.data);
          searchTurnos();
        }; 
    } catch (error) {
        console.log(error);
      }
    };

    fetchEspecialidadesProfesional();
   
  }, []);

  return (
    <Container>
      <ProgressBar striped variant="info" animated now={20} />
      <Button className="btn mt-2" variant="outline-info" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv> 
      <CardComponent>
        <Calendar
        tileDisabled={tileDisabled}
        onChange={handleSelectAsignados as any}
        value={getSelectedDate()}
        />
      </CardComponent>

      
      </CenteredDiv>
    </Container>
  );
};


export default ShowTurnoProfesional;