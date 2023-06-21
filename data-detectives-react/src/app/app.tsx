import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import HomePage from './page';
import Formulario from './reservar/page';
import TurnosAsignadosPage from './turnosAsignados/page';
import NosotrosPage from './nosotros/page';

const App: React.FC = () => {

  return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reservar" element={<Formulario />} />
          <Route path="/turnosAsignados" element={<TurnosAsignadosPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;





