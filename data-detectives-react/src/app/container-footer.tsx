import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ContainerFooterProps {
  children?: ReactNode;
}

const ContainerFooter: React.FC<ContainerFooterProps> = ({ children }) => {

  return <div >{children}</div>;
};

export default ContainerFooter;