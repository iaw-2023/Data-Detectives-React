'use client';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import ContainerFooter from './container-footer';


const Footer: React.FC = () => {
 
  return (
    <footer className="py-4 footer-container vw-100">
      <ContainerFooter>       
        <h6 className='mt-2 mb-2'>Seguinos en nuestras redes sociales</h6>
        <div className="footer-content">
          <SocialIcon network="instagram" url="https://www.instagram.com/healthtimenutrition/?hl=es" className="mx-1" />
          <SocialIcon network="facebook" url="https://www.facebook.com/healthtime/" className="mx-1" />
          <SocialIcon network="linkedin" url="https://ar.linkedin.com/company/healthtime" className="mx-1" />
        </div>          
      </ContainerFooter>
    </footer>
  );
};

export default Footer;
