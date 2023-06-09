"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { SecondPageProps, Profesional_con_especialidad_id } from '../types';
import Container from "../container-fondo";
import Card from '../card';
import { useRouter } from "next/navigation";
import MyModal from '../modalAlert';
import AppSpinner from "../app-spinner";
import CenteredDivReservar from "./centeredDivReservar";

const SecondPage: React.FC<SecondPageProps> = ({ selectedSpecialty, onSelectedProfessional, selectedProfessional}) => {
  const [professionals_with_specialty, setProfessionals] = useState<Profesional_con_especialidad_id[]>([]);
  const [selectedOption, setSelectedOption] = useState<Profesional_con_especialidad_id | null>();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
        setLoading(true);
        const response = await fetch(`https://data-detectives-laravel.vercel.app/rest/profesionales/${selectedSpecialty.id}`);
        const data = await response.json();
        if (Array.isArray(data?.data)) {
          setProfessionals(data.data);
        } else {
          console.log("La respuesta de la API no contiene un array válido de profesionales:", data);
        }
        setLoading(false);
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
    if (!selectedOption) {
      setSelectedOption(professionals_with_specialty[0]);
    }
  }, [professionals_with_specialty]);

  useEffect(() => {
    if (selectedProfessional && !selectedOption) {
      setSelectedOption(selectedProfessional);
    }
  }, [selectedProfessional]);

  const handleBack = () => {
    router.back()
  };

  return (
    <Container>
      <ProgressBar striped variant="info" animated now={40} />
      <Button className="btn mt-2" variant="outline-dark" onClick={handleShow}>
        Back
      </Button>
      <MyModal show={showModal} onClose={handleCloseModal} onBack={handleBack} />
      <CenteredDivReservar>
        <Card>
          <h3 className='text-white text-center mt-3'>Seleccione el profesional para {selectedSpecialty.nombre}</h3>
          {loading ? (
            <AppSpinner loading={loading}></AppSpinner> 
          ) : (
          <Form.Select className="bg-dark text-white" value={selectedOption?.profesional.id || undefined} 
            onChange={handleSelectProfessional}>
            {professionals_with_specialty.map((professional_with_specialty) => (
              <option key={professional_with_specialty.profesional.id} value={professional_with_specialty.profesional.id}>
                {professional_with_specialty.profesional.apellido}, {professional_with_specialty.profesional.nombre}
              </option>
            ))}
          </Form.Select>)}
          { !loading && (
            <Button variant="dark" className="mt-2" onClick={handleNext}>
              Siguiente
            </Button>)}          
        </Card>
      </CenteredDivReservar>
    </Container>
  );
};

export default SecondPage;
