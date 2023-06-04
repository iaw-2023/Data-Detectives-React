"use client"
import React from 'react';
import NavScroll from '../mynavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContainerHomePage from '../container-fondo-homePage';
import ContainerPaciente from './containerPaciente';
import Footer from '../footer';
import CardPaciente from './card-home-paciente';
import { Col, Row } from 'react-bootstrap';
import TituloHome from '../titulo-home';

const HomePage: React.FC = () => {

    return (
      <div className="content-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ContainerHomePage>
        <NavScroll />
          <ContainerPaciente>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TituloHome></TituloHome>             
            <Row>
              <Col>
                <CardPaciente
                  title='Reservar turno'
                  description='Aquí podrás reservar turnos para la especialidad que desees'
                  buttonLink='/reservar'
                  buttonText='Reservar turno'
                />
              </Col>
              <Col>
                <CardPaciente
                  title='Consultar turnos asignados'
                  description='Aquí podrás visualizar los turnos reservados anteriormente'
                  buttonLink='/turnosAsignados'
                  buttonText='Ver turnos asignados'
                />
              </Col>
            </Row>
          </div>
          </ContainerPaciente>  
        </ContainerHomePage>
        <Footer />
      </div>
    );
  };

export default HomePage;
