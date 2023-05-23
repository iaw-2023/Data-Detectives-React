"use client";
import React, { useEffect, useState } from "react";
import FirstPage from "./firstPage";
import SecondPage, { SecondPageProps } from "./secondPage";

interface Especialidad {
  id: number;
  nombre: string;
  descripcion: string;
}

const Formulario: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [formData, setFormData] = useState<SecondPageProps["formData"] | null>(null);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  const handleNextPage = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setCurrentPage(2);
  };

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch("https://data-detectives-laravel.vercel.app/rest/especialidades");
        const data = await response.json();
  
        // Verificar si la respuesta contiene la propiedad "data" y si es un array válido
        if (Array.isArray(data?.data)) {
          setEspecialidades(data.data);
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
        <FirstPage specialties={especialidades.map((especialidad) => especialidad.nombre)} onNext={handleNextPage} />
      )}
      {currentPage === 2 && selectedSpecialty && (
        <SecondPage selectedSpecialty={selectedSpecialty} onSubmit={handleSubmitForm} formData={formData || { name: "", email: "" }}
        />
      )}
    </div>
  );
};

export default Formulario;
