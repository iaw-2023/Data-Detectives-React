"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CenteredDiv from "./centeredDiv";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FirstPageProps, Especialidad } from '../types';
import Container from "../container-fondo";
import { useRouter } from "next/navigation";
import Card from '../card';

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
      <ProgressBar striped variant="info" animated now={20} />
      <Button className="btn mt-2" variant="outline-info" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv> 
        <Card>
          <h3 className='text-white text-center mt-3'>Seleccione una especialidad</h3>
          <Form.Select className="bg-dark text-white" value={selectedOption ? selectedOption.nombre : ""}
            onChange={handleSelectSpecialty}>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.nombre}>
                {specialty.nombre}
              </option>
            ))}
          </Form.Select>
          <Button variant="dark" className="mt-2" onClick={handleNext}>
            Siguiente
          </Button>
        </Card>
      </CenteredDiv>
    </Container>
  );
};


export default FirstPage;
