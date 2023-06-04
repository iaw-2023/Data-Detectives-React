import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import Card from 'react-bootstrap/Card';

interface MinCardComponentProps {
  children?: ReactNode;
}

const MinCardComponent: React.FC<MinCardComponentProps> = ({ children }) => {

  return (
    <>
      {[
        'Dark',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          className="mt-2 border-light min-card-component"
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default MinCardComponent;

