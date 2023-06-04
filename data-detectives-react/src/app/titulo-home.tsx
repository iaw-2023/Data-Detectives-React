import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface TituloHomeProps {

}

const TituloHome: React.FC<TituloHomeProps> = () => {
  const titulo = "Administra tus citas médicas de manera eficiente y cómoda"
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const tituloStyle: React.CSSProperties = {
    fontSize: isTabletOrMobile ? '1rem' : '2rem',
    marginTop: '5',
  };

  return <h1 style={tituloStyle}>{titulo}</h1>;
};

export default TituloHome;
