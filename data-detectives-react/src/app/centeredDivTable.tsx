"use client";
import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface CenteredDivCalendarProps {
    children: ReactNode;
}

const CenteredDivCalendar: React.FC<CenteredDivCalendarProps> = ({ children }) => {
  return (
    <Container className="mb-3 justify-content-center">
      <Row>
        <Col >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CenteredDivCalendar;


