"use client";
import React, { ReactNode } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselItem } from 'react-bootstrap';

interface CarouselDarkProps {
  children?: ReactNode;
}

const CarouselDark: React.FC<CarouselDarkProps> = ({ children }) => {
  return (
    <Carousel variant="dark">
      {children}
    </Carousel>
  );
};


export default CarouselDark;
