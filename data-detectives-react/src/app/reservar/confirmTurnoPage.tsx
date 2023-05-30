import React, { useEffect, useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { FifthPageProps } from '../types';
import { useRouter } from "next/navigation";
import Container from "../container-fondo";


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
    router.push("/homePage");
  };

  return (
    <Container>
      <CenteredDiv>
        {turnoConfirmado ? (
          <div>
            <h2 className="text-white mt-2">El turno fue asignado correctamente.</h2>
            <Button variant="primary" className="mt-2" onClick= {handleBackHome}>
              Volver a la página de inicio
            </Button>
          </div>
        ) : (
          <>
            <ProgressBar animated now={99} />
            <h2 className="text-white mt-2">Resumen del turno:</h2>
            <p className="text-white">Paciente: {paciente.apellido_paciente}, {paciente.nombre_paciente}</p>
            <p className="text-white">Profesional: {selectedProfessional.profesional.apellido}, {selectedProfessional.profesional.nombre}</p>
            <p className="text-white">Especialidad: {selectedSpecialty.nombre}</p>
            <p className="text-white">Fecha: {selectedTurno.fecha}</p>
            <p className="text-white">Hora: {selectedTurno.hora}</p>
            <Form.Check
              type="checkbox"
              label="Primera consulta"
              checked={primerConsulta}
              onChange={handleCheckboxChange}
              className="text-white"
            />
            <Button variant="primary" className="mt-2" onClick={handleConfirm}>
              Confirmar
            </Button>
          </>
        )}
      </CenteredDiv>
    </Container>
  );
};

export default FifthPage;
