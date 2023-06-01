"use client";
import React, { useState } from 'react';
import { Profesional, InputDNIProfesionalProps } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup } from 'react-bootstrap';
import CardComponent from '../card';
import CenteredDiv from '../reservar/centeredDiv';
import Container from '../container-fondo';
import { useRouter } from "next/navigation";

const InputDNIProfesional: React.FC<InputDNIProfesionalProps> = ({ onSelectProfesional }) => {
  const [dni, setDNI] = useState('');
  const [profesional, setProfesional] = useState<Profesional | null>(null);
  
  const router = useRouter();

  const buscarProfesional = async () => {
    try {
        const response_professional = await fetch(
            `https://data-detectives-laravel-1kywjtt0d-data-detectives.vercel.app/rest/profesionalPorDNI/${dni}`
          );
          const data_professional = await response_professional.json();
    
          if (response_professional.ok) {
            setProfesional(data_professional.data);
            };
        }
        catch {
        }
    }  
    
    const handleNextPage = () => {
     if (profesional) {
        onSelectProfesional(profesional);
     }       
     };
     const handleBack = () => {
      router.back()
    };
    

  return (
    <Container>
      <Button className="btn mt-2" variant="outline-info" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv>
         <CardComponent>
          <h3 className='text-white text-center mt-3'>Ingrese su DNI:</h3>
          <input type="text" className='text-white text-center' value={dni} onChange={(e) => setDNI(e.target.value)} />
          <Button className="btn mt-2" variant="dark" onClick={buscarProfesional}>Buscar</Button>
          {profesional && (
            <ListGroup>
              <ListGroup.Item className='text-white bg-dark' variant="info">Nombre: {profesional.nombre}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Apellido: {profesional.apellido}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Mail: {profesional.email}</ListGroup.Item>
            </ListGroup>
          )}           
        </CardComponent>
        <Button variant="dark" className="mt-3" onClick={handleNextPage}>
          Ver agenda
        </Button>
      </CenteredDiv>
    </Container>
  );
};

export default InputDNIProfesional;