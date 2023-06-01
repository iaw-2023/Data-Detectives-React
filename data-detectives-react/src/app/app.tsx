import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page';
import Formulario from './reservar/page';
import TurnosAsignadosPage from './turnosAsignados/page';

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservar" element={<Formulario />} />
        <Route path="/turnosAsignados" element={<TurnosAsignadosPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
