"use client"
import { SocialIcon } from "react-social-icons";
import ContainerHomePage from "../container-fondo-homePage";
import NavScroll from "../mynavbar";
import Footer from "../footer";
import CardTurnosAsignados from "../cardTurnosAsignados";
import CenteredDiv from "../reservar/centeredDiv";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";


const NosotrosPage: React.FC = () => {

  return (
    <div className="content-wrapper div-paciente">
      <ContainerHomePage>
        <NavScroll />
        <Container className="container-nosotros">
        <Row className="justify-content-center">
          <Col xs={12} md={10}>
          <CardTurnosAsignados >
            <h6 className='text-uppercase fw-bold text-center mt-4 mb-4'> Contactate con nosotros </h6>
            <p className="text-center"> Dirección: Evergreen Terrace 742, Springfield </p>
            <p className="text-center"> Teléfono: 764 - 84377 </p>
            <p className="text-center"> Email: healthtime@mail.com </p>
            <h6 className='text-uppercase text-center fw-bold mb-4 mt-4'>
              <SocialIcon network="smugmug" className="me-2" />
              HealthTime
            </h6>
            <p className="text-center">
              Somos un grupo de profesionales dedicados a brindarte el mejor servicio de atención médica en una amplia gama de especialidades.
            </p>
          </CardTurnosAsignados>
          </Col>
        </Row>
      </Container>
    </ContainerHomePage>
    <Footer/>
    </div>
  );
};

export default NosotrosPage;