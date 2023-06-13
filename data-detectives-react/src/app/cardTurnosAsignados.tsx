import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';
import { useMediaQuery } from 'react-responsive';

interface CardTurnosAsignadosProps {
  children?: ReactNode;
}

const CardTurnosAsignados: React.FC<CardTurnosAsignadosProps> = ({ children }) => {

  return (
    <>
      {['Dark'].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          className="mb-2 card-turnos-asignados"
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default CardTurnosAsignados;

