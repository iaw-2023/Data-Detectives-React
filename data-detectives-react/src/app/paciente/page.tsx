"use client";
import React from 'react';
import NavScroll from '../mynavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContainerHomePage from '../container-fondo-homePage';
import ContainerPaciente from './containerPaciente';
import Footer from '../footer';
import CardPaciente from './card-home-paciente';
import { Col, Row } from 'react-bootstrap';
import TituloHome from '../titulo-home';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

interface HomePageProps {
  user: User;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
  

  const isPacienteAuthenticated = user && user.userType === 'paciente';

  return (

      <div className="content-wrapper div-paciente">
          <ContainerHomePage>
            <NavScroll />
            <ContainerPaciente>
              <TituloHome></TituloHome>
              <Row>
                <Col>
                  <CardPaciente
                    title="Reservar turno"
                    description="Aquí podrás reservar turnos para la especialidad que desees"
                    buttonText="Reservar turno"
                    buttonLink="/reservar"
                    buttonDisabled={!isPacienteAuthenticated}
                    tooltipMessage="Debes iniciar sesión como paciente para acceder a esta funcionalidad"
                  />
                </Col>
                <Col>
                  <CardPaciente
                    title="Consultar turnos asignados"
                    description="Aquí podrás visualizar los turnos reservados anteriormente"
                    buttonText="Ver turnos asignados"
                    buttonLink="/turnosAsignados"
                    buttonDisabled={!isPacienteAuthenticated}
                    tooltipMessage="Debes iniciar sesión como paciente para acceder a esta funcionalidad"
                  />
                </Col>
              </Row>
            </ContainerPaciente>
          </ContainerHomePage>
          <Footer />
        </div>    

    );
};

export default HomePage;

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/login', // Redirige al usuario a la página de inicio de sesión si no está autenticado
  async getServerSideProps({ req, res }) {
    // Obtiene el usuario autenticado del `UserProvider`
    const { user } = useUser({ req });
    return { props: { user } };
  },
});

