"use client";
import React, { useState } from 'react';

interface RegisterPacienteFormState {
  email: string;
  dni: string;
  apellido: string;
  nombre: string;
  telefono: string;
  direccion: string;
  obraSocial: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterPacienteFormState>({
    email: '',
    dni: '',
    apellido: '',
    nombre: '',
    telefono: '',
    direccion: '',
    obraSocial: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario al backend o realizar las acciones necesarias
    console.log(formData);
  };

  return (
    <div>
      <h2>Registro de Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="dni">DNI:</label>
          <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="direccion">Dirección:</label>
          <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="obraSocial">Obra Social:</label>
          <input type="text" id="obraSocial" name="obraSocial" value={formData.obraSocial} onChange={handleChange} required />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
