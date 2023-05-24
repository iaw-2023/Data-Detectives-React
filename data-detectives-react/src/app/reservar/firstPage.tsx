"use client";
import React, { useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CenteredDiv from "./centeredDiv";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface FirstPageProps {
  specialties: string[]; // Especialidades obtenidas de la API
  onNext: (selectedSpecialty: string) => void; // Callback para avanzar a la siguiente página
}

const FirstPage: React.FC<FirstPageProps> = ({ specialties, onNext }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const handleNext = () => {
    onNext(selectedSpecialty);
  };

  return (
    <div>
      <CenteredDiv> 
        <ProgressBar animated now={20} />
        <h2>Selecciona una especialidad</h2>
        <Form.Select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} >
            {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                    {specialty}
                </option>
            ))}
        </Form.Select>
        <Button variant="primary" className="mt-2" onClick={handleNext}>Siguiente</Button>
      </CenteredDiv>
    </div>
  );
};

export default FirstPage;
