import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Alert } from 'react-bootstrap';

interface AlertWarningProps {
  mensaje: string;
}

const AlertWarning: React.FC<AlertWarningProps> = ({ mensaje }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    const tiempoVisible = 3000;

    const timer = setTimeout(() => {}, tiempoVisible);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Alert
        variant="warning"
        style={{ width: isMobile ? '100%' : '40rem' }}
        dismissible
      >
        {mensaje}
      </Alert>
    </>
  );
};

export default AlertWarning;
