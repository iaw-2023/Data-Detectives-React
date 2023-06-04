import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';
import { useMediaQuery } from 'react-responsive';

interface CardTurnosAsignadosProps {
  children?: ReactNode;
}

const CardTurnosAsignados: React.FC<CardTurnosAsignadosProps> = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const cardStyle: React.CSSProperties = {
    width: isTabletOrMobile ? '100%' : isDesktopOrLaptop ? '40rem' : '20rem',
    height: isTabletOrMobile ? 'auto' : isDesktopOrLaptop ? 'auto' : 'auto',
  };

  return (
    <>
      {['Dark'].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={cardStyle}
          className="mb-2"
        >
          {children}
        </Card>
      ))}
    </>
  );
};

export default CardTurnosAsignados;

