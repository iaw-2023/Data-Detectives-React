"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TurnoAsignado } from "../types";
import Container from "../container-fondo";
import { Button, ListGroup } from "react-bootstrap";
import CenteredDiv from '../centeredDiv';
import MinCardComponent from "../minCard";
import CardTitle from "../cardTitle";
import AppSpinner from "../app-spinner";
import AlertWarning from "../alert-warning";
import { useAuth0 } from "@auth0/auth0-react";
import { cancelarTurno, getTurnosAsignadosPaciente, getUserType } from "../api/api";
import ModalAlert from "../Alert";

const TurnosAsignadosPage: React.FC = () => {
  const [turnosAsignados, setTurnosAsignados] = useState<TurnoAsignado[]>([]);
  const [canceladoExitoso, setCanceladoExitoso] = useState<boolean>(false);  
  const [tieneTurnos, setTieneTurnos] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchRealizado, setFetch] = useState<boolean>(false);
  const [ messageModal, setMessage ] = useState<string>("");
  const [showMessage, setShowMessage] = useState(false);
  const [canView, setCanView] = useState<boolean>(false);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);
  const [redirectToRegister, setRedirectToRegister] = useState<boolean>(false);
  
  const { getAccessTokenSilently } = useAuth0();

  const router = useRouter();

  const { isAuthenticated } = useAuth0();

  const { loginWithPopup } = useAuth0();

  const { user } = useAuth0();

    const fetchTurnosAsignados = async () => {
      try {
        if (isAuthenticated) {
          setRedirectToLogin(false);
          const token = await getAccessTokenSilently(); 
          const userType = await getUserType(token);
          const tipo_usuario = userType.tipo_usuario;
          if (tipo_usuario === "paciente")
          {
            const asignarTurnoResponse = await getTurnosAsignadosPaciente(token);
            if (asignarTurnoResponse.message) {
              setMessage(asignarTurnoResponse.message);
              setShowMessage(true);
            }
            else {
              if (Array.isArray(asignarTurnoResponse?.data)) {
                setTieneTurnos(true);
                setTurnosAsignados(asignarTurnoResponse.data);
              } else {
                setTieneTurnos(false);
              }
            }
          }                      
        }
        else {
          setMessage("Para poder ver los turnos como paciente debes estar logueado y registrado como paciente.");
          setRedirectToLogin(true);
          setShowMessage(true);  
          setCanView(false);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      setFetch(true);
    };
  
  const fetchUserType = async () => {
    try {
      const token = await getAccessTokenSilently();
      const userType = await getUserType(token);
      setLoading(false);
      const tipo_usuario = userType.tipo_usuario;
        if (tipo_usuario === "profesional") {
          setMessage("No podes ver turnos como paciente debido a que te encontras registrado como profesional.");
          setShowMessage(true);  
          setCanView(false);
        } else { if (tipo_usuario === "paciente") {
                    setCanView(true);
                    fetchTurnosAsignados();
                 } else {
                    setCanView(false);
                    setRedirectToRegister(true);
                    setMessage("No te encontras registrado en nuestra base de datos. Por favor registrate para comenzar poder reservar turnos y visualizarlos.");
                    setShowMessage(true);
                    
                 }     
          }
    } catch {
    }
  }

  useEffect(() => {
    if (fetchRealizado && turnosAsignados.length === 0){
      setTieneTurnos(false);
    }
  }, [turnosAsignados])
  
  useEffect(() => {   
    if (isAuthenticated) {
     setRedirectToLogin(false);
     fetchUserType();      
    } else {
          setMessage("Para poder ver los turnos como paciente debes estar logueado y registrado como paciente.");
          setShowMessage(true); 
          setRedirectToLogin(true);
          setCanView(false);
      } 
   }, [isAuthenticated])

  const handleBack = () => {
    router.back()
  };
  
  const handleCancelTurno = async (turno_id: number, turno_asignado_id: number) => {
    try {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently(); 
        const response = await cancelarTurno(token, turno_id,turno_asignado_id);
        if (response.message) {
          const updatedTurnos = turnosAsignados.filter(turno => turno.id !== turno_asignado_id);
          setTurnosAsignados(updatedTurnos);
          setCanceladoExitoso(true);
        } else {
          console.log(response.message);
        }
      }
    }  catch (error) {
        console.log('Error al enviar la solicitud POST', error);
    }
  };
  
  const handleBackModal = () => {
    if (redirectToLogin) {
      setShowMessage(false);
      loginWithPopup();
    } else {
        if (redirectToRegister) {
          setShowMessage(false);
          router.push("/register");
        } else router.push("/");
    }    
  };
  
  const handleCloseModal = () => {
    router.push("/");
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
        {loading && (<AppSpinner loading={loading}></AppSpinner>)}
        {canView ? (
          <>
            <CardTitle>
              <h3 className='text-white text-center mt-3'>Turnos asignados a {user?.nickname} </h3>          
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
          </>
        ) : (
          <ModalAlert
            show={showMessage}
            onClose={handleCloseModal}
            onBack={handleBackModal}
            message={messageModal}
          />
        )}
      </CenteredDiv>
    </Container>
  );

}  

export default TurnosAsignadosPage;
