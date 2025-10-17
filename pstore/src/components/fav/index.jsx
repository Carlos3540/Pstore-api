import React, { useEffect, useState } from "react";
import "./Style.css";

function Fav() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favs);
  }, []);

  return (
    <div className="favoritos">
      <h1>Mis Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>No tienes productos guardados aún.</p>
      ) : (
        <ul className="lista-fav">
          {favoritos.map((p) => (
            <li key={p.id}>
              <img src={p.images[0]} alt={p.title} className="miniatura-fav" />
              <div>
                <h4>{p.title}</h4>
                <p>${p.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Fav;
