import React from "react";
import CenteredDiv from "./centeredDiv";
import { Button, ProgressBar } from "react-bootstrap";
import { FourthPageProps } from '../types';

const FifthPage: React.FC<FourthPageProps> = ({ selectedProfessional, selectedTurno, selectedSpecialty}) => {
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
        <p>Fecha: {selectedTurno.fecha.toString()}</p>
        <Button variant="primary" className="mt-2" onClick={handleConfirm}>
          Confirmar
        </Button>
      </CenteredDiv>
    </div>
  );
};

export default FifthPage;
