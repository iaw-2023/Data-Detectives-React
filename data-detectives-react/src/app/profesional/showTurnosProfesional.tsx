"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CenteredDiv from "../reservar/centeredDiv";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {  ApiResponseEspecialidadesProfesional, ApiResponseTurnosProfesional, Especialidad_Profesional, ShowTurnosProfesionalProps, TurnoAsignadoProfesional } from '../types';
import Container from "../container-fondo";
import { useRouter } from "next/navigation";
import Card from '../card';
import Calendar from "react-calendar";
import CardComponent from "../card";
import { ListGroup, Table } from "react-bootstrap";

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
      `https://data-detectives-laravel-git-new-api-data-detectives.vercel.app/rest/turnos_asignados_profesional/${especialidad.id_profesional_especialidad}`
    );
    const data_turnos = await response_turnos.json();
    if (response_turnos.ok) {
      const apiResponse : ApiResponseTurnosProfesional = data_turnos;
      return apiResponse.data;
    }
    return null;
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
      
        const filteredTurnos = turnosAsignados.filter(
          (turno) => turno.turno.fecha === dateFormat
        );
      
        setTurnosAsignados (filteredTurnos.sort((a, b) => {
          return a.turno.hora.localeCompare(b.turno.hora);
        }))
      }
      
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
        const response_specialities = await fetch(`https://data-detectives-laravel-git-new-api-data-detectives.vercel.app/rest/profesional_especialidades/${id_profesional}`);
        const data_specialities = await response_specialities.json();
  
        if (response_specialities.ok) {
          const apiResponse: ApiResponseEspecialidadesProfesional = data_specialities;
          setEspecialidadesProfesional(apiResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchEspecialidadesProfesional();
  }, []);
  
  useEffect(() => {
    if (especialidadesProfesional.length > 0) {
      const searchTurnos = async () => {
        const newTurnosAsignados: TurnoAsignadoProfesional[] = [];
        console.log("espe", especialidadesProfesional);
        for (const especialidad of especialidadesProfesional) {
          const turnosAsignados = await fetchTurnosAsignados(especialidad);
          if (turnosAsignados)
           {
           for (const turnoAsignado of turnosAsignados)
              {
                newTurnosAsignados.push(turnoAsignado);              
              }
            console.log("turnos asignadosss: " + especialidad.especialidad.nombre, turnosAsignados);
           }
          }
  
        if (Array.isArray(newTurnosAsignados)) {
          setTurnosAsignados(newTurnosAsignados);
          const dates = newTurnosAsignados.map((turno) => {
            const [year, month, day] = turno.turno.fecha.split("-");
            return new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0);
          });
          setAvailableDates(dates);
          console.log("fechas asignadas: ", dates);
        }
      };
      searchTurnos();
    }
  }, [especialidadesProfesional]);

  return (
    <Container>
      
      <Button className="btn mt-2" variant="outline-info" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv>
      <CardComponent>
        <div className="text-center mb-3"> {/* Centrar el calendario y agregar margen inferior */}
          <Calendar
            tileDisabled={tileDisabled}
            onChange={handleSelectAsignados as any}
            value={getSelectedDate()}
          />
        </div>
        <div className="table-container table-hover flex-fill"> {/* Contenedor de la tabla con separación */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-white">Especialidad</th>
                <th className="text-white">Hora</th>
                <th className="text-white">Paciente</th>
                <th className="text-white">Primer consulta</th>
              </tr>
            </thead>
            <tbody>
              {turnosAsignados.map((turno) => (
                <tr key={turno.id}>
                  <td className="text-white">{turno.turno.profesional_especialidad.especialidad.nombre}</td>
                  <td className="text-white">{turno.turno.hora}</td>
                  <td className="text-white">{turno.paciente.apellido_paciente + " " + turno.paciente.nombre_paciente}</td>
                  <td className="text-white">{turno.primer_consulta ? "Si" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardComponent>
    </CenteredDiv>
  </Container>
    
  );
};


export default ShowTurnoProfesional;