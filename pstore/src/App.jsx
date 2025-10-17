import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import React from "react";
import Home from "./components/home";
import Fav from "./components/fav";
import Informativa from "./components/Informativa";
import Original from "./components/original";
import Detalles from "./components/detalles";
import "./App.css"; // 🔹 Nuevo CSS para el menú inferior

function App() {
  return (
    <Router>
      {/* 🔹 Contenedor principal */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fav" element={<Fav />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/original" element={<Original />} />
          <Route path="/detalles/:id" element={<Detalles />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* 🔹 Menú inferior fijo */}
        <nav className="menu-inferior">
          <Link to="/" className="menu-item">
            <span className="icono"></span>
            <span className="texto">Inicio</span>
          </Link>
          <Link to="/fav" className="menu-item">
            <span className="icono"></span>
            <span className="texto">Favoritos</span>
          </Link>
          <Link to="/informativa" className="menu-item">
            <span className="icono"></span>
            <span className="texto">Info</span>
          </Link>
          <Link to="/original" className="menu-item">
            <span className="icono"></span>
            <span className="texto">Original</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
