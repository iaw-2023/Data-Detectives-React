import { useRouter } from 'next/router';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import HomePage from './page';
import Formulario from './reservar/page';
import TurnosAsignadosPage from './turnosAsignados/page';
import NosotrosPage from './nosotros/page';
import ProfesionalPage from './profesional/page';
import MercadoPagoPage from './mercadoPago/page';

const App: React.FC = () => {
  const router = useRouter();

  return (
    <UserProvider>
      {router.pathname === '/' && <HomePage />}
      {router.pathname === '/reservar' && <Formulario />}
      {router.pathname === '/turnosAsignados' && <TurnosAsignadosPage />}
      {router.pathname === '/nosotros' && <NosotrosPage />}
      {router.pathname === '/profesional' && <ProfesionalPage />}
      {router.pathname === '/mercadoPago' && <MercadoPagoPage />}
    </UserProvider>
  );
};

export default App;





