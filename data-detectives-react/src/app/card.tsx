import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';

interface CardComponentProps {
  children?: ReactNode;
}

const CardComponent: React.FC<CardComponentProps> = ({ children }) => {

  return (
    <>
      {['Dark'].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          className="mb-2 card-component p-5 mt-5"
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default CardComponent;

