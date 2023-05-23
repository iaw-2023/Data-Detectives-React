"use client"
import React from 'react';
import NavScrollExample from './Navbar';
import Container from './Container';
import CarouselDark from './CarouselDark'; 
import Carousel from 'better-react-carousel'

import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage: React.FC = () => {
  return (
    <div>
      <NavScrollExample />
      <Container>
      <h1>Bienvenido/a a HealthTime</h1>
        <Carousel cols={1} rows={1} gap={0} loop>
          <Carousel.Item>
            <img width="100%" src="https://picsum.photos/800/600?random=1" />
          </Carousel.Item>
          <Carousel.Item>
            <img width="100%" src="https://picsum.photos/800/600?random=2" />
          </Carousel.Item>
          <Carousel.Item>
            <img width="100%" src="https://picsum.photos/800/600?random=3" />
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default HomePage;
