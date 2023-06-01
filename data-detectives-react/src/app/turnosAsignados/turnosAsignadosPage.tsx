"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShowTurnosAsignadosPageProps, TurnoAsignado } from "../types";
import Container from "../container-fondo";
import { Alert, Button, ListGroup } from "react-bootstrap";
import CenteredDiv from "../reservar/centeredDiv";
import MinCardComponent from "../minCard";
import CardTitle from "../cardTitle";


const ShowTurnosAsignadosPage: React.FC<ShowTurnosAsignadosPageProps> = ({ paciente }) => {
  const [turnosAsignados, setTurnosAsignados] = useState<TurnoAsignado[]>([]);
  const [canceladoExitoso, setCanceladoExitoso] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTurnosAsignados = async () => {
      try {
        const id_paciente = paciente.id;
        const response = await fetch(`https://data-detectives-laravel-git-new-api-data-detectives.vercel.app/rest/turnos_asignados_paciente/${id_paciente}`);
        const data = await response.json();
        if (Array.isArray(data?.data)) {
          setTurnosAsignados(data.data);
        } else {
          console.log("La respuesta de la API no contiene un array válido de especialidades:", data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchTurnosAsignados();
  }, []);

  const handleBack = () => {
    router.back()
  };
  
  const handleCancelTurno = async (turno_id: number, turno_asignado_id: number) => {
    console.log(turno_asignado_id);
    console.log(turno_id);
    try {
      const response = await fetch('https://data-detectives-laravel-git-new-api-data-detectives.vercel.app/rest/cancelar_turno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [{
            id: turno_asignado_id,
            turno: {
              id: turno_id,
            },
          }],
        }),
      });
      console.log(response);
      if (response.ok) {
        console.log('Solicitud POST enviada');
        const updatedTurnos = turnosAsignados.filter(turno => turno.id !== turno_asignado_id);
        setTurnosAsignados(updatedTurnos);
        setCanceladoExitoso(true);
      } else {
        console.log('Error al enviar la solicitud POST');
      }
    } catch (error) {
      console.log('Error al enviar la solicitud POST', error);
    }
  };

  return (
    <Container>
      <Button className="btn mt-2" variant="outline-info" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv>
      {canceladoExitoso && (
          <Alert variant="success" style={{ width: "42rem" }}>El turno se ha cancelado con éxito.</Alert>
        )}
        <CardTitle>
          <h3 className='text-white text-center mt-3'>Turnos asignados a {paciente.apellido_paciente}, {paciente.nombre_paciente}</h3>
        </CardTitle>
        {turnosAsignados.length === 0 ? (
          <Alert variant="info" style={{ width: "40rem" }}>No hay turnos asignados.</Alert>
        ) : (
          turnosAsignados.map((turno) => (
            <MinCardComponent key={turno.id}>
              <ListGroup key={turno.id}> 
                <ListGroup.Item className='text-black bg-info'>Turno del {turno.turno.fecha}</ListGroup.Item>
                <ListGroup.Item className='text-white bg-dark'>Hora: {turno.turno.hora.substring(0, 5)}hs</ListGroup.Item>
                <ListGroup.Item className='text-white bg-dark'>Profesional: {turno.turno.profesional_especialidad.profesional.apellido}, {turno.turno.profesional_especialidad.profesional.nombre}</ListGroup.Item>
                <ListGroup.Item className='text-white bg-dark'>Especialidad: {turno.turno.profesional_especialidad.especialidad.nombre}</ListGroup.Item>
                <ListGroup.Item className='bg-dark'>
                  <Button variant='danger' onClick={() => handleCancelTurno(turno.turno.id, turno.id)}>Cancelar</Button>
                </ListGroup.Item>
              </ListGroup>
            </MinCardComponent>
          ))
        )}
      </CenteredDiv>
    </Container>
  );
};


export default ShowTurnosAsignadosPage;
