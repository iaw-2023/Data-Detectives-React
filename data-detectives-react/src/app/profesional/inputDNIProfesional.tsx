"use client";
import React, { useState } from 'react';
import { Profesional, InputDNIProfesionalProps } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, ListGroup } from 'react-bootstrap';
import CardComponent from '../card';
import CenteredDiv from '../reservar/centeredDiv';
import Container from '../container-fondo';
import { useRouter } from "next/navigation";
import AppSpinner from '../app-spinner';
import AlertWarning from '../alert-warning';

const InputDNIProfesional: React.FC<InputDNIProfesionalProps> = ({ onSelectProfesional }) => {
  const [dni, setDNI] = useState('');
  const [profesional, setProfesional] = useState<Profesional | null>();
  const [encontrado, setEncontrado] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchRealizado, setFetchRealizado] = useState<boolean>(false);

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
            setEncontrado(true); 
          }
        }
        catch {
        }
        setLoading(false);
        setFetchRealizado(true);
    } 

    
  const handleNextPage = () => {
    if (profesional && encontrado) {
      onSelectProfesional(profesional);
    } 
    setLoading(false);
  };

  const handleBack = () => {
    router.back()
  };
  
  const handleChangeDNI = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDNI(e.target.value);
    setProfesional(null);
    setFetchRealizado(false);
  }
  

  return (
    <Container>
      <Button className="btn mt-2" variant="outline-dark" onClick={handleBack}>
        Back
      </Button>
      <CenteredDiv>
          {!encontrado && fetchRealizado && (
            <AlertWarning mensaje={"No existe un profesional con el DNI ingresado."} />
          )}      
         <CardComponent>
          <h3 className='text-white text-center mt-3'>Ingrese su DNI:</h3>
          <input type="text" className='text-dark text-center' value={dni} onChange={handleChangeDNI} />
          {loading ? (
            <AppSpinner loading={loading}></AppSpinner> ) :
             (<Button className="btn mt-2" variant="dark" onClick={buscarProfesional}>Buscar</Button>
          )}
          {profesional && (
            <ListGroup>
              <ListGroup.Item className='text-white bg-dark' variant="info">Nombre: {profesional ? profesional.nombre : ""}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Apellido: {profesional ? profesional.apellido : ""}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Mail: {profesional ? profesional.email : ""}</ListGroup.Item>
            </ListGroup>
          )}           
        </CardComponent>
        { encontrado && (
            <Button variant="outline-dark" className="mt-3" onClick={handleNextPage}>
               Ver agenda
            </Button>) 
        }        
      </CenteredDiv>
    </Container>
  );
};

export default InputDNIProfesional;