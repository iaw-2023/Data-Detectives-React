import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page';
import AboutPage from './aboutUs/page';
import Formulario from './reservar/page';

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/reservar" element={<Formulario />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;