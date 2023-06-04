'use client';
import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

interface CenteredDivProps {
  children: ReactNode;
}

const CenteredDiv: React.FC<CenteredDivProps> = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const colSize = isDesktopOrLaptop ? 6 : 12;

  return (
    <Container className="vh-100 mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={colSize}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CenteredDiv;


