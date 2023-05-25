"use client";
import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CenteredDiv from "./centeredDiv";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FirstPageProps, Especialidad } from '../types';

const FirstPage: React.FC<FirstPageProps> = ({ specialties, selectedSpecialty, onSelectSpecialty }) => {
  const handleSelectSpecialty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedSpecialty = specialties.find((specialty) => specialty.nombre === selectedValue);
    if (selectedSpecialty) {
      onSelectSpecialty(selectedSpecialty);
    }
  };

  const handleNext = () => {
    if (selectedSpecialty) {
      onSelectSpecialty(selectedSpecialty);
    }
  };

  return (
    <div>
      <CenteredDiv> 
        <ProgressBar animated now={20} />
        <h2>Selecciona una especialidad</h2>
        <Form.Select value={selectedSpecialty ? selectedSpecialty.nombre : ""}
          onChange={handleSelectSpecialty}>
          {specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.nombre}>
              {specialty.nombre}
            </option>
          ))}
        </Form.Select>
        <Button variant="primary" className="mt-2" onClick={handleNext}>
          Siguiente
        </Button>
      </CenteredDiv>
    </div>
  );
};


export default FirstPage;
