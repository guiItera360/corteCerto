import "./App.css";
import "./global.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { DashboardMain } from "./pages/Dashboard/DashboardMain";
import { Usuarios } from "./pages/Usuario/Usuario";
import { AdicionarUsuario } from "./pages/Usuario/AdicionarUsuario/AdicionarUsuario";
import { Servicos } from "./pages/Servicos/Servico";
import { Agendamentos } from "./pages/Agendamentos/Agendamento";
import { BarbearIA } from "./pages/BarbearIA/BarbearIA";
import { Login } from "./pages/Login/Login";
import PrivateRoute from "./PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "./ThemeContext"; // Importe o contexto

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardMain />
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <Usuarios />
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios/adicionar"
            element={
              <PrivateRoute>
                <AdicionarUsuario />
              </PrivateRoute>
            }
          />
          <Route
            path="/servicos"
            element={
              <PrivateRoute>
                <Servicos />
              </PrivateRoute>
            }
          />
          <Route
            path="/agendamentos"
            element={
              <PrivateRoute>
                <Agendamentos />
              </PrivateRoute>
            }
          />
          <Route
            path="/barbearIA"
            element={
              <PrivateRoute>
                <BarbearIA />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
