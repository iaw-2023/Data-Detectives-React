import React, { ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const backgroundImageUrl = '/imgs/fondo.jpg';

  const divStyle : React.CSSProperties = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  return <div  style={divStyle}>{children}</div>;
};

export default Container;
