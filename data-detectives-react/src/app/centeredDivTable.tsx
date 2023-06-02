"use client";
import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface CenteredDivCalendarProps {
    children: ReactNode;
}

const CenteredDivCalendar: React.FC<CenteredDivCalendarProps> = ({ children }) => {
  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
            {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CenteredDivCalendar;

