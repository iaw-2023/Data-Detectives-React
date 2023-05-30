"use client";
import React, { useState } from 'react';
import { Paciente, InputDNIPacienteProps } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup } from 'react-bootstrap';
import DarkDiv from '../darkDiv';
import CenteredDiv from './centeredDiv';
import CardComponent from '../card';

const InputDNIPacientePage: React.FC<InputDNIPacienteProps> = ({ onSelectPaciente }) => {
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

    const handleNextPage = () => {
      if (paciente) {
        if (typeof onSelectPaciente === 'function') {
          onSelectPaciente(paciente);
        } else {
          console.log("onSelectPaciente is not a function");
        }
      } else {
        console.log("Debe ingresar su DNI y buscar antes de continuar.");
      }
    };
    

  return (
    <DarkDiv>
      <CenteredDiv>
         <CardComponent>
          <h3 className='text-white text-center mt-3'>Ingrese su DNI:</h3>
          <input type="text" className='text-white text-center' value={dni} onChange={(e) => setDNI(e.target.value)} />
          <Button className="btn mt-2" variant="outline-info" onClick={buscarPaciente}>Buscar</Button>
          {paciente && (
            <ListGroup>
              <h3 className='text-white mt-2 text-center'></h3>
              <ListGroup.Item className='text-white bg-dark' variant="info">Nombre: {paciente.nombre_paciente}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Apellido: {paciente.apellido_paciente}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Dirección: {paciente.direccion_paciente}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Teléfono: {paciente.telefono_paciente}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Email: {paciente.email_paciente}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Obra Social: {paciente.obra_social}</ListGroup.Item>
            </ListGroup>
          )}
        </CardComponent>
        <Button variant="dark" className="mt-3" onClick={handleNextPage}>
          Confirmar identidad
        </Button>
      </CenteredDiv>
    </DarkDiv>
  );
};

export default InputDNIPacientePage;
