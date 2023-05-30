"use client";
import React, { useState } from 'react';
import { Paciente, InputDNIPacienteProps } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import DarkDiv from '../darkDiv';
import CenteredDiv from '../reservar/centeredDiv';
import CardComponent from '../card';

const InputDNIPaciente: React.FC<InputDNIPacienteProps> = ({ onSelectPaciente }) => {
  const [dni, setDNI] = useState('');
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  const buscarPaciente = async () => {
    try {
      const response = await fetch(`https://data-detectives-laravel-git-new-api-data-detectives.vercel.app/rest/pacientePorDNI/${dni}`);
      const data = await response.json();
      console.log(data);
      if (data?.data) {
        setPaciente(data.data);
      } else {
        console.log("La API no contiene un Paciente con este DNI:", data);
      }
    } catch (error) {
      console.log(error);
    }
        console.log(paciente);
    };

    const handleNext = () => {
      if (paciente)
        onSelectPaciente(paciente);
    };

  return (
    <DarkDiv>
      <CenteredDiv>
         <CardComponent>
          <h2 className='text-white text-center mt-3'>Ingrese el DNI:</h2>
          <input type="text" className='inputPaciente' value={dni} onChange={(e) => setDNI(e.target.value)} />
          <Button onClick={buscarPaciente}>Buscar</Button>
          {paciente && (
            <div>
              <h3 className='text-white'>Paciente encontrado:</h3>
              <p className='text-white'>Nombre: {paciente.nombre_paciente}</p>
              <p className='text-white'>Apellido: {paciente.apellido_paciente}</p>
              <p className='text-white'>Dirección: {paciente.direccion_paciente}</p>
              <p className='text-white'>Teléfono: {paciente.telefono_paciente}</p>
              <p className='text-white'>Email: {paciente.email_paciente}</p>
              <p className='text-white'>Obra Social: {paciente.obra_social}</p>
              <Button variant="dark" className="mt-3" onClick={handleNext}>
                Siguiente
              </Button>
            </div>
          )}
        </CardComponent>
      </CenteredDiv>
    </DarkDiv>
  );
};

export default InputDNIPaciente;
