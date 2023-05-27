import React from "react";
import CenteredDiv from "./centeredDiv";
import { Button, ProgressBar } from "react-bootstrap";
import { FifthPageProps } from '../types';

const FifthPage: React.FC<FifthPageProps> = ({ selectedProfessional, selectedTurno, selectedSpecialty}) => {
  const handleConfirm = () => {
    console.log("Turno confirmado:", selectedProfessional, selectedTurno);
  };

  return (
    <div>
      <CenteredDiv>
        <ProgressBar animated now={100} />
        <h2>Resumen del turno:</h2>
        <p>Profesional: {selectedProfessional.profesional.apellido}, {selectedProfessional.profesional.nombre}</p>
        <p>Especialidad: {selectedSpecialty.nombre}</p>
        <p>Fecha: {selectedTurno.fecha}</p>
        <p>Hora: {selectedTurno.hora}</p>
        <Button variant="primary" className="mt-2" onClick={handleConfirm}>
          Confirmar
        </Button>
      </CenteredDiv>
    </div>
  );
};

export default FifthPage;
