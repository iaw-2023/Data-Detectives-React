import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ContainerFooterProps {
  children?: ReactNode;
}

const ContainerFooter: React.FC<ContainerFooterProps> = ({ children }) => {

  const divStyle: React.CSSProperties = {
    
  };

  return <div style={divStyle}>{children}</div>;
};

export default ContainerFooter;