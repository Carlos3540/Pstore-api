import React, { useEffect, useState } from "react";
import "./style.css";

function Informativa() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const resp = await fetch("https://api.escuelajs.co/api/v1/categories");
        const data = await resp.json();
        setCategorias(data.slice(0, 6)); // mostramos solo 6 categorías
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    obtenerCategorias();
  }, []);

  const obtenerImagen = (cat) => {
    if (cat.image && cat.image.startsWith("http")) return cat.image;
    return "https://via.placeholder.com/150x150?text=Sin+imagen";
  };

  return (
    <div className="informativa-container">
      <h1>API PLATZI STORE</h1>
      <h2>Carlos Riaño</h2>
      <p>
        Esta página muestra datos reales obtenidos desde la{" "}
        <strong>API de Platzi Fake Store</strong>. Aquí puedes ver 2055 
        categorías disponibles con una vista previa.
      </p>

      <div className="categoria-grid">
        {categorias.map((cat) => (
          <div key={cat.id} className="categoria-card">
            <img src={obtenerImagen(cat)} alt={cat.name} />
            <h3>{cat.name}</h3>
            <p>ID: {cat.id}</p>
          </div>
        ))}
      </div>
      <p>
        github.com/Carlos3540/Pstore-api
      </p>

      {/* 🔹 Menú inferior igual que en las otras páginas */}
      <nav className="menu-inferior">
        <button>🏠</button>
        <button>⭐</button>
        <button className="activo">ℹ️</button>
        <button>🚀</button>
      </nav>
    </div>
  );
}

export default Informativa;
