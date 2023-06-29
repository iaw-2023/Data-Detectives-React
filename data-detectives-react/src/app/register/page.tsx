"use client";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import CenteredDiv from '../reservar/centeredDiv';
import Container from '../container-fondo';
import { userRegister } from '../api/api';
import ModalAlert from '../Alert';
import { useRouter } from "next/navigation";
import CardComponent from '../card';
import { useAuth0 } from '@auth0/auth0-react';
import { userAgent } from 'next/server';

interface RegisterPacienteFormState {
  email: string | undefined;
  dni: number | undefined;
  apellido: string;
  nombre: string;
  telefono: number | undefined;
  direccion: string;
  obraSocial: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterPacienteFormState>({
    email: '',
    dni: undefined,
    apellido: '',
    nombre: '',
    telefono: undefined,
    direccion: '',
    obraSocial: '',
  });
  const [showMessage, setShowMessage] = useState(false);
  const [ messageModal, setMessage ] = useState<string>("");
  const [route, setRoute] = useState<string>("/");
  const router = useRouter();
  const { getAccessTokenSilently } = useAuth0();
  const { isAuthenticated } = useAuth0();
  const { loginWithPopup } = useAuth0();
  const { user } = useAuth0();
  
  
  useEffect(() => {   
    if (!isAuthenticated) {
      loginWithPopup();
    } else {
        formData.email = user?.email;
    }
  }, [isAuthenticated])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = {
      nombrePaciente: formData.nombre,
      apellidoPaciente: formData.apellido,
      DNIPaciente: formData.dni,
      direccionPaciente: formData.direccion,
      telefonoPaciente: formData.telefono,
      emailPaciente: formData.email,
      obraSocial: formData.obraSocial,
    };
    const token = await getAccessTokenSilently(); 
    const registerResponse = await userRegister(token,requestBody);
    setShowMessage(true);
    setMessage(registerResponse.message); 
    setRoute("/"); 
  };
  
  const handleCloseModal = () => {
    setShowMessage(false);
  };
  
  const handleBackModal = () => {
    router.push(route);
  };
  

  return (
    <Container>    
    <ModalAlert show={showMessage} onClose={handleCloseModal} onBack={handleBackModal} message={messageModal}/>
      <CenteredDiv>
      { isAuthenticated && 
        (<CardComponent>
          <h2 style={{ color: 'white' }}>Registro de Paciente</h2>          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" value={user?.email} onChange={handleChange} required style={{ marginBottom: '10px' }} disabled />
            </Form.Group>
            <Form.Group controlId="dni" className="mb-3">
              <Form.Label>DNI:</Form.Label>
              <Form.Control type="number" name="dni" value={formData.dni} onChange={handleChange} required style={{ marginBottom: '10px' }} />
            </Form.Group>
            <Form.Group controlId="apellido" className="mb-3">
              <Form.Label>Apellido:</Form.Label>
              <Form.Control type="text" name="apellido" value={formData.apellido} onChange={handleChange} required style={{ marginBottom: '10px' }} />
            </Form.Group>
            <Form.Group controlId="nombre" className="mb-3">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required style={{ marginBottom: '10px' }} />
            </Form.Group>
            <Form.Group controlId="telefono" className="mb-3">
              <Form.Label>Teléfono:</Form.Label>
              <Form.Control type="number" name="telefono" value={formData.telefono} onChange={handleChange} required style={{ marginBottom: '10px' }} />
            </Form.Group>
            <Form.Group controlId="direccion" className="mb-3">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange} required style={{ marginBottom: '10px' }} />
            </Form.Group>
            <Form.Group controlId="obraSocial" className="mb-4">
              <Form.Label>Obra Social:</Form.Label>
              <Form.Control type="text" name="obraSocial" value={formData.obraSocial} onChange={handleChange} required style={{ marginBottom: '10px' }} />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit">Registrarse</Button>
            </div>
          </Form>
        </CardComponent>) }
      </CenteredDiv>      
    </Container>
  );
  
};

export default RegisterPage;
