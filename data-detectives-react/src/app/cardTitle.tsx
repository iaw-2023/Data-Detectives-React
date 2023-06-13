import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';
import { useMediaQuery } from 'react-responsive';

interface CardTitleProps {
  children?: ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ children }) => {

  return (
    <>
      {['Dark'].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          className="mb-2 card-title"
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default CardTitle;
