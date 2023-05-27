import React, { ReactNode } from 'react';

interface DarkDivProps {
  children?: ReactNode;
}

const DarkDiv: React.FC<DarkDivProps> = ({ children }) => {
  return <div className="container bg-dark modal-fullscreen-xxl-down float-end">{children}</div>;
};

export default DarkDiv;