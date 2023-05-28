"use client";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface NavScrollProps {} 

const NavScroll: React.FC<NavScrollProps> = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>HealthTime</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link>Inicio</Nav.Link>
            <Nav.Link href="/aboutUs">Sobre nosotros</Nav.Link>
            <Nav.Link href="/profesional">Profesional</Nav.Link>
            <Nav.Link href="/paciente">Paciente</Nav.Link>
            <Nav.Link href="/reservar">Reservar turno</Nav.Link>
            <Nav.Link href="/asignados">Ver turnos asignados</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavScroll;
