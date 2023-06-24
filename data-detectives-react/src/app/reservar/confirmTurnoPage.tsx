import React, { useState, useEffect } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, Form, ListGroup, ProgressBar } from "react-bootstrap";
import { FifthPageProps } from '../types';
import { useRouter } from "next/navigation";
import Container from "../container-fondo";
import CardComponent from '../card';
import MyModal from '../modalAlert';
import AppSpinner from "../app-spinner";
import { useAuth0 } from "@auth0/auth0-react";
import ModalRegister from "../ModalAlertRegister";

const FifthPage: React.FC<FifthPageProps> = ({ selectedProfessional, selectedTurno, selectedSpecialty }) => {
  const [primerConsulta, setPrimerConsulta] = useState(false);
  const [turnoConfirmado, setTurnoConfirmado] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [route, setRoute] = useState<string>("/");
  const [progress, setprogress] = useState<number>(99);
  const [loading, setLoading] = useState<boolean>(false);
  const [ messageModal, setMessage ] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();

    const handleShow = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };
    
  const router = useRouter();

  const { isAuthenticated } = useAuth0();

  const { loginWithRedirect } = useAuth0();

  const { user } = useAuth0();

  const handleConfirm = async () => {
    /**
     * Casos:
     * + Esta logueado y registrado en la BD como paciente
     * + Esta logueado y no es paciente, es profesional
     * + Esta logueado y no esta registrado en la BD como paciente
     * + No esta logueado
     */
    try {
      console.log(user); 
      if (isAuthenticated) { //Esta logueado
        setLoading(true); 
        const token = await getAccessTokenSilently(); 
        console.log(token);
        const responseUserType = await fetch(`https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/typeUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const userType = await responseUserType.json()
        const tipo = userType.tipo_usuario;
        console.log(tipo);
        if (tipo === 'paciente') {  // Esta logueado y es paciente registrado en la BD
          const asignarTurnoResponse = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/asignar_turno', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              data: {
                turno: {
                  id: selectedTurno.id,
                },
                primer_consulta: primerConsulta,
              },
            }),
          });
          if (asignarTurnoResponse.ok) {    
            setprogress(100);
            setLoading(false);
            setTurnoConfirmado(true);
          }
          else {
            setMessage("Error al confirmar turno.");  // Acá mostrar un mensaje de error al confirmar turno
            setShowMessage(true);
            setRoute("/");
          }
        } 
        else { 
          if (tipo === 'profesional') { //Esta logueado y es profesional
            setMessage("Estas registrado como profesional. No podes solicitar turnos.");
            setShowMessage(true);
            setRoute("/");
          }
          else { //Logueado y tiene que registrarse como paciente en el back
            setMessage("Para poder reservar deberás registrarte como paciente.")
            setRoute('/register')
            setShowMessage(true);  
          }
        }
      } 
      else { // No esta logueado. Hay que pedirle que se loguee
        loginWithRedirect();
      }
    }
    catch (error) {
      console.log('Error al confirmar el turno:', error);    
  };
}
  

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimerConsulta(e.target.checked);
  };

  const handleBackHome = () => {
    router.push("/");
  };

  const handleBack = () => {
    router.back();
  };

  const handleBackModal = () => {
    router.push(route);
  };

  return (
    <Container>
      <ProgressBar striped variant="info" animated now={progress} />
      <Button className="btn mt-2" variant="outline-dark" onClick={handleShow}>
        Back
      </Button>
      <ModalRegister show={showMessage} onClose={handleCloseModal} onBack={handleBackModal} message={messageModal}/>
      <MyModal show={showModal} onClose={handleCloseModal} onBack={handleBack} />
      <CenteredDiv>
        {turnoConfirmado ? (
          <div>
            <h3 className='text-dark mt-2'>El turno fue asignado correctamente</h3>
            <Button variant="outline-dark" className="mt-2" onClick= {handleBackHome}>
                Volver a la página de inicio
            </Button>
          </div>
        ) : (
          <> <CardComponent>
                <ListGroup>
                  <h3 className='text-white mt-2 text-center'>Resumen del turno:</h3>
                  <ListGroup.Item className="bg-dark text-white">Profesional: {selectedProfessional.profesional.apellido}, {selectedProfessional.profesional.nombre}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Especialidad: {selectedSpecialty.nombre}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Hora: {selectedTurno.hora.substring(0, 5)}hs</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">
                  <Form.Check
                    type="checkbox"
                    label="Primera consulta"
                    checked={primerConsulta}
                    onChange={handleCheckboxChange}
                    className="text-white"
                  />
                  </ListGroup.Item>
                </ListGroup>
              </CardComponent>
            { !loading ? 
                (<Button variant="outline-dark" className="mt-2" onClick={handleConfirm}>
                  Confirmar
                </Button>)
              :
                (<AppSpinner loading={loading}></AppSpinner>)
            }
          </>
        )}
      </CenteredDiv>
    </Container>
  );
};

export default FifthPage;

