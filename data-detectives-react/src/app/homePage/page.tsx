"use client"
import React, { useContext } from 'react';
import NavScroll from '../Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import DarkDiv from '../darkDiv';
import WelcomeHP from './welcomeHP';

const HomePage: React.FC = () => {
  return (
    <DarkDiv>
      <NavScroll />
      <h1 className='float-end mt-5 display-2 custom-h1'>
        Bienvenido/a 
        <br />
        a HealthTime</h1>
    </DarkDiv>
  );
};

export default HomePage;
