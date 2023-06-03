'use client';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';


const divStyle : React.CSSProperties = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  left: 0,
  height: 50,
  backgroundColor: 'white'
};

const Footer: React.FC = () => {
  return (
    <footer className="py-4" style={divStyle}>
      <Container>
        <Row>
          <Col md={4} className="text-center">
            <h5 className='mb-4 mt-2'>Contactate con nosotros</h5>
            <p>Dirección: Evergreen Terrace 742, Springfield</p>
            <p>Teléfono: 764 - 84377</p>
            <p>Email: healthtime@mail.com</p>
          </Col>
          <Col md={4} className="text-center">
            <h5 className='mt-2'>Seguinos en nuestras redes sociales</h5>
            <div className="d-flex justify-content-center mt-5">
              <SocialIcon network="instagram" url="https://www.instagram.com/healthtimenutrition/?hl=es" className="mx-1" />
              <SocialIcon network="facebook" url="https://www.facebook.com/healthtime/" className="mx-1" />
              <SocialIcon network="linkedin" url="https://ar.linkedin.com/company/healthtime" className="mx-1" />
            </div>
          </Col>
          <Col md={4} className="text-center">
            <h6 className="text-uppercase fw-bold mb-4">
              <SocialIcon network="smugmug" className="me-2" />
              HealthTime
            </h6>
            <p>
              Somos un grupo de profesionales dedicados a la atención primaria de la salud. Queremos brindarte el mejor servicio de atención médica en una amplia gama de especialidades.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} HealthTime. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
  
};

export default Footer;
