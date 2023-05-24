"use client";
import React, { useEffect, useState } from "react";
import CenteredDiv from "./centeredDiv";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { SecondPageProps, Profesional, Especialidad } from '../types';


const SecondPage: React.FC<SecondPageProps> = ({ selectedSpecialty, onSubmit, formData }) => {
  const [professionals, setProfessionals] = useState<Profesional[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<Profesional | null>(null);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch(`https://data-detectives-laravel.vercel.app/rest/profesionales/${selectedSpecialty.id}`);
        const data = await response.json();
        dd(response);
        // Verificar si la respuesta contiene la propiedad "data" y si es un array válido
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSubmit({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div>
      <CenteredDiv>
        <ProgressBar animated now={20} />
        <h2>Seleccione el profesional para {selectedSpecialty.nombre}</h2>
        <Form.Select value={selectedProfessional?.id.toString() || ""} onChange={(e) => {
          const selectedProfId = parseInt(e.target.value);
          const selectedProf = professionals.find(prof => prof.id === selectedProfId) || null;
          setSelectedProfessional(selectedProf);
        }}>
          {professionals.map((professional) => (
            <option key={professional.id} value={professional.id.toString()}>
              {professional.nombre}
            </option>
          ))}
        </Form.Select>
        <Button variant="primary" className="mt-2" onClick={handleSubmit}>
          Enviar
        </Button>
      </CenteredDiv>
    </div>
  );
};

export default SecondPage;
export type { SecondPageProps };
  function dd($response: any) {
    throw new Error("Function not implemented.");
  }

