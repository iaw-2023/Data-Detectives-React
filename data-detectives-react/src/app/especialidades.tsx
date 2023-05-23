"use client";
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

interface Especialidad {
  id: number;
  nombre: string;
  descripcion: string;
}

const Especialidades: React.FC = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch('https://data-detectives-laravel.vercel.app/rest/especialidades');
        const data = await response.json();
        setEspecialidades(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEspecialidades();
  }, []);

  return (
    <div>
        <Link to="/">Ir a la página de inicio</Link>
        <Accordion>
        {especialidades.map((especialidad) => (
            <Card key={especialidad.id}>
            <Accordion.Item eventKey={especialidad.id.toString()}>
                <Accordion.Header>{especialidad.nombre}</Accordion.Header>
                <Accordion.Body>{especialidad.descripcion}</Accordion.Body>
            </Accordion.Item>
            </Card>
        ))}
        </Accordion>
    </div>
    
  );
};

export default Especialidades;
