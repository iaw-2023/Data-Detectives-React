'use client';
import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface CenteredDivReservarProps {
  children: ReactNode;
}

const CenteredDivReservar: React.FC<CenteredDivReservarProps> = ({ children }) => {
  return (
    <Container className="centered-div-reservar">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CenteredDivReservar;


