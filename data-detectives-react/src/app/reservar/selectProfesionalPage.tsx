"use client";
import React, { useEffect, useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { SecondPageProps, Profesional, Especialidad } from '../types';

const SecondPage: React.FC<SecondPageProps> = ({ selectedSpecialty, onSelectedProfessional, selectedProfessional}) => {
  const [professionals, setProfessionals] = useState<Profesional[]>([]);
  const [selectedOption, setSelectedOption] = useState<Profesional | null>();

  const handleSelectProfessional = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const option = professionals.find((professional) => professional.id.toString() == selectedValue);
    if (option) {
      setSelectedOption(option)
    }
  };
  
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch(`https://data-detectives-laravel.vercel.app/rest/profesionales/${selectedSpecialty.id}`);
        const data = await response.json();

        if (Array.isArray(data?.data)) {
          setProfessionals(data.data);
        } else {
          console.log("La respuesta de la API no contiene un array válido de profesionales:", data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfessionals();
  }, [selectedOption]);

  const handleNext = () => {
    if (selectedOption) {
      onSelectedProfessional(selectedOption);
    } else {
      console.log("Debe seleccionar un profesional antes de continuar.");
    }
  };

  useEffect(() => {
    if (professionals.length > 0 && !selectedOption) {
      setSelectedOption(professionals[0]);
    }
  }, [professionals]);

  useEffect(() => {
    if (selectedProfessional && !selectedOption) {
      setSelectedOption(selectedProfessional);
    }
  }, [selectedProfessional]);

  return (
    <div>
      <CenteredDiv>
        <ProgressBar animated now={60} />
        <h2>Seleccione el profesional para {selectedSpecialty.nombre}</h2>
        <Form.Select value={selectedOption?.id || undefined} 
          onChange={handleSelectProfessional}>
          {professionals.map((professional) => (
            <option key={professional.id} value={professional.id}>
              {professional.apellido}, {professional.nombre}
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

export default SecondPage;
