"use client";
import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface CenteredDivProps {
    children: ReactNode;
}

const CenteredDiv: React.FC<CenteredDivProps> = ({ children }) => {
  return (
    <Container className="vh-100 mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
            {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CenteredDiv;

