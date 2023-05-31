"use client"
import React, { useContext } from 'react';
import NavScroll from '../Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import ContainerHomePage from '../container-fondo-homePage';
import Link from 'next/link';

const HomePage: React.FC = () => {

    return (
      <ContainerHomePage>
        <NavScroll />
          <h2 className='mt-3'>Administra tus citas médicas de manera eficiente y cómoda</h2>
            <Row>
            <Col>
              <Card className="mt-3 bg-dark text-white" style={{ width: '30rem', height: '30rem' }}>
                <Card.Body>
                  <Card.Title>Reservar turno</Card.Title>
                  <Card.Text>
                    Aquí podrás seleccionar la especialidad y te mostraremos los profesionales y sus turnos disponibles
                  </Card.Text>
                  <Button>
                    <Link className='text-decoration-none text-black' href="/reservar">Reservar turno</Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mt-3 bg-dark text-white" style={{ width: '30rem', height: '30rem' }}>
                <Card.Body>
                  <Card.Title>Consultar turnos asignados</Card.Title>
                  <Card.Text>
                    Aquí podrás visualizar los turnos reservados anteriormente
                  </Card.Text>
                  <Button>
                    <Link className='text-decoration-none text-black' href="/asignados">Ver turnos asignados</Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
      </ContainerHomePage>
    );
  };

export default HomePage;
