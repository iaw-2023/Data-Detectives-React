"use client";
import React, { useEffect, useState } from 'react';
import {  Alert } from 'react-bootstrap';


interface AlertWarningProps {
  mensaje: string;

} 

const AlertWarning: React.FC<AlertWarningProps> = ({mensaje}) => {


    useEffect(() => {
      const tiempoVisible = 3000; 
  
      const timer = setTimeout(() => {
      }, tiempoVisible);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <>
          <Alert variant="warning" style={{ width: "40rem" }} dismissible> {mensaje}
          </Alert>
        
      </>
    );
  };  

export default AlertWarning;