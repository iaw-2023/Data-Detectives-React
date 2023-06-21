import React from 'react';
import { Button, Card, Overlay, Tooltip } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';

interface CardPacienteProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonDisabled?: boolean;
  tooltipMessage?: string;
}

const CardPaciente: React.FC<CardPacienteProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const buttonRef = React.useRef<HTMLSpanElement>(null);

  return (
    <Card className="card-home-paciente mt-2 bg-light text-dark">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <span ref={buttonRef}>
          <Link href={buttonLink}>
            <Button
              className="btn-dark"
            >
              <span className="text-decoration-none text-white">{buttonText}</span>
            </Button>
          </Link>
        </span>
       
      </Card.Body>
    </Card>
  );
};

export default CardPaciente;


