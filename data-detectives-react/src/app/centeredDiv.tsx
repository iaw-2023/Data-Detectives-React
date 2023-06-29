'use client';
import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface CenteredDivProps {
  children: ReactNode;
}

const CenteredDiv: React.FC<CenteredDivProps> = ({ children }) => {
  return (
    <Container className="vh-100 centered-div">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CenteredDiv;


