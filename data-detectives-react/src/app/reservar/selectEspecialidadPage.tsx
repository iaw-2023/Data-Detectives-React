"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CenteredDiv from "./centeredDiv";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FirstPageProps, Especialidad } from '../types';
import Container from "../container-fondo-homePage";
import { useRouter } from "next/navigation";

const FirstPage: React.FC<FirstPageProps> = ({ specialties, selectedSpecialty, onSelectSpecialty }) => {
  const [selectedOption, setSelectedOption] = useState<Especialidad | undefined>(specialties[0]);

  const router = useRouter();
  
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

  const handleBack = () => {
    router.back()
  };
  
  useEffect(() => {
    if (selectedSpecialty && !selectedOption) {
      setSelectedOption(selectedSpecialty);
    }
  }, [selectedSpecialty]);

  return (
    <Container>
      <Button className="btn mt-2" variant="outline-info" onClick={handleBack}>
        Back
      </Button>
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
    </Container>
  );
};


export default FirstPage;
