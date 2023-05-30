"use client";

import React, { useState, useEffect } from 'react';
import { Profesional, Especialidad_Profesional, TurnoAsignadoProfesional, SearchPageProps } from '../types';
/*import FullCalendar from "@fullcalendar/react";
import Select, { ActionMeta } from 'react-select';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ValueType } from 'tailwindcss/types/config';*/



const SearchPage: React.FC<SearchPageProps> = () => {
  const [dni, setDNI] = useState('');
  const [profesional, setProfesional] = useState<Profesional | null>(null);
  const [especialidades, setEspecialidades] = useState<Especialidad_Profesional[]>([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<Especialidad_Profesional>(especialidades[0]);
  const [turnosAsignados, setTurnosAsignados] = useState<TurnoAsignadoProfesional[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://data-detectives-laravel-1kywjtt0d-data-detectives.vercel.app/rest/profesionalPorDNI/${dni}`);
      const data = await response.json() as Profesional;
      setProfesional(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEspecialidadChange = async (option: Especialidad_Profesional, actionMeta: ActionMeta<Especialidad_Profesional>) => {
    setSelectedEspecialidad(option);  
    if (option) {
      try {
        const response = await fetch(`https://data-detectives-laravel-e5p4ga6p5-data-detectives.vercel.app/rest/turnos_asignados_profesional/${option.id_profesional_especialidad}`);
        const data = await response.json() as TurnoAsignadoProfesional[];
        setTurnosAsignados(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://data-detectives-laravel-1kywjtt0d-data-detectives.vercel.app/rest/profesional_especialidades/${profesional?.id}`);
        const data = await response.json() as Especialidad_Profesional[];
        setEspecialidades(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Buscar Profesional por DNI</h1>
      <input type="text" value={dni} onChange={(e) => setDNI(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>

      {profesional && (
        <div>
          <h2>Profesional Encontrado:</h2>
          <p>Nombre: {profesional.nombre}</p>
          <p>Apellido: {profesional.apellido}</p>
          <p>Email: {profesional.email}</p>
        </div>
      )}

      {especialidades.length > 0 && (
        <div>
          <h2>Especialidades:</h2>
          <Select
            options={especialidades}
            getOptionLabel={(option: { especialidad: { nombre: any; }; }) => option.especialidad.nombre}
            getOptionValue={(option: { id_profesional_especialidad: { toString: () => any; }; }) => option.id_profesional_especialidad.toString()}
            value={selectedEspecialidad}
            onChange={handleEspecialidadChange}
          />
        </div>
      )}

      {turnosAsignados.length > 0 && (
        <div>
          <h2>Turnos Asignados:</h2>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridWeek"
            events={turnosAsignados.map((turno) => ({
              title: turno.paciente.nombre_paciente,
              start: new Date(turno.turno.fecha + 'T' + turno.turno.hora),
              end: new Date(turno.turno.fecha + 'T' + turno.turno.hora),
            }))}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;

