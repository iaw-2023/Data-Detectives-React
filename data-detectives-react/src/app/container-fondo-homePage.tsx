import React, { ReactNode } from 'react';

interface ContainerHomePageProps {
  children?: ReactNode;
}

const ContainerHomePage: React.FC<ContainerHomePageProps> = ({ children }) => {
  const backgroundImageUrl = '/imgs/fondo-homePage.jpg';

  const divStyle : React.CSSProperties = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  return <div style={divStyle}>{children}</div>;
};

export default ContainerHomePage;
