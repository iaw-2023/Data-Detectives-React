"use client";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ContainerHomePage from "../container-fondo-homePage";
import { Card, Container, ListGroup, Table } from "react-bootstrap";
import NavScroll from "../mynavbar";
import Footer from "../footer";
import { Paciente, Profesional } from "../types";
import { getUserType } from "../api/api";
import { useRouter } from "next/navigation";
import ModalAlert from "../Alert";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [profesional, setProfesional] = useState<Profesional | null>(null);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageModal, setMessage] = useState<string>("");
  const router = useRouter();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          console.log(token);
          const user = await getUserType(token);
          if (user.tipo_usuario === "paciente") {
            const response = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/pacientePorEmail', {
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
          if (user.tipo_usuario === "profesional") {
            const response = await fetch('https://data-detectives-laravel-git-promo-data-detectives.vercel.app/rest/profesionalPorEmail', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },      
              }     
            );
            if (response.ok) {
              const data = await response.json();
              setProfesional(data.data);
            } else {
              console.error("Error al obtener los datos del profesional");
            }
          }
          if (user.tipo_usuario === "no registrado") {
            router.push("/register");
          }
          
        }
      } catch (error) {
        console.error("Error al realizar la solicitud a la API", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {   
    if (!isAuthenticated) {
      setMessage("Debes iniciar sesion para ver tu perfil");
      setShowMessage(true);
      setRedirectToLogin(true);
    }  
   }, [isAuthenticated])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleBackModal = () => {
    if (redirectToLogin) {
      setRedirectToLogin(false);
      setShowMessage(false);
      loginWithRedirect();
    } 
    else 
      router.push("/");
  };
  
  const handleCloseModal = () => {
    router.push("/");
  };
  

  return (
    <ContainerHomePage>
        <NavScroll />
        <ModalAlert
          show={showMessage}
          onClose={handleCloseModal}
          onBack={handleBackModal}
          message={messageModal}
        />
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
        {profesional && (  
          <Card className="card-profile bg-dark text-white">  
          <Card.Title className="text-center">Perfil de usuario</Card.Title>       
              <>  
                <img src="/imgs/medico.jpg" className="src-img"/>
                <ListGroup variant="flush">
                  <ListGroup.Item className="bg-dark text-white">DNI: {profesional.DNI}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Nombre: {profesional.nombre}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Apellido: {profesional.apellido}</ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">Teléfono: {profesional.email}</ListGroup.Item>
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
