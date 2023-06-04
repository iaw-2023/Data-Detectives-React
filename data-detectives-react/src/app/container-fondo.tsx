import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ContainerProps {
  children?: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });

  const backgroundImageUrl = '/imgs/fondo-reserva.jpg';

  const divStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: isDesktopOrLaptop ? 'auto' : 'visible',
  };

  return <div style={divStyle}>{children}</div>;
};

export default Container;

