import React, { ReactNode } from 'react';

interface ContainerPacienteProps {
  children?: ReactNode;
}

const ContainerPaciente: React.FC<ContainerPacienteProps> = ({ children }) => {

  const divStyle: React.CSSProperties = {
    marginBottom: '50px'
  };
  

  return <div className="float-end" style={divStyle}>{children}</div>;
};

export default ContainerPaciente;
