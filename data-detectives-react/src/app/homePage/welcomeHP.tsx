"use client";
import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface WelcomeHPProps {
    children: ReactNode;
}

const WelcomeHP: React.FC<WelcomeHPProps> = ({ children }) => {
    const h1Style = {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      fontSize: '24px',
      position: 'absolute', // Establecer la posición absoluta
      top: '50%', // Colocar el elemento en el 50% de la altura del contenedor
      left: '50%', // Colocar el elemento en el 50% del ancho del contenedor
      transform: 'translate(-50%, -50%)', // Centrar el elemento correctamente
    };
  
    return <h1 style={h1Style}>{children}</h1>;
};

export default WelcomeHP;

