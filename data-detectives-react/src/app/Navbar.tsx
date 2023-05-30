"use client";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Box, Image } from '@chakra-ui/React';
import Link from 'next/link';


interface NavScrollProps {} 

const NavScroll: React.FC<NavScrollProps> = () => {

  return (
    <Navbar className="bg-light" expand="lg">
      <Container fluid>
        <Box boxSize='sm'>
          <Image src='/imgs/logo2.png' />
        </Box>
        <Navbar.Brand>HealthTime</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 gap-2" style={{ maxHeight: '100px' }} navbarScroll>
            <Link className='text-decoration-none text-black' href="/homePage">Inicio</Link>
            <Link className='text-decoration-none text-black' href="/aboutUs">Sobre nosotros</Link>
            <Link className='text-decoration-none text-black' href="/profesional">Profesional</Link>
            <Link className='text-decoration-none text-black' href="/paciente">Paciente</Link>
            <Link className='text-decoration-none text-black' href="/reservar">Reservar turno</Link>
            <Link className='text-decoration-none text-black' href="/asignados">Ver turnos asignados</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavScroll;
