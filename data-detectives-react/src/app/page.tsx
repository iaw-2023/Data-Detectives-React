import React from 'react';
import NavScrollExample from './Navbar';
import Container from './Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage: React.FC = () => {
  return (
    <div>
      <NavScrollExample />
      <Container>
        <h1>Bienvenido a tu Aplicación de Turnos Médicos</h1>
      </Container>
    </div>
  );
};

export default HomePage;
