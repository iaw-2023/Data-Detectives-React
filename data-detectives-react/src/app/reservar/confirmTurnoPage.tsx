import React, { useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, Form, ListGroup, ProgressBar } from "react-bootstrap";
import { FifthPageProps } from '../types';
import { useRouter } from "next/navigation";
import Container from "../container-fondo";
import CardComponent from '../card';


const FifthPage: React.FC<FifthPageProps> = ({ selectedProfessional, selectedTurno, selectedSpecialty, paciente }) => {
  const [primerConsulta, setPrimerConsulta] = useState(false);
  const [turnoConfirmado, setTurnoConfirmado] = useState(false);

  const router = useRouter();

  const handleConfirm = async () => {
    try {
      const response = await fetch('https://data-detectives-laravel-git-new-api-data-detectives.vercel.app/rest/asignar_turno', {
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

  return (
    <Container>
      <ProgressBar striped variant="info" animated now={99} />
      <CenteredDiv>
        {turnoConfirmado ? (
          <div>
            <h3 className='text-white mt-2'>El turno fue asignado correctamente</h3>
            <Button variant="dark" className="mt-2" onClick= {handleBackHome}>
                Volver a la página de inicio
            </Button>
          </div>
        ) : (
          <>
              <CardComponent>
                <ListGroup>
                  <h3 className='text-white mt-2 text-center'>Resumen del turno:</h3>
                  <ListGroup.Item className="bg-dark text-white">Paciente: {paciente.apellido_paciente}, {paciente.nombre_paciente}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Profesional: {selectedProfessional.profesional.apellido}, {selectedProfessional.profesional.nombre}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Especialidad: {selectedSpecialty.nombre}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Hora: {selectedTurno.hora}</ListGroup.Item>
                </ListGroup>
              </CardComponent>
            <Form.Check
              type="checkbox"
              label="Primera consulta"
              checked={primerConsulta}
              onChange={handleCheckboxChange}
              className="text-white"
            />
            <Button variant="dark" className="mt-2" onClick={handleConfirm}>
              Confirmar
            </Button>
          </>
        )}
      </CenteredDiv>
    </Container>
  );
};

export default FifthPage;
