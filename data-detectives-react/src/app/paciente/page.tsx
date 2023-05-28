"use client"
import React, { useContext } from 'react';
import NavScroll from '../navbar';
import Container from '../container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';

const HomePage: React.FC = () => {
    return (
      <div>
        <NavScroll />
        <Container>
          <h1 className='mt-3'>Administra tus citas médicas de manera eficiente y cómoda</h1>
          <Row>
            <Col>
              <Card className="mt-3 bg-dark text-white" style={{ width: '30rem', height: '30rem' }}>
                <Card.Img variant="top" src={'/imgs/pic-card.jpg'} style={{ width: '30rem', height: '25rem' }} />
                <Card.Body>
                  <Card.Title>Reservar turno</Card.Title>
                  <Card.Text>
                    Aquí podrás seleccionar la especialidad y te mostraremos los profesionales y sus turnos disponibles
                  </Card.Text>
                  <Button href="/inputPaciente" variant="info">Reservar</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mt-3 bg-dark text-white" style={{ width: '30rem', height: '30rem' }}>
                <Card.Img variant="top" src={'/imgs/pic-card-2.jpg'} style={{ width: '30rem', height: '20rem' }} />
                <Card.Body>
                  <Card.Title>Consultar turnos asignados</Card.Title>
                  <Card.Text>
                    Aquí podrás visualizar los turnos reservados anteriormente
                  </Card.Text>
                  <Button className="mt-4" href="/consultar" variant="info">Consultar</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

export default HomePage;
