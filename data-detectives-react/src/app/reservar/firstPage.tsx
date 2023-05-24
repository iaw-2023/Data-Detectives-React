"use client";
import React, { useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CenteredDiv from "./centeredDiv";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FirstPageProps, Especialidad } from '../types';

const FirstPage: React.FC<FirstPageProps> = ({ specialties, onNext }) => {
  
  const [selectedSpecialty, setSelectedSpecialty] = useState<Especialidad | undefined>(specialties[0]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleNextPage = (specialty: Especialidad) => {
    if (specialty) {
      setSelectedSpecialty(specialty);
      setCurrentPage(2);
      onNext(specialty);
    } else {
      console.log("Debe seleccionar una especialidad antes de continuar.");
    }
  };

  return (
    <div>
      <CenteredDiv> 
        <ProgressBar animated now={20} />
        <h2>Selecciona una especialidad</h2>
        <Form.Select value={selectedSpecialty ? selectedSpecialty.nombre : ""}
          onChange={(e) => {
            const selectedValue = e.target.value;
            const selectedSpecialty = specialties.find((specialty) => specialty.nombre === selectedValue);
            setSelectedSpecialty(selectedSpecialty);
          }} >
            {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.nombre}>
                    {specialty.nombre}
                </option>
            ))}
        </Form.Select>
        <Button variant="primary" className="mt-2" onClick={() => selectedSpecialty && handleNextPage(selectedSpecialty)}>
          Siguiente
        </Button>
      </CenteredDiv>
    </div>
  );
};

export default FirstPage;
