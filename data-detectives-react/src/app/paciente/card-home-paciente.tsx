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
  buttonDisabled,
  tooltipMessage,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const buttonRef = React.useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (buttonDisabled && tooltipMessage) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Card className="card-home-paciente mt-2 bg-light text-dark">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <span ref={buttonRef}>
          <Link href={buttonLink}>
            <Button
              className="btn-dark"
              disabled={buttonDisabled}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-decoration-none text-white">{buttonText}</span>
            </Button>
          </Link>
        </span>
        {buttonDisabled && tooltipMessage && (
          <Overlay target={buttonRef.current} show={showTooltip} placement="top">
            {({ placement, arrowProps, show: _show, ...props }) => (
              <Tooltip id="tooltip" {...props}>
                {tooltipMessage}
              </Tooltip>
            )}
          </Overlay>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardPaciente;


