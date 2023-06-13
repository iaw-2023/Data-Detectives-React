import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ContainerProps {
  children?: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {

  return <div className="container-fondo">{children}</div>;
};

export default Container;

