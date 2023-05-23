"use client";
import React, { useState } from "react";

interface FirstPageProps {
  specialties: string[]; // Especialidades obtenidas de la API
  onNext: (selectedSpecialty: string) => void; // Callback para avanzar a la siguiente página
}

const FirstPage: React.FC<FirstPageProps> = ({ specialties, onNext }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const handleNext = () => {
    onNext(selectedSpecialty);
  };

  return (
    <div>
      <h2>Selecciona una especialidad</h2>
      <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} >
        <option value="">Seleccione una especialidad</option>
        {specialties.map((specialty) => (
          <option key={specialty} value={specialty}>
            {specialty}
          </option>
        ))}
      </select>
      <button onClick={handleNext}>Siguiente</button>
    </div>
  );
};

export default FirstPage;
