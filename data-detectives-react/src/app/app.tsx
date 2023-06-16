import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

import HomePage from './page';
import Formulario from './reservar/page';
import TurnosAsignadosPage from './turnosAsignados/page';
import NosotrosPage from './nosotros/page';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserProvider } from '@auth0/nextjs-auth0/client';
export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  const router = useRouter();


  return (
    <UserProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reservar" element={<Formulario />} />
          <Route path="/turnosAsignados" element={<TurnosAsignadosPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;




