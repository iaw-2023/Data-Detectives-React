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
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const cardStyle: React.CSSProperties = {
    width: isTabletOrMobile ? '100%' : isDesktopOrLaptop ? '25rem' : '20rem',
    height: isTabletOrMobile ? 'auto' : isDesktopOrLaptop ? '12rem' : '10rem',
  };
  
  const titleClassName = isTabletOrMobile ? 'h4' : 'h3';
  const descriptionClassName = isTabletOrMobile ? 'mb-3' : '';

  return (
    <Card className="mt-2 bg-light text-dark" style={cardStyle}>
      <Card.Body>
        <Card.Title className={titleClassName}>{title}</Card.Title>
        <Card.Text className={descriptionClassName}>{description}</Card.Text>
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