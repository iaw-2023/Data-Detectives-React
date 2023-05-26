"use client";

import React, { useState, useEffect, useRef } from 'react';
import SearchInput from './inputDNI';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import CenteredDiv from '../reservar/centeredDiv';
import { Profesional, Especialidad_Profesional, ApiResponseEspecialidadesProfesional, TurnoAsignadoProfesional } from '../types';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';



const MainComponent: React.FC = () => {
  const [searchProfessionalResult, setSearchProfesionalResult] = useState<Profesional| null>(null);
  const [searchSpecialitiesResult, setSearchSpecialitiesResult] = useState<Especialidad_Profesional[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Especialidad_Profesional | undefined>(searchSpecialitiesResult[0]);
  const [searchTurnosResult, setSearchTurnosResult] = useState<TurnoAsignadoProfesional| null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
 
  
  const handleSearch = async (value: string) => {
    try {
      const response_professional = await fetch(
        `https://data-detectives-laravel-1kywjtt0d-data-detectives.vercel.app/rest/profesionalPorDNI/${value}`
      );
      const data_professional = await response_professional.json();

      if (response_professional.ok) {
        setSearchProfesionalResult(data_professional.data);
        
        var id_profesional = searchProfessionalResult?.id;
        const response_specialities = await fetch(
          `https://data-detectives-laravel-e5p4ga6p5-data-detectives.vercel.app/rest/profesional_especialidades/${id_profesional}`
        );
        const data_specialities = await response_specialities.json();
        if (response_specialities.ok) {
          const apiResponse: ApiResponseEspecialidadesProfesional = data_specialities;
          setSearchSpecialitiesResult(apiResponse.data);
        }
        else { console.log("La respuesta de la API no contiene un array válido de especialidades del profesional:", data_professional);
        }     
      } else {
        console.log("La respuesta de la API no contiene un array válido de profesional:", data_professional);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSelectSpecialty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const option = searchSpecialitiesResult.find((specialty) => specialty.especialidad.nombre === selectedValue);
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
  
 /* useEffect(() => {
    if (selectedSpecialty && !selectedSpecialty) {
      setSelectedOption(selectedSpecialty);
    }
  }, [selectedSpecialty]);*/
  
  async function onSelectSpecialty(specialty: Especialidad_Profesional) {
    const response_turnos = await fetch(
      `https://data-detectives-laravel-1kywjtt0d-data-detectives.vercel.app/rest/turnos_asignados_profesional/${specialty.id_profesional_especialidad}`
    );
    const data_turnos = await response_turnos.json();

    if (response_turnos.ok) {
      setSearchProfesionalResult(data_turnos.data);
  }
}

useEffect(() => {
  const calendarEl = calendarRef.current;
  if (calendarEl) {
    const calendar = new Calendar(calendarEl, {
      plugins: [listPlugin], // Agrega aquí el plugin listPlugin
      initialView: 'list', // Establece la vista inicial como 'list'
      // Resto de las opciones de configuración del calendario
    });

    calendar.render();
  }
}, []);


  return (
    <><div>
    <CenteredDiv> 
      <SearchInput onSearch={handleSearch} />
      {searchProfessionalResult && (
        <div>
          <p>ID: {searchProfessionalResult.id}</p>
          <p>DNI: {searchProfessionalResult.DNI}</p>
          <p>Nombre: {searchProfessionalResult.nombre}</p>
          <p>Apellido: {searchProfessionalResult.apellido}</p>
          <p>Email: {searchProfessionalResult.email}</p>
        </div>)}
      <div>
      <Form.Select value={selectedSpecialty ? selectedSpecialty.especialidad.nombre : ""}
          onChange={handleSelectSpecialty}>
          {searchSpecialitiesResult.map((specialty) => (          
            <option key={specialty.especialidad.id} value={specialty.especialidad.nombre}>
              {specialty.especialidad.nombre}
            </option>
          ))}
        </Form.Select>
        <Button variant="primary" className="mt-2" onClick={handleDiary}>
          Ver agenda
        </Button>
        </div>
    
        <div ref={calendarRef}></div>

       
        </CenteredDiv>
      </div>
       </>
  );
}
export default MainComponent;
