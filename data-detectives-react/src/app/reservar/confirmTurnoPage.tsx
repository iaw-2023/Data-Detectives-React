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

const FifthPage: React.FC<FifthPageProps> = ({ selectedProfessional, selectedTurno, selectedSpecialty }) => {
  const [primerConsulta, setPrimerConsulta] = useState(false);
  const [turnoConfirmado, setTurnoConfirmado] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setprogress] = useState<number>(99);
  const [loading, setLoading] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();

    const handleShow = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };
    
  const router = useRouter();

  const {isAuthenticated} = useAuth0();

  const { loginWithRedirect } = useAuth0();

  const { user } = useAuth0();

  const handleConfirm = async () => {
    try {
      console.log(user); 
      if (isAuthenticated) {
        setLoading(true); 
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://dev-b6y5rs8y4it5vikj.us.auth0.com/api/v2/',
          }
        });
  
        const response = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userEmail: user?.email,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const tipoUsuario = data.tipoUsuario;
  
          if (tipoUsuario === 'paciente') {
            const asignarTurnoResponse = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/asignar_turno', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                data: {
                  turno: {
                    id: selectedTurno.id,
                  },
                  paciente: {
                    email: user?.email
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
          } else {
            // Si el usuario no es un paciente, puedes realizar otra acción o mostrar un mensaje adecuado
            console.log('El usuario no es un paciente');
          }
        } else {
          // Manejar el caso cuando la solicitud de obtención de tipoUsuario no sea exitosa
          console.log('Error al obtener el tipo de usuario');
        }
      } else {
        loginWithRedirect();
      }
    } catch (error) {
      console.log('Error al confirmar el turno:', error);
    }
  };
  

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimerConsulta(e.target.checked);
  };

  const handleBackHome = () => {
    router.push("/");
  };

  const handleBack = () => {
    router.back();
  };



  return (
    <Container>
      <ProgressBar striped variant="info" animated now={progress} />
      <Button className="btn mt-2" variant="outline-dark" onClick={handleShow}>
        Back
      </Button>
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

