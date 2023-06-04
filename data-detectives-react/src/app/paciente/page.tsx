"use client"
import React from 'react';
import NavScroll from '../mynavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ContainerHomePage from '../container-fondo-homePage';
import Link from 'next/link';
import ContainerPaciente from './containerPaciente';
import Footer from '../footer';



const HomePage: React.FC = () => {

    return (
      <div className="content-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ContainerHomePage>
        <NavScroll />
          <ContainerPaciente>
            <h1 className='mt-2'>
              Administra tus citas médicas 
              <br />
              de manera eficiente y cómoda</h1>     
            <Card className="mt-2 bg-light text-dark" style={{ width: '25rem', height: '12rem' }}>
              <Card.Body>
                <Card.Title>Reservar turno</Card.Title>
                <Card.Text>
                  Aquí podrás seleccionar la especialidad y te mostraremos los profesionales y sus turnos disponibles
                </Card.Text>
                <Button className='btn-dark'>
                  <Link className='text-decoration-none text-white' href="/reservar">Reservar turno</Link>
                </Button>
              </Card.Body>
            </Card>
            <Card className="mt-2 bg-white text-dark" style={{ width: '25rem', height: '11rem' }}>
              <Card.Body>
                <Card.Title>Consultar turnos asignados</Card.Title>
                <Card.Text>
                  Aquí podrás visualizar los turnos reservados anteriormente
                </Card.Text>
                <Button className='btn-dark mt-1'>
                  <Link className='text-decoration-none text-white' href="/turnosAsignados">Ver turnos asignados</Link>
                </Button>
              </Card.Body>
            </Card>
          </ContainerPaciente>  
        </ContainerHomePage>
        <Footer />
      </div>
    );
  };

export default HomePage;
