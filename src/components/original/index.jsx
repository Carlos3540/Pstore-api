import React, { useEffect, useState } from "react";
import "./style.css";

function FallingCategoriesGame() {
  const [categorias, setCategorias] = useState([]);
  const [fallingCats, setFallingCats] = useState([]);
  const [score, setScore] = useState(0);

  // Traer categorías de la API
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Error al obtener categorías:", err));
  }, []);

  // Generar “galaxias” que caen cada 1.5s
  useEffect(() => {
    const interval = setInterval(() => {
      if (categorias.length === 0) return;
      const randomCat = categorias[Math.floor(Math.random() * categorias.length)];
      const newCat = {
        ...randomCat,
        id: Date.now(), // id único
        left: Math.random() * 80, // posición horizontal
        top: 0,
      };
      setFallingCats((prev) => [...prev, newCat]);
    }, 1500);

    return () => clearInterval(interval);
  }, [categorias]);

  // Animar caída de las galaxias
  useEffect(() => {
    const animation = setInterval(() => {
      setFallingCats((prev) =>
        prev
          .map((cat) => ({ ...cat, top: cat.top + 2 })) // velocidad
          .filter((cat) => cat.top < 90) // eliminar al llegar abajo
      );
    }, 50);
    return () => clearInterval(animation);
  }, []);

  const handleClick = (id) => {
    setScore(score + 1);
    setFallingCats(fallingCats.filter((cat) => cat.id !== id));
  };

  return (
    <div className="game-section">
      <h1 className="game-title">🚀 Atrapa las Galaxias</h1>
      <h2 className="game-score">Puntaje: {score}</h2>

      <div className="game-container">
        {fallingCats.map((cat) => (
          <div
            key={cat.id}
            className="game-card"
            style={{ top: `${cat.top}%`, left: `${cat.left}%` }}
            onClick={() => handleClick(cat.id)}
          >
            <img src={cat.image} alt={cat.name} className="game-img" />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FallingCategoriesGame;
