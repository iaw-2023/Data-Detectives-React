import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/turnos">Turnos</a></li>
        <li><a href="/doctores">Doctores</a></li>
        {/* Agrega más elementos de navegación según tus necesidades */}
      </ul>
    </nav>
  );
};

export default Navbar;
