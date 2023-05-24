"use client";
import React, { useEffect, useState } from "react";
import FirstPage from "./firstPage";
import SecondPage from "./secondPage";
import { SecondPageProps, Especialidad } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';

const Formulario: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<SecondPageProps["formData"] | null>(null);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Especialidad | null>(null);

  const handleNextPage = (specialty: Especialidad) => {
    setSelectedSpecialty(specialty);
    setCurrentPage(2);
  };

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch("https://data-detectives-laravel.vercel.app/rest/especialidades");
        const data = await response.json();
  
        if (Array.isArray(data?.data)) {
          setEspecialidades(data.data);
          setSelectedSpecialty(data.data[0] || null);
        } else {
          console.log("La respuesta de la API no contiene un array válido de especialidades:", data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchEspecialidades();
  }, []);
  
  const handleSubmitForm = (data: SecondPageProps["formData"]) => {
    setFormData(data);
    console.log("Formulario enviado:", data);
  };

  return (
    <div>
      {currentPage === 1 && (
        <FirstPage specialties={especialidades} onNext={handleNextPage} selectedSpecialty={selectedSpecialty || undefined} />
      )}
      {currentPage === 2 && selectedSpecialty && (
        <SecondPage selectedSpecialty={selectedSpecialty} onSubmit={handleSubmitForm} formData={formData || { name: "", email: "" }}
        />
      )}
    </div>
  );
};

export default Formulario;
