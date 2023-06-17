"use client";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { Button, Offcanvas } from 'react-bootstrap';
import { useUser } from '@auth0/nextjs-auth0/client';


interface NavScrollProps {} 

const NavScroll: React.FC<NavScrollProps> = () => {

  //const { user, isLoading } = useUser();
  return (
    <>
    { ['lg'].map((expand) => (
      <Navbar key={expand} bg="light" expand={expand} className="mb-3 navbar-home">
      <Container fluid>
        <Box boxSize='sm'>
          <Image src='/imgs/htlogo.png' />
        </Box>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Navegación
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Button className="btn-light">
                      <Link className='text-decoration-none text-black' href="/">Inicio</Link>
                  </Button >
                  <Button className="btn-light">
                    <Link className='text-decoration-none text-black' href="/profesional">Profesional</Link>
                  </Button>
                  <Button className="btn-light">
                    <Link className='text-decoration-none text-black' href="/paciente">Paciente</Link>
                  </Button>
                  <Button className="btn-light">
                    <Link className='text-decoration-none text-black' href="/nosotros" passHref>Sobre nosotros</Link>
                  </Button>
                  <Button className="btn-light">
                    <Link className="text-decoration-none text-black" href="/api/auth/login"> Login </Link>
                  </Button>
                </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>    
  ))}
  </>
 );
};

export default NavScroll;
