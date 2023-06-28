"use client";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ContainerHomePage from "../container-fondo-homePage";
import { Card, Container, ListGroup, Table } from "react-bootstrap";
import NavScroll from "../mynavbar";
import Footer from "../footer";
import { Paciente } from "../types";

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  

  useEffect(() => {
    const fetchPacienteData = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          const response = await fetch("https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/pacientePorEmail", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setPaciente(data.data);
          } else {
            console.error("Error al obtener los datos del paciente");
          }
        }
      } catch (error) {
        console.error("Error al realizar la solicitud a la API", error);
      }
    };

    fetchPacienteData();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!isAuthenticated) {
    loginWithRedirect();
    return null; // Mostrar un componente de carga mientras redirige
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <ContainerHomePage>
        <NavScroll />
        { isAuthenticated && (
        <Container className="container-profile">
        {paciente && (  
          <Card className="card-profile bg-dark text-white">  
          <Card.Title className="text-center">Perfil de usuario</Card.Title>       
              <>  
                <img src={paciente.url_image} className="src-img"/>
                <ListGroup variant="flush">
                  <ListGroup.Item className="bg-dark text-white">DNI: {paciente.DNI}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Nombre: {paciente.nombre_paciente}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Apellido: {paciente.apellido_paciente}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Teléfono: {paciente.telefono_paciente}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Obra Social: {paciente.obra_social}</ListGroup.Item>
                </ListGroup>
              </>
          </Card>
        )}
        </Container>
        )}
        <Footer />
    </ContainerHomePage>
  );
};

export default Profile;
