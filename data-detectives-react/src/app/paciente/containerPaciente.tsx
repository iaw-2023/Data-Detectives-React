import React, { ReactNode } from 'react';

interface ContainerPacienteProps {
  children?: ReactNode;
}

const ContainerPaciente: React.FC<ContainerPacienteProps> = ({ children }) => {

    const divStyle : React.CSSProperties = {
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

export default ContainerPaciente;
