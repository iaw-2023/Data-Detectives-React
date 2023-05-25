"use client";
import React, { useEffect, useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { SecondPageProps, Profesional, Especialidad } from '../types';

const SecondPage: React.FC<SecondPageProps> = ({ selectedSpecialty, onNext }) => {
  const [professionals, setProfessionals] = useState<Profesional[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<Profesional | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(2);

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
  }, [selectedSpecialty]);

  const handleNextPage = () => {
    if (selectedProfessional) {
      onNext(selectedProfessional);
      setCurrentPage(3);
    } else {
      console.log("Debe seleccionar un profesional antes de continuar.");
    }
  };

  return (
    <div>
      <CenteredDiv>
        <ProgressBar animated now={60} />
        <h2>Seleccione el profesional para {selectedSpecialty.nombre}</h2>
        <Form.Select value={selectedProfessional?.id.toString() || ""} onChange={(e) => {
          const selectedProfId = parseInt(e.target.value);
          const selectedProf = professionals.find(prof => prof.id === selectedProfId) || null;
          setSelectedProfessional(selectedProf);
        }}>
          {professionals.map((professional) => (
            <option key={professional.id} value={professional.id.toString()}>
              {professional.apellido}, {professional.nombre}
            </option>
          ))}
        </Form.Select>
        <Button variant="primary" className="mt-2" onClick={handleNextPage}>
          Siguiente
        </Button>
      </CenteredDiv>
    </div>
  );
};

export default SecondPage;
