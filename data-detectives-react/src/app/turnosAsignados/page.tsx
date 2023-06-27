"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShowTurnosAsignadosPageProps, TurnoAsignado } from "../types";
import Container from "../container-fondo";
import { Alert, Button, ListGroup } from "react-bootstrap";
import CenteredDiv from "../reservar/centeredDiv";
import MinCardComponent from "../minCard";
import CardTitle from "../cardTitle";
import AppSpinner from "../app-spinner";
import AlertWarning from "../alert-warning";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserType } from "../api/api";

const TurnosAsignadosPage: React.FC = () => {
  const [turnosAsignados, setTurnosAsignados] = useState<TurnoAsignado[]>([]);
  const [canceladoExitoso, setCanceladoExitoso] = useState<boolean>(false);  
  const [tieneTurnos, setTieneTurnos] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchRealizado, setFetch] = useState<boolean>(false);
  const [ messageModal, setMessage ] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();

  const router = useRouter();

  const { isAuthenticated } = useAuth0();

  const { loginWithRedirect } = useAuth0();

  const { user } = useAuth0();

  useEffect(() => {
    const fetchTurnosAsignados = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently(); 
          const userType = await getUserType(token);
          const tipo_usuario = userType.tipo_usuario;
          if (tipo_usuario == 'paciente') {
            const asignarTurnoResponse = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/turnos_asignados_paciente', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
            })
            if (!asignarTurnoResponse.ok) {
              setTieneTurnos(false);
            } else {
              const data = await asignarTurnoResponse.json();
              if (Array.isArray(data?.data)) {
                setTieneTurnos(true);
                setTurnosAsignados(data.data);
              } else {
                setTieneTurnos(false);
                console.log("La respuesta de la API no contiene un array válido de especialidades:", data);
              }
            }
          }
        }
        else {
          loginWithRedirect()
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTurnosAsignados();
    setLoading(false);
    setFetch(true);
  }, []);

  useEffect(() => {
    if (fetchRealizado && turnosAsignados.length === 0){
      setTieneTurnos(false);
    }
  }, [turnosAsignados])

  const handleBack = () => {
    router.back()
  };
  
  const handleCancelTurno = async (turno_id: number, turno_asignado_id: number) => {
    try {
      const response = await fetch('https://data-detectives-laravel.vercel.app/rest/cancelar_turno', {
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
      <Button className="btn mt-2" variant="outline-dark" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv>
        {canceladoExitoso && (
          <AlertWarning mensaje={"El turno se ha cancelado con éxito."}/>
        )}
        { loading && (<AppSpinner loading={loading}></AppSpinner> )}
        <CardTitle>
          <h3 className='text-white text-center mt-3'>Turnos asignados a {user?.email} </h3>          
        </CardTitle>
        {!tieneTurnos ? (
          <AlertWarning mensaje={"No hay turnos asignados."}/>
        ) : (
          turnosAsignados.map((turno) => (
            <MinCardComponent key={turno.id}>
              <ListGroup key={turno.id}>
                <ListGroup.Item className='text-white bg-dark'>Turno del {turno.turno.fecha}</ListGroup.Item>
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

export default TurnosAsignadosPage;
