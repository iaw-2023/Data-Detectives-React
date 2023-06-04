import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive'

interface ContainerHomePageProps {
  children?: ReactNode;
}

const ContainerHomePage: React.FC<ContainerHomePageProps> = ({ children }) => {
  
  return <div className="float-end container-home-page">{children}</div>;
};

export default ContainerHomePage;
