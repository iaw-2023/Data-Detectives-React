"use client";
import React, { useEffect, useState } from "react";
import CenteredDiv from "../reservar/centeredDiv";
import Button from 'react-bootstrap/Button';
import {  ApiResponseEspecialidadesProfesional, ApiResponseTurnosProfesional, Especialidad_Profesional, ShowTurnosProfesionalProps, TurnoAsignadoProfesional } from '../types';
import Container from "../container-fondo";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import { Alert, Table } from "react-bootstrap";
import CardTurnosAsignados from "../cardTurnosAsignados";
import CenteredDivCalendar from "../centeredDivTable";
import AppSpinner from "../app-spinner";
import IconTooltip from "../icon-tooltip";

const ShowTurnoProfesional: React.FC<ShowTurnosProfesionalProps> = ({ profesional }) => {

  const [especialidadesProfesional, setEspecialidadesProfesional] = useState<Especialidad_Profesional[]>([]);
  const [turnosAsignados, setTurnosAsignados] = useState<TurnoAsignadoProfesional[]>([]);
  const [turnosAsignadosFecha, setTurnosAsignadosFecha] = useState<TurnoAsignadoProfesional[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [tieneTurnos, setTieneTurnos] = useState<boolean>(true);
  const [fetchRealizado, setFetch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();  

  const handleBack = () => {
    router.back()
  };
     
  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === "year" || view === "decade" || view === "century") {
      return false;
    }
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return !availableDates.some((availableDate) => {
        const availableDateCopy = new Date(availableDate.getFullYear(), availableDate.getMonth(), availableDate.getDate());
        return currentDate.getTime() === availableDateCopy.getTime();
      });
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
        setLoading(true);
        var id_profesional = profesional.id;
        const response_specialities = await fetch(`https://data-detectives-laravel.vercel.app/rest/profesional_especialidades/${id_profesional}`);
        const data_specialities = await response_specialities.json();
        
        if (response_specialities.ok) {
          const apiResponse: ApiResponseEspecialidadesProfesional = data_specialities;
          setEspecialidadesProfesional(apiResponse.data);
          await searchTurnos(apiResponse.data);
          setTieneTurnos(true);
          setLoading(false);
        }
        else {
          setTieneTurnos(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchEspecialidadesProfesional();
    setFetch(true);
  }, [profesional.id]);
  
  const searchTurnos = async (especialidades: Especialidad_Profesional[]) => {
    setLoading(true);
    const newTurnosAsignados: TurnoAsignadoProfesional[] = [];
    for (const especialidad of especialidades) {
      const turnosAsignados = await fetchTurnosAsignados(especialidad);
      if (turnosAsignados) {
        for (const turnoAsignado of turnosAsignados) {
          newTurnosAsignados.push(turnoAsignado);
        }
      }
    }
    setLoading(false);
  
    if (Array.isArray(newTurnosAsignados)) {
      setTurnosAsignados(newTurnosAsignados);
      const dates = newTurnosAsignados.map((turno) => {
        const [year, month, day] = turno.turno.fecha.split("-");
        return new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0);
      });
      setAvailableDates(dates);
    }
  };

  const fetchTurnosAsignados = async (especialidad: Especialidad_Profesional) => {
    try {
      setLoading(true);
      const response_turnos = await fetch(
        `https://data-detectives-laravel.vercel.app/rest/turnos_asignados_profesional/${especialidad.id_profesional_especialidad}`
      );
      if (response_turnos.ok) {
        const data_turnos = await response_turnos.json();
        const apiResponse : ApiResponseTurnosProfesional = data_turnos;
        return apiResponse.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  useEffect(() => {
    if (fetchRealizado && turnosAsignados.length === 0){
      setTieneTurnos(false);
    }
  }, [turnosAsignados])
  
  const handleSelectAsignados = (date: Date) => {
    const dateFormat = date ? formatDate(date) : '';
    setSelectedOption(dateFormat);
      
    const filteredTurnos = turnosAsignados.filter(
      (turno) => turno.turno.fecha === dateFormat
    );
      
    setTurnosAsignadosFecha(filteredTurnos.sort((a, b) => {
      return a.turno.hora.localeCompare(b.turno.hora);
    }))
  }
      
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const tooltipMessage = "Para ver los turnos asignados, primero deberás seleccionar alguno de los días marcados en el calendario";


  return (
    <Container>
      <Button className="btn mt-2" variant="outline-dark" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv>
      <CardTurnosAsignados>
      <h3 className='text-white text-center mt-3'>Turnos asignados para {profesional.apellido}, {profesional.nombre}</h3>
      { !turnosAsignadosFecha && (  
           <IconTooltip tooltipMessage={tooltipMessage}/> )
        }
        <CenteredDivCalendar>
          <Calendar
            className="text-dark"
            tileDisabled={tileDisabled}
            onChange={handleSelectAsignados as any}
            value={getSelectedDate()}
          />
        </CenteredDivCalendar>      
        {!tieneTurnos ? 
            ( <Alert variant="info" style={{ width: "40rem" }}>No hay turnos asignados.</Alert> ) : 
            ( loading ? 
                      ( <AppSpinner loading={loading}></AppSpinner> ) :
                      ( <Table striped bordered hover className="table-responsive-s">
                        <thead className="bg-white">
                          <tr>
                            <th className="text-dark">Especialidad</th>
                            <th className="text-dark">Hora</th>
                            <th className="text-dark">Paciente</th>
                            <th className="text-dark">Primer consulta</th>
                          </tr>
                        </thead>
                        <tbody>
                          {turnosAsignadosFecha.map((turno) => (
                            <tr key={turno.id}>
                              <td className="text-white">{turno.turno.profesional_especialidad.especialidad.nombre}</td>
                              <td className="text-white">{turno.turno.hora}</td>
                              <td className="text-white">{turno.paciente.apellido_paciente + " " + turno.paciente.nombre_paciente}</td>
                              <td className="text-white">{turno.primer_consulta ? "Si" : "No"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )
            )
        }
      </CardTurnosAsignados>
    </CenteredDiv>
  </Container>
    
  );
};


export default ShowTurnoProfesional;