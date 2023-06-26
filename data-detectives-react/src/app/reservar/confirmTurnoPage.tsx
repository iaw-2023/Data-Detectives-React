import React, { useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, Form, ListGroup, ProgressBar } from "react-bootstrap";
import { FifthPageProps } from '../types';
import { useRouter } from "next/navigation";
import Container from "../container-fondo";
import CardComponent from '../card';
import MyModal from '../modalAlert';
import AppSpinner from "../app-spinner";
import MercadoPagoPage from "../mercadoPago/page";

const FifthPage: React.FC<FifthPageProps> = ({ selectedProfessional, selectedTurno, selectedSpecialty, paciente }) => {
  const [primerConsulta, setPrimerConsulta] = useState(false);
  const [turnoConfirmado, setTurnoConfirmado] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setprogress] = useState<number>(99);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagado, setPagado] = useState<boolean>(false);
  const [showMercadoPago, setShowMercadoPago] = useState<boolean>(false);


    const handleShow = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };
    
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://data-detectives-laravel.vercel.app/rest/asignar_turno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            turno: {
              id: selectedTurno.id,
            },
            paciente: {
              id: paciente.id,
            },
            primer_consulta: primerConsulta,
          },
        }),
      });
      setprogress(100);
      setLoading(false);
      setTurnoConfirmado(true);
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
    router.back()
  };

  const handleMercadoPago = () => {
    setShowMercadoPago(true)
  };

  return (
    <Container>
      <ProgressBar striped variant="info" animated now={progress} />
      <Button className="btn mt-2" variant="outline-dark" onClick={handleShow}>
        Back
      </Button>
      <MyModal show={showModal} onClose={handleCloseModal} onBack={handleBack} />
      <CenteredDiv>
      {showMercadoPago ? (
        <MercadoPagoPage/>
      ) : (
        turnoConfirmado ? (
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
                  <ListGroup.Item className="bg-dark text-white">Paciente: {paciente.apellido_paciente}, {paciente.nombre_paciente}</ListGroup.Item>
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
            { !loading ? (
              !pagado ? 
                (<Button variant="outline-dark" className="mt-2" onClick={handleMercadoPago}>
                    Pagar la consulta con Mercado Pago
                  </Button>) : 
                (<Button variant="outline-dark" className="mt-2" onClick={handleConfirm}>
                  Confirmar
                </Button>)
              ) :
                (<AppSpinner loading={loading}></AppSpinner>)
            }
          </>
        )
      )}
      </CenteredDiv>
    </Container>
  );
};

export default FifthPage;