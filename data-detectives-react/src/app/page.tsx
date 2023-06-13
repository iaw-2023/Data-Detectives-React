"use client"
import React from 'react';
import NavScroll from './mynavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer';
import ContainerHomePage from './container-fondo-homePage';

const HomePage: React.FC = () => {
  return (
    
    <div className="content-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ContainerHomePage> 
          <NavScroll />
          <h1 className='float-end mt-5 display-2 custom-h1'>
            Bienvenido/a
            <br />
            a HealthTime</h1>
        </ContainerHomePage>
        <Footer />
    </div>
  );
};

export default HomePage;
