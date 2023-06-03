"use client";
import React, { useState } from 'react';
import { Paciente, InputDNIPacienteProps } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, ListGroup, Spinner } from 'react-bootstrap';
import CenteredDiv from '../reservar/centeredDiv';
import CardComponent from '../card';
import { useRouter } from "next/navigation";
import Container from '../container-fondo';


const InputDNIPacientePage: React.FC<InputDNIPacienteProps> = ({ onSelectPaciente }) => {
  const [dni, setDNI] = useState('');
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [encontrado, setEncontrado] = useState<boolean>(true);
  const [noPuedeContinuar, setNoPuedeContinuar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const buscarPaciente = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://data-detectives-laravel-git-new-api-data-detectives.vercel.app/rest/pacientePorDNI/${dni}`);
      if (!response.ok) {
        setEncontrado(false);
        setPaciente(null);
      }
      else {
        setNoPuedeContinuar(false);
        setEncontrado(true);
        setLoading(false);
        const data = await response.json();
        if (data?.data)
          setPaciente(data.data);
      }
    } catch (error) {
      console.log(error);
    }
    };

    const handleNextPage = () => {
      if (paciente && encontrado) {
        onSelectPaciente(paciente);
      } else {
        setNoPuedeContinuar(true);
      }
    };

    const handleBack = () => {
      router.back()
    };
    
    const handleChangeDNI = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDNI(e.target.value);
      setPaciente(null);
    }
    
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
          <input type="text" className='text-black text-center' value={dni} onChange={handleChangeDNI} />
          {!loading && (
            <Button className="btn mt-2" variant="dark" onClick={buscarPaciente}>Buscar</Button>
          )}
          {loading && (
            <Spinner as="span" animation="border" variant="info" role="status" aria-hidden="true" className="mt-2 mx-auto" /> 
          )}
          {paciente && (
            <ListGroup>
              <ListGroup.Item className='text-white bg-dark' variant="info">Nombre: {paciente.nombre_paciente}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Apellido: {paciente.apellido_paciente}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Dirección: {paciente.direccion_paciente}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Teléfono: {paciente.telefono_paciente}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Email: {paciente.email_paciente}</ListGroup.Item>
              <ListGroup.Item className='text-white bg-dark'>Obra Social: {paciente.obra_social}</ListGroup.Item>
            </ListGroup>
          )}
        </CardComponent>
        <Button variant="outline-dark" className="mt-3" onClick={handleNextPage}>
          Confirmar identidad
        </Button>
      </CenteredDiv>
    </Container>
  );
};

export default InputDNIPacientePage;
