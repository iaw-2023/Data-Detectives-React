import React, { ReactNode } from 'react';

interface ContainerPacienteProps {
  children?: ReactNode;
}

const ContainerPaciente: React.FC<ContainerPacienteProps> = ({ children }) => {


  return <div className="float-end container-paciente" >{children}</div>;
};

export default ContainerPaciente;
