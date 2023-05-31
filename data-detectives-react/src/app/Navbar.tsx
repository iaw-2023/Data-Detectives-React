"use client";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Box, Image } from '@chakra-ui/React';
import Link from 'next/link';
import { Button } from 'react-bootstrap';


interface NavScrollProps {} 

const NavScroll: React.FC<NavScrollProps> = () => {

  return (
    <Navbar className="bg-light" expand="lg">
      <Container fluid>
        <Box boxSize='sm'>
          <Image src='/imgs/htlogo.png' />
        </Box>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 gap-2" style={{ maxHeight: '100px' }} navbarScroll>
            <Button className="btn-light">
              <Link className='text-decoration-none text-black' href="/">Inicio</Link>
            </Button >
            <Button className="btn-light">
              <Link className='text-decoration-none text-black' href="/profesional">Profesional</Link>
            </Button>
            <Button className="btn-light">
              <Link className='text-decoration-none text-black' href="/paciente">Paciente</Link>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavScroll;
