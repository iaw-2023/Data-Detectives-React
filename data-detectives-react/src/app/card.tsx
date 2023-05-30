import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';

interface CardComponentProps {
  children?: ReactNode;
}

const CardComponent: React.FC<CardComponentProps> = ({ children }) => {
  return (
    <>
      {[
        'Dark',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '30rem', height: '30rem' }}
          className="mb-2"
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default CardComponent;
