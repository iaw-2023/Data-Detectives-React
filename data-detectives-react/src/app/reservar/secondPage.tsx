"use client";
import React, { useState } from "react";

interface SecondPageProps {
  selectedSpecialty: string; // Especialidad seleccionada de la primera página
  onSubmit: (formData: FormData) => void; // Callback para enviar el formulario completo
  formData: FormData;
}

interface FormData {
  name: string;
  email: string;
  // ...
}

const SecondPage: React.FC<SecondPageProps> = ({ selectedSpecialty, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div>
      <h2>Formulario de {selectedSpecialty}</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {/* Agrega más campos según tus necesidades */}
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default SecondPage;
export type { SecondPageProps };
