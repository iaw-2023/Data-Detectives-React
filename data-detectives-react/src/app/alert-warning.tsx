import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Alert } from 'react-bootstrap';

interface AlertWarningProps {
  mensaje: string;
}

const AlertWarning: React.FC<AlertWarningProps> = ({ mensaje }) => {

  useEffect(() => {
    const tiempoVisible = 3000;

    const timer = setTimeout(() => {}, tiempoVisible);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Alert
        variant="warning"
        className="alert-warning"
        dismissible
      >
      {mensaje}
      </Alert>
    </>
  );
};

export default AlertWarning;
