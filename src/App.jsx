import './App.css';
import "./global.css"; 
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from './pages/Home/Home';
import { DashboardMain } from './pages/Dashboard/DashboardMain';
import { Usuarios } from "./pages/Usuario/Usuario";
import { AdicionarUsuario } from "./pages/Usuario/AdicionarUsuario/AdicionarUsuario";
import { EditarUsuario} from "./pages/Usuario/EditarUsuario/EditarUsuario";
import { Servicos } from './pages/Servicos/Servico';
import { Agendamentos } from './pages/Agendamentos/Agendamento';
import { BarbearIA } from './pages/BarbearIA/BarbearIA';
import { Login } from './pages/Login/Login';
 
import { ThemeProvider } from "./ThemeContext"; // Importe o contexto

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/adicionar" element={<AdicionarUsuario />} />
          <Route path="/usuario/editar" element={<EditarUsuario />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/barbearIA" element={<BarbearIA />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

