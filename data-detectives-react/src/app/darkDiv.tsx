import React, { ReactNode } from 'react';

interface DarkDivProps {
  children?: ReactNode;
}

const DarkDiv: React.FC<DarkDivProps> = ({ children }) => {
  const backgroundImageUrl = '/imgs/fondo.jpg';

  const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
  };

  return <div className="container bg-dark modal-fullscreen-xxl-down float-end" style={divStyle}>{children}</div>;
};

export default DarkDiv;
