"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Paciente, TurnoAsignado } from "../types";
import Container from "../container-fondo";
import CardComponent from "../card";
import { ListGroup, ListGroupItem } from "react-bootstrap";

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
    <Container>
      <CardComponent>
        <ListGroup>
          <ListGroupItem>
            
          </ListGroupItem>
        </ListGroup>
      </CardComponent>
    </Container>
  );
};


export default TurnosAsignadosPacientePage;
