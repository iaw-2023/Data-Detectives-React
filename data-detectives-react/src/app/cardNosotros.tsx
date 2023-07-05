import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';
import { useMediaQuery } from 'react-responsive';

interface CardNosotrosProps {
  children?: ReactNode;
}

const CardNosotros: React.FC<CardNosotrosProps> = ({ children }) => {

  return (
    <>
      {['Dark'].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          className="card-nosotros"
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default CardNosotros;