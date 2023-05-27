import React, { useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { FifthPageProps } from '../types';
import DarkDiv from "../darkDiv";
import { useRouter } from 'next/router';

const FifthPage: React.FC<FifthPageProps> = ({ selectedProfessional, selectedTurno, selectedSpecialty}) => {
  const [primerConsulta, setPrimerConsulta] = useState(false);
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
              id: 1, // Ajusta el ID del paciente según corresponda
            },
            primer_consulta: primerConsulta,
          },
        }),
      });
  
      if (response.ok) {
        // Si la respuesta es exitosa, redirige a otra página
        router.push('/page');
      } else {
        console.log('Error al confirmar el turno:', response.status);
      }
    } catch (error) {
      console.log('Error al confirmar el turno:', error);
    }
  };
  

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimerConsulta(e.target.checked);
  };

  return (
    <DarkDiv>
      <CenteredDiv>
        <ProgressBar animated now={99} />
        <h2 className="text-white mt-2">Resumen del turno:</h2>
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
      </CenteredDiv>
    </DarkDiv>
  );
};

export default FifthPage;
