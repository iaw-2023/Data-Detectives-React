import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page';
import Formulario from './reservar/page';
import TurnosAsignadosPage from './turnosAsignados/page';
import NosotrosPage from './nosotros/page';
import ProfesionalPage from './profesional/page';
import RegisterPage from './register/page';


const App: React.FC = () => {

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservar" element={<Formulario />} />
        <Route path="/turnosAsignados" element={<TurnosAsignadosPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/profesional" element={<ProfesionalPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;





