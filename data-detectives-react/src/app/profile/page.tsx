"use client";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ContainerHomePage from "../container-fondo-homePage";
import { Card, Container } from "react-bootstrap";
import NavScroll from "../mynavbar";
import Footer from "../footer";
import { Paciente } from "../types";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  useEffect(() => {
    const fetchPacienteData = async () => {
      try {
        // Realiza la solicitud a la API para obtener los datos del paciente
        const response = await fetch("URL_DE_TU_API_AQUI");
        if (response.ok) {
          const data = await response.json();
          setPaciente(data);
        } else {
          console.error("Error al obtener los datos del paciente");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud a la API", error);
      }
    };

    if (isAuthenticated) {
      fetchPacienteData();
    }
  }, [isAuthenticated]);

  return (
    <ContainerHomePage>
        <NavScroll />
        { isAuthenticated && (
        <Container className="container-profile">
        <Card className="card-profile bg-dark text-white">
            <img src={user?.picture} alt={user?.name} />
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
        </Card>
        </Container>
        )}
        <Footer />
    </ContainerHomePage>
  );
};

export default Profile;

/*
<p>Datos del paciente:</p>
            <p>ID: {paciente.id}</p>
            <p>DNI: {paciente.DNI}</p>
            <p>Nombre: {paciente.nombre_paciente}</p>
            <p>Apellido: {paciente.apellido_paciente}</p>
            <p>Dirección: {paciente.direccion_paciente}</p>
            <p>Teléfono: {paciente.telefono_paciente}</p>
            <p>Email: {paciente.email_paciente}</p>
            <p>Obra Social: {paciente.obra_social}</p>
 */