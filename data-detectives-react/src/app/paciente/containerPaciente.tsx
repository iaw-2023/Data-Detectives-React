import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive'

interface ContainerPacienteProps {
  children?: ReactNode;
}

const ContainerPaciente: React.FC<ContainerPacienteProps> = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const containerStyle: React.CSSProperties = {
     display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    padding: '20px',
    width: '100%',
    height: '100%',
  };
  
  if (isDesktopOrLaptop) {
    containerStyle.width = '800px';
  }
  
  if (isBigScreen) {
    containerStyle.width = '1000px';
  }
  
  if (isTabletOrMobile) {
    containerStyle.width = '100%';
    containerStyle.padding = '10px';
  }
  
  if (isPortrait) {
    containerStyle.width = '100%';
  }
  
  if (isRetina) {
    containerStyle.width = '1200px';
  }
  

  return <div className="float-end" style={containerStyle}>{children}</div>;
};

export default ContainerPaciente;
