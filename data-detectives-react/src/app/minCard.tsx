import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import Card from 'react-bootstrap/Card';

interface MinCardComponentProps {
  children?: ReactNode;
}

const MinCardComponent: React.FC<MinCardComponentProps> = ({ children }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <>
      {[
        'Dark',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: isMobile ? '100%' : '40rem', height: isMobile ? 'auto' : '14rem' }}
          className={`mt-2 border-light ${isMobile ? 'p-3' : ''}`}
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default MinCardComponent;

