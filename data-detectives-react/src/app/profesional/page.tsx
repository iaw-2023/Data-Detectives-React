"use client";

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import CenteredDiv from '../reservar/centeredDiv';
import { Profesional, Especialidad_Profesional, ApiResponseEspecialidadesProfesional, TurnoAsignadoProfesional } from '../types';
import InputDNIProfesional from "./inputDNIProfesional";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const MainComponent: React.FC = () => {
  const [profesional, setProfesional] = useState<Profesional| null>(null);
  const [especialidadesProfesional, setEspecialidadesProfesional] = useState<Especialidad_Profesional[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Especialidad_Profesional | undefined>(especialidadesProfesional[0]);
  const [turnosAsignados, setTurnosAsignados] = useState<TurnoAsignadoProfesional[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>();

  
  const handleSearchProfesional = (profesional: Profesional) => {
    setProfesional(profesional);
    console.log(profesional);
    searchEspecialidades();
  }
  
  async function searchEspecialidades () {
    var id_profesional = profesional?.id;
    console.log(id_profesional);
    const response_specialities = await fetch(
      `https://data-detectives-laravel-e5p4ga6p5-data-detectives.vercel.app/rest/profesional_especialidades/${id_profesional}`
    );
    const data_specialities = await response_specialities.json();
    console.log(data_specialities);

    if (response_specialities.ok) {
      const apiResponse: ApiResponseEspecialidadesProfesional = data_specialities;
      setEspecialidadesProfesional(apiResponse.data);  
      console.log(especialidadesProfesional);
    }; 
  }
    
   
  const handleSelectSpecialty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const option = especialidadesProfesional.find((specialty) => specialty.especialidad.nombre === selectedValue);
    if (option) {
      setSelectedSpecialty(option);
    }   
  };

  const handleDiary = () => {
    console.log(selectedSpecialty);
    if (selectedSpecialty) {
      onSelectSpecialty(selectedSpecialty);
    }
  }; 
  
  async function onSelectSpecialty(specialty: Especialidad_Profesional) {
    const response_turnos = await fetch(
      `https://data-detectives-laravel-1kywjtt0d-data-detectives.vercel.app/rest/turnos_asignados_profesional/${specialty.id_profesional_especialidad}`
    );
    const data_turnos = await response_turnos.json();

    if (response_turnos.ok) {
      setTurnosAsignados(data_turnos.data);
  }
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
  const fetchEspecialidades = async () => {
      var id_profesional = profesional?.id;
      const response_specialities = await fetch(
        `https://data-detectives-laravel-e5p4ga6p5-data-detectives.vercel.app/rest/profesional_especialidades/${id_profesional}`
      );
      const data_specialities = await response_specialities.json();
      if (response_specialities.ok) {
        const apiResponse: ApiResponseEspecialidadesProfesional = data_specialities;
        setEspecialidadesProfesional(apiResponse.data);           
      }; 
    }
      fetchEspecialidades();
  },
  []);

  return (
    <><div>
    <CenteredDiv> 
      <InputDNIProfesional onSelectProfesional={handleSearchProfesional} />
      <div>
      <Form.Select value={selectedSpecialty ? selectedSpecialty.especialidad.nombre : ""}
          onChange={handleSelectSpecialty}>
          {especialidadesProfesional.map((specialty) => (          
            <option key={specialty.especialidad.id} value={specialty.especialidad.nombre}>
              {specialty.especialidad.nombre}
            </option>
          ))}
        </Form.Select>
        <Button variant="primary" className="mt-2" onClick={handleDiary}>
          Ver agenda
        </Button>
        </div>
        <Calendar
          tileDisabled={tileDisabled}
          onChange={handleSelectAsignados as any}
          value={getSelectedDate()}
        />
           
        </CenteredDiv>
      </div>
       </>
  );
}

export default MainComponent;

