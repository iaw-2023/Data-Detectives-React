"use client";
import React, { useState } from 'react';
import { Profesional, InputDNIProfesionalProps } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, ListGroup } from 'react-bootstrap';
import CardComponent from '../card';
import CenteredDiv from '../reservar/centeredDiv';
import Container from '../container-fondo';
import { useRouter } from "next/navigation";
import Spinner from 'react-bootstrap/Spinner'

const InputDNIProfesional: React.FC<InputDNIProfesionalProps> = ({ onSelectProfesional }) => {
  const [dni, setDNI] = useState('');
  const [profesional, setProfesional] = useState<Profesional | null>(null);
  const [encontrado, setEncontrado] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [noPuedeContinuar, setNoPuedeContinuar] = useState<boolean>(false);

  const router = useRouter();

  const buscarProfesional = async () => {
    try {
        setLoading(true);
        const response_professional = await fetch(
            `https://data-detectives-laravel-1kywjtt0d-data-detectives.vercel.app/rest/profesionalPorDNI/${dni}`
          );
          if (!response_professional.ok) {
            setEncontrado(false);
          }else {
            const data_professional = await response_professional.json();
            setProfesional(data_professional.data);
            setNoPuedeContinuar(false);
            setEncontrado(true);
            setLoading(false);
          }
        }
        catch {
        }
    }  
    
  const handleNextPage = () => {
    if (profesional && encontrado) {
      onSelectProfesional(profesional);
    } else {
      setNoPuedeContinuar(true);
      console.log("Debe ingresar su DNI y buscar antes de continuar.");
    }       
  };

  const handleBack = () => {
    router.back()
  };
    

  return (
    <Container>
      <Button className="btn mt-2" variant="outline-dark" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv>
          {!encontrado && (
            <Alert variant="danger" style={{ width: "40rem" }}>No existe un paciente con el DNI ingresado.</Alert>
          )}
          {noPuedeContinuar && (
            <Alert variant="danger" style={{ width: "40rem" }}>No puede continuar sin ingresar un DNI valido.</Alert>
          )}
         <CardComponent>
          <h3 className='text-white text-center mt-3'>Ingrese su DNI:</h3>
          <input type="text" className='text-dark text-center' value={dni} onChange={(e) => setDNI(e.target.value)} />
          {!loading && (
            <Button className="btn mt-2" variant="dark" onClick={buscarProfesional}>Buscar</Button>
          )}
          {loading && (
            <Spinner as="span" animation="border" variant="info" role="status" aria-hidden="true" className="mx-auto mt-2" /> 
          )}
          {profesional && (
            <ListGroup>
              <ListGroup.Item className='text-white bg-dark' variant="info">Nombre: {profesional.nombre}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Apellido: {profesional.apellido}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Mail: {profesional.email}</ListGroup.Item>
            </ListGroup>
          )}           
        </CardComponent>
        <Button variant="outline-dark" className="mt-3" onClick={handleNextPage}>
          Ver agenda
        </Button>
      </CenteredDiv>
    </Container>
  );
};

export default InputDNIProfesional;