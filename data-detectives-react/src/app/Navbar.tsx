"use client";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';

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
            <Nav.Link>
              <Link href="/aboutUs">Sobre nosotros</Link>
            </Nav.Link>
            <Nav.Link>
              <Link href="/profesional">Profesional</Link>
            </Nav.Link>
            <NavDropdown title="Paciente" id="navbarScrollingDropdown">
              <NavDropdown.Item >
                <Link href="/reservar">Reservar un turno</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/asignados">Turnos asignados</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              Especialidades
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavScroll;
