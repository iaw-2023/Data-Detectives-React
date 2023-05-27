"use client";
import React, { useEffect, useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { SecondPageProps, Profesional_con_especialidad_id } from '../types';

const SecondPage: React.FC<SecondPageProps> = ({ selectedSpecialty, onSelectedProfessional, selectedProfessional}) => {
  const [professionals_with_specialty, setProfessionals] = useState<Profesional_con_especialidad_id[]>([]);
  const [selectedOption, setSelectedOption] = useState<Profesional_con_especialidad_id | null>();

  const handleSelectProfessional = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const option = professionals_with_specialty.find((professional) => professional.profesional.id.toString() == selectedValue);
    if (option) {
      setSelectedOption(option)
    }
  };
  
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch(`https://data-detectives-laravel-e5p4ga6p5-data-detectives.vercel.app/rest/profesionales/${selectedSpecialty.id}`);
        const data = await response.json();
        console.log(data);
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
    console.log(selectedOption);
    if (selectedOption) {
      onSelectedProfessional(selectedOption);
    } else {
      console.log("Debe seleccionar un profesional antes de continuar.");
    }
  };

  useEffect(() => {
    if (professionals_with_specialty.length > 0 && !selectedOption) {
      setSelectedOption(professionals_with_specialty[0]);
    }
  }, [professionals_with_specialty]);

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
        <Form.Select value={selectedOption?.profesional.id || undefined} 
          onChange={handleSelectProfessional}>
          {professionals_with_specialty.map((professional_with_specialty) => (
            <option key={professional_with_specialty.profesional.id} value={professional_with_specialty.profesional.id}>
              {professional_with_specialty.profesional.apellido}, {professional_with_specialty.profesional.nombre}
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
