import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';

interface CardTurnosAsignadosProps {
  children?: ReactNode;
}

const CardTurnosAsignados: React.FC<CardTurnosAsignadosProps> = ({ children }) => {
  return (
    <>
      {[
        'Dark',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          className="mb-2"
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default CardTurnosAsignados;
