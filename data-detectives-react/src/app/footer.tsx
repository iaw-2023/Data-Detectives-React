'use client';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';
import { useMediaQuery } from 'react-responsive';


const Footer: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
 

  const divStyle: React.CSSProperties = {
    backgroundColor: 'white',
    marginTop: 'auto',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    padding: isTabletOrMobile ? '20px' : '40px',
    textAlign: 'center',
    fontSize: isTabletOrMobile ? '6' : '3',
    height: isTabletOrMobile ? '100px' : '300px',
    overflowY: 'scroll',
  };
  
   
  return (
    <footer className="py-4" style={divStyle}>
      <Container>
        <Row>
          <Col md={4} className={`${isTabletOrMobile ? 'mb-2' : 'text-center'}`}>
            <h6 className='mt-1'> Contactate con nosotros </h6>
            <p> Dirección: Evergreen Terrace 742, Springfield </p>
            <p> Teléfono: 764 - 84377 </p>
            <p> Email: healthtime@mail.com </p>
          </Col>
          <Col md={4} className={`${isTabletOrMobile ? 'mb-2' : 'text-center'}`}>
            <h6 className='mt-2 mb-2'>Seguinos en nuestras redes sociales</h6>
            <div className={`${isTabletOrMobile ? 'text-center' : 'd-flex justify-content-center'} mt-2`}>
              <SocialIcon network="instagram" url="https://www.instagram.com/healthtimenutrition/?hl=es" className="mx-1" />
              <SocialIcon network="facebook" url="https://www.facebook.com/healthtime/" className="mx-1" />
              <SocialIcon network="linkedin" url="https://ar.linkedin.com/company/healthtime" className="mx-1" />
            </div>
          </Col>
          <Col md={4} className={`${isTabletOrMobile ? 'mb-2' : 'text-center'}`}>
            <h6 className= 'text-uppercase fw-bold mb-4'>
              <SocialIcon network="smugmug" className="me-2" />
              HealthTime
            </h6>
            <p >
              Somos un grupo de profesionales dedicados a brindarte el mejor servicio de atención médica en una amplia gama de especialidades.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p >&copy; {new Date().getFullYear()} HealthTime. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
