import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface TituloHomeProps {
}

const TituloHome: React.FC<TituloHomeProps> = () => {
  const titulo = "Administra tus citas médicas de manera eficiente y cómoda"

  return <h1 className="titulo-home">{titulo}</h1>;
};

export default TituloHome;
