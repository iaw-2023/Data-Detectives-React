"use client";
import React from 'react';
import {  Spinner } from 'react-bootstrap';


interface AppSpinnerProps {
  loading: Boolean;
} 

const AppSpinner: React.FC<AppSpinnerProps> = ({loading}) => {
  return (
    loading && (
      <Spinner as="span" animation="border" variant="info" role="status" aria-hidden="true" className="mt-2 mx-auto align-self-center" /> 
    )
  )
}

export default AppSpinner;