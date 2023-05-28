"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CenteredDiv from "./centeredDiv";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FirstPageProps, Especialidad } from '../types';
import DarkDiv from "../darkDiv";

const FirstPage: React.FC<FirstPageProps> = ({ specialties, selectedSpecialty, onSelectSpecialty }) => {
  const [selectedOption, setSelectedOption] = useState<Especialidad | undefined>(specialties[0]);
  
  const handleSelectSpecialty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const option = specialties.find((specialty) => specialty.nombre === selectedValue);
    if (option) {
      setSelectedOption(option);
    }
  };

  const handleNext = () => {
    if (selectedOption) {
      onSelectSpecialty(selectedOption);
    } else {
      console.log("Debe seleccionar una especialidad antes de continuar.")
    }
  };
  
  useEffect(() => {
    if (selectedSpecialty && !selectedOption) {
      setSelectedOption(selectedSpecialty);
    }
  }, [selectedSpecialty]);

  return (
    <DarkDiv>
      <CenteredDiv> 
        <ProgressBar animated now={20} />
        <h2 className="text-white">Selecciona una especialidad</h2>
        <Form.Select value={selectedOption ? selectedOption.nombre : ""}
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
    </DarkDiv>
  );
};


export default FirstPage;
