'use client';

import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';

interface CardPacienteProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CardPaciente: React.FC<CardPacienteProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
}) => {

  return (
    <Card className="card-home-paciente mt-2 bg-light text-dark">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link href={buttonLink}>
          <Button className="btn-dark">
            <span className="text-decoration-none text-white">{buttonText}</span>
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardPaciente;