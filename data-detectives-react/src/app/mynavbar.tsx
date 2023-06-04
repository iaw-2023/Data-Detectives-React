"use client";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'


interface NavScrollProps {} 

const NavScroll: React.FC<NavScrollProps> = () => {

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const navScrollStyle : React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
  };
  
  if (isDesktopOrLaptop) {
    navScrollStyle.padding = '20px';
    navScrollStyle.position = 'sticky';
    navScrollStyle.top = 0;
    navScrollStyle.zIndex = 100;
    navScrollStyle.maxWidth = '100%'; 
  }
  
  if (isBigScreen) {
    navScrollStyle.padding = '30px';
  }
  
  if (isTabletOrMobile) {
    navScrollStyle.flexDirection = 'column';
    navScrollStyle.padding = '10px 20px';
  }
  
  if (isPortrait) {
    navScrollStyle.padding = '15px';
  }
  
  if (isRetina) {
    navScrollStyle.padding = '40px';
  }
  return (
    <Navbar className="bg-light" expand="lg">
      <Container fluid>
        <Box boxSize='sm'>
          <Image src='/imgs/htlogo.png' />
        </Box>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 gap-2" style={{ maxHeight: '100px' }} >
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
