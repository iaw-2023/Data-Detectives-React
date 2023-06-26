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
import { getUserType } from "../api/api";
import { asignarTurno } from "../api/api";
import ModalAlert from "../Alert";

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

  const { loginWithPopup } = useAuth0();

  const { user } = useAuth0();

  const handleConfirm = async () => {
    /**
     * Casos:
     * + Esta logueado y registrado en la BD como paciente
     * + Esta logueado y no es paciente, es profesional
     * + Esta logueado y no esta registrado en la BD como paciente
     * + No esta logueado
     */
      console.log(user); 
      if (isAuthenticated) { //Esta logueado
      
        setLoading(true); 
        const token = await getAccessTokenSilently(); 
        const userType = await getUserType(token);
        const tipo_usuario = userType.tipo_usuario;
        
        const asignarTurnoResponse = await asignarTurno(tipo_usuario,token,selectedTurno.id,primerConsulta);
        
        if (asignarTurnoResponse.message) {
          setMessage(asignarTurnoResponse.message); 
          setShowMessage(true);
          setRoute(asignarTurnoResponse.route);
        } else {
          setprogress(100);
          setLoading(false);
          setTurnoConfirmado(true);
        }
      } else { // No esta logueado. Hay que pedirle que se loguee
        setMessage("Para poder reservar un turno deberás loguearte antes."); 
        setShowMessage(true);      
        loginWithPopup();
      }
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
    setShowMessage(false);
  };

  return (
    <Container>
      <ProgressBar striped variant="info" animated now={progress} />
      <Button className="btn mt-2" variant="outline-dark" onClick={handleShow}>
        Back
      </Button>
      <ModalAlert show={showMessage} onClose={handleCloseModal} onBack={handleBackModal} message={messageModal}/>
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

