"use client";
import React, { useState } from "react";
import { Paciente, Turno } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowTurnosAsignadosPage from "./turnosAsignadosPage";
import { useAuth0 } from "@auth0/auth0-react";

/*
-  Esta página debería volar y solo quedar TurnosAsignadosPage
*/

const TurnosAsignadosPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [turnosAsignados, setTurnosAsignados] = useState<Turno[]>([]);
  
  const { isAuthenticated } = useAuth0();

  const { loginWithRedirect } = useAuth0();

  const { user } = useAuth0();

  const handleSelectPaciente = (paciente: Paciente) => {
    setPaciente(paciente);
  };

  return (
    <div>
      {paciente!=null && (
        <ShowTurnosAsignadosPage paciente={paciente} turnosAsignados={turnosAsignados} />
      )}
    </div>
  );
};

export default TurnosAsignadosPage;
