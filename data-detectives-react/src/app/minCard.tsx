import React, { ReactNode } from 'react';
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
          style={{ width: '40rem', height: '14rem' }}
          className="mt-2 border-light"
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default MinCardComponent;
