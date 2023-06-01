"use client";

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Profesional } from '../types';
import InputDNIProfesional from "./inputDNIProfesional";

import 'react-calendar/dist/Calendar.css';

import ShowTurnoProfesional from './showTurnosProfesional';


const MainComponent: React.FC = () => {

  const [profesional, setProfesional] = useState<Profesional>();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleSearchProfesional = (profesional: Profesional) => {
    setProfesional(profesional);
    setCurrentPage(1);
  }

  return (
    <>
      <div>
      {currentPage === 0 && (
        <InputDNIProfesional onSelectProfesional={handleSearchProfesional} />
      )}
      {currentPage === 1 && profesional && (
        <ShowTurnoProfesional profesional={profesional} />
      )}
      </div>
    </>
  );
}

export default MainComponent;