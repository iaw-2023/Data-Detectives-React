"use client";
import React, { useEffect, useState } from "react";
import CenteredDiv from "../reservar/centeredDiv";
import Button from 'react-bootstrap/Button';
import { ApiResponseTurnosProfesional, TurnoAsignadoProfesional } from '../types';
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
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShowTurnoProfesional: React.FC = () => {

  const [turnosAsignados, setTurnosAsignados] = useState<TurnoAsignadoProfesional[]>([]);
  const [turnosAsignadosFecha, setTurnosAsignadosFecha] = useState<TurnoAsignadoProfesional[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [tieneTurnos, setTieneTurnos] = useState<boolean>(true);
  const [fetchTurnosRealizado, setFetchTurnos ] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState(false);
  const [messageModal, setMessage] = useState<string>("");
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);
  const [canView, setCanView] = useState<boolean>(false);
  const [route, setRoute] = useState<string>("/");


  const { getAccessTokenSilently } = useAuth0();

  const router = useRouter();

  const { isAuthenticated, loginWithRedirect, loginWithPopup, user } = useAuth0();

  
  const handleBack = () => {
    router.back();
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
  
  const fetchUserType = async () => {
    try {
      const token = await getAccessTokenSilently();
      const userType = await getUserType(token);
      if (userType.tipo_usuario === "profesional") {
        setCanView(true);
        searchTurnos();        
      } else {
        setMessage("No puedes acceder a este módulo ya que no estás registrado como profesional.");
        setRedirectToLogin(false);
        setRoute("/");
        setShowMessage(true);
      }
    } catch (error) {
      // Manejar el error al obtener el tipo de usuario
      console.error(error);
    }
  };    
  const searchTurnos = async () => {
    setLoading(true);   
      const turnosAsignados = await fetchTurnosAsignados();
      setLoading(false);    
      if (Array.isArray(turnosAsignados)) {
        setTurnosAsignados(turnosAsignados);
        const dates = turnosAsignados.map((turno) => {
          const [year, month, day] = turno.turno.fecha.split("-");
          return new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0);
        });
        setAvailableDates(dates);
      }         
  setFetchTurnos(true);
  setLoading(false);     
};

  const fetchTurnosAsignados = async () => {
    try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        const turnosAsignadosResponse = await getTurnosAsignadosProfesional(token);
        if (turnosAsignadosResponse.message) {
          setMessage(turnosAsignadosResponse.message);
          setShowMessage(true);
        }
        else {
          const apiResponse : ApiResponseTurnosProfesional = turnosAsignadosResponse;
          return apiResponse.data;
        }
        setLoading(false); 
    } catch (error) {
      console.log(error);
    }    
  };
  
  useEffect(() => {   
   if (isAuthenticated) {
    fetchUserType();
   } else { 
      setMessage("Para poder seguir, deberás loguearte y estar registrado como profesional.");
      setShowMessage(true);
      setRedirectToLogin(true);
      setRoute("/profesional");
   }  
  }, [isAuthenticated])

  useEffect(() => {
    if (fetchTurnosRealizado && turnosAsignados.length === 0){
      setTieneTurnos(false);
    }
  }, [turnosAsignados])
 
  const handleSelectAsignados = (date: Date) => {
    const dateFormat = date ? formatDate(date) : "";
    setSelectedOption(dateFormat);

    const filteredTurnos = turnosAsignados.filter(
      (turno) => turno.turno.fecha === dateFormat
    );

    setTurnosAsignadosFecha(filteredTurnos.sort((a, b) => {
      return a.turno.hora.localeCompare(b.turno.hora);
    }));
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleBackModal = () => {
    if (redirectToLogin) {
      setShowMessage(false);
      loginWithPopup();
    } 
    else 
      router.push(route);
  };
  
  const handleCloseModal = () => {
    router.push("/");
  };

  return (
    <Container>
      <Button className="btn mt-2" variant="outline-dark" onClick={handleBack}>
        Back
      </Button>
      { canView ? (
      <CenteredDiv>
        <ModalAlert
          show={showMessage}
          onClose={handleCloseModal}
          onBack={handleBackModal}
          message={messageModal}
        />
        <CardTurnosAsignados>
          <h3 className="text-white text-center mt-3">
            Turnos asignados para {user?.nickname}
          </h3>
          <CenteredDivCalendar>
            <Calendar
              className="text-dark"
              tileDisabled={tileDisabled}
              onChange={handleSelectAsignados as any}
              value={getSelectedDate()}
            />
          </CenteredDivCalendar>
          {!tieneTurnos ? (
            <AlertWarning mensaje={"No hay turnos asignados."} />
          ) : loading ? (
            <AppSpinner loading={loading}></AppSpinner>
          ) : (
            <Table striped bordered hover className="table-responsive-s">
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
                    <td className="text-white">
                      {turno.turno.profesional_especialidad.especialidad.nombre}
                    </td>
                    <td className="text-white">{turno.turno.hora}</td>
                    <td className="text-white">
                      {turno.paciente.apellido_paciente + " " + turno.paciente.nombre_paciente}
                    </td>
                    <td className="text-white">
                      {turno.primer_consulta ? "Si" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardTurnosAsignados>
      </CenteredDiv>) : 
      ( <ModalAlert
      show={showMessage}
      onClose={handleCloseModal}
      onBack={handleBackModal}
      message={messageModal}
      />)}    
    </Container>
  );
};

export default ShowTurnoProfesional;

