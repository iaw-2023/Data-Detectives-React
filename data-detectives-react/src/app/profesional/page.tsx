"use client";
import React, { useEffect, useState } from "react";
import CenteredDiv from "../reservar/centeredDiv";
import Button from 'react-bootstrap/Button';
import {  Especialidad_Profesional, TurnoAsignadoProfesional } from '../types';
import Container from "../container-fondo";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import { Table } from "react-bootstrap";
import CardTurnosAsignados from "../cardTurnosAsignados";
import CenteredDivCalendar from "../centeredDivTable";
import AppSpinner from "../app-spinner";
import IconTooltip from "../icon-tooltip";
import AlertWarning from "../alert-warning";
import { useAuth0 } from "@auth0/auth0-react";
import { getTurnosAsignadosProfesional, getUserType } from "../api/api";
import ModalAlert from "../Alert";

const ShowTurnoProfesional: React.FC = () => {

  const [turnosAsignados, setTurnosAsignados] = useState<TurnoAsignadoProfesional[]>([]);
  const [turnosAsignadosFecha, setTurnosAsignadosFecha] = useState<TurnoAsignadoProfesional[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [tieneTurnos, setTieneTurnos] = useState<boolean>(true);
  const [fetchRealizado, setFetch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ messageModal, setMessage ] = useState<string>("");

  const { getAccessTokenSilently } = useAuth0();

  const router = useRouter();

  const { isAuthenticated } = useAuth0();

  const { loginWithPopup } = useAuth0();

  const { user } = useAuth0();
  
  useEffect(() => {
    if (fetchRealizado && turnosAsignados.length === 0){
      setTieneTurnos(false);
    }
  }, [turnosAsignados]);

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
        setFetch(false);
        const searchTurnos = async () => {
          try {
            if (isAuthenticated) {
              setLoading(true);
              const newTurnosAsignados: TurnoAsignadoProfesional[] = [];
              const token = await getAccessTokenSilently(); 
              const userType = await getUserType(token);
              const tipo_usuario = userType.tipo_usuario;
              const turnosAsignadosResponse = await getTurnosAsignadosProfesional(tipo_usuario,token);
              if (turnosAsignadosResponse.message) {
                setLoading(false);
                setMessage(turnosAsignadosResponse.message);
              } else {
                  const turnos = await turnosAsignadosResponse.json();
                  if (Array.isArray(turnos?.data)) {
                    setTieneTurnos(true);
                    setTurnosAsignados(turnos.data);
                    if (turnosAsignados) {
                      for (const turnoAsignado of turnosAsignados) {
                        newTurnosAsignados.push(turnoAsignado);
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
                    }
                  }
                  else {
                    setTieneTurnos(false);
                    setMessage("No hay turnos asignados");
                  }    
                }                
            } else {
              setMessage("Para poder visualizar tu agenda deberás loguearte."); 
              setShowMessage(true);      
              loginWithPopup();
            }            
          }
          catch (error) {
            setMessage("Error al buscar los turnos: "+ error); 
            setShowMessage(true);          
          }
          
        };
  }, [turnosAsignados]);

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
  
  const handleBackModal = () => {
    setShowMessage(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const tooltipMessage = "Para ver los turnos asignados, primero deberás seleccionar alguno de los días marcados en el calendario";


  return (
    <Container>
      <Button className="btn mt-2" variant="outline-dark" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv>
      <ModalAlert show={showMessage} onClose={handleCloseModal} onBack={handleBackModal} message={messageModal}/>
      <CardTurnosAsignados>
      <h3 className='text-white text-center mt-3'>Turnos asignados para {user?.name}</h3>
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
            ( <AlertWarning mensaje={"No hay turnos asignados."}/> ) : 
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
