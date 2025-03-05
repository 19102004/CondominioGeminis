import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Usuarios from './pages/Usuarios';
import Pagos from './pages/Pagos';
import Multas from './pages/Multas';
import Permisos from './pages/Permisos';
import Historial from './pages/Historial';
import Solipermisos from './pages/Solipermisos';
import WelcomeU from './pages/WelcomeU';
import Perfil from './pages/perfil';
import PerfilA from './pages/perfilA';
import Recuperacion from './pages/recuperacion';
import CambioPass from './pages/cambioPass';

import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/"></Link> 
          </li>
          <li>
            <Link to="/welcome"></Link>
          </li>
          <li>
            <Link to="/pagos"></Link> 
          </li>
          <li>
            <Link to="/usuarios"></Link> 
          </li>
          <li>
            <Link to="/multas"></Link>
          </li>
          <li>
            <Link to="/permisos"></Link>
          </li>
          <li>
            <Link to="/historial"></Link>
          </li>
          <li>
            <Link to="/solipermisos"></Link>
          </li>
          <li>
            <Link to="/welcomeu"></Link>
          </li>
          <li>
            <Link to="/perfil"></Link>
          </li>
          <li>
            <Link to="/perfilA"></Link>
          </li>
          <li>
            <Link to="/recuperacion"></Link>
          </li>
          <li>
            <Link to="/cambioPass"></Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/welcome" element={<Welcome />} /> 
        <Route path="/pagos" element={<Pagos />} /> 
        <Route path="/usuarios" element={<Usuarios />} /> 
        <Route path="/multas" element={<Multas/>} />
        <Route path="/permisos" element={<Permisos/>} />
        <Route path="/historial" element={<Historial/>} />
        <Route path="/solipermisos" element={<Solipermisos/>} />
        <Route path="/welcomeu" element={<WelcomeU />} /> 
        <Route path="/perfil" element={<Perfil />} /> 
        <Route path="/perfilA" element={<PerfilA />} /> 
        <Route path="/recuperacion" element={<Recuperacion />} /> 
        <Route path="/restablecer/:token" element={<CambioPass />} /> 
      </Routes>
    </Router>
  );
}

export default App;