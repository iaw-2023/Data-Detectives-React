"use client"
import React, { useContext } from 'react';
import NavScroll from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContainerHomePage from './container-fondo-homePage';

const HomePage: React.FC = () => {
  return (
    <ContainerHomePage>
      <NavScroll />
      <h1 className='float-end mt-5 display-2 custom-h1'>
        Bienvenido/a 
        <br />
        a HealthTime</h1>
    </ContainerHomePage>
  );
};

export default HomePage;
