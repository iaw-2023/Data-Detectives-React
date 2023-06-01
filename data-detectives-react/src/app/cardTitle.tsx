import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';

interface CardTitleProps {
  children?: ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return (
    <>
      {[
        'Dark',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '40rem', height: '4rem' }}
          className="mb-2"
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default CardTitle;
