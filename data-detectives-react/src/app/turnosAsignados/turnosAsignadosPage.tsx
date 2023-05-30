"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Paciente, TurnoAsignado } from "../types";

interface TurnosAsignadosPacientePageProps {
    paciente: Paciente;
    turnosAsignados: TurnoAsignado[];
}

const TurnosAsignadosPacientePage: React.FC<TurnosAsignadosPacientePageProps> = ({ paciente, turnosAsignados }) => {

  const router = useRouter();

  const handleBack = () => {
    router.back()
  };
  

  return (
    <div>hhoola</div>
  );
};


export default TurnosAsignadosPacientePage;
