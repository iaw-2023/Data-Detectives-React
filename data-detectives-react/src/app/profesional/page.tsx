"use client";

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Profesional } from '../types';
import InputDNIProfesional from "./inputDNIProfesional";

import 'react-calendar/dist/Calendar.css';

import ShowTurnoProfesional from './showTurnosProfesional';


const ProfesionalPage: React.FC = () => {
 // const { user, isLoading } = useUser();
  const [profesional, setProfesional] = useState<Profesional>();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleSearchProfesional = (profesional: Profesional) => {
    setProfesional(profesional);
    setCurrentPage(1);
  };

 /* if (isLoading) {
    return <AppSpinner loading={isLoading}/>
  }

  if (!user) {
    // El usuario no está logueado, muestra el mensaje de iniciar sesión
    return <div>Debes iniciar sesión como profesional para acceder a esta funcionalidad</div>;
  }

  if (user.userType !== 'profesional') {
    // El usuario está logueado pero no es un profesional, muestra el mensaje de requerir ser profesional
    return <div>Debes iniciar sesión como profesional para acceder a esta funcionalidad</div>;
  }
*/
  return (

    <div>
        {currentPage === 0 && <InputDNIProfesional onSelectProfesional={handleSearchProfesional} />}
        {currentPage === 1 && profesional && <ShowTurnoProfesional profesional={profesional} />}
      </div>

  );
};

export default ProfesionalPage;