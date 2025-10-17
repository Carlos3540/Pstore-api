import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");

  // Categorías resumidas
  const categoriasResumidas = [
    { id: "todas", nombre: "Todas" },
    { id: "electronics", nombre: "Tecnología" },
    { id: "shoes", nombre: "Ropa" },
    { id: "bags", nombre: "Hogar" },
    { id: "furniture", nombre: "Bolsos" },
  ];

  // Traer productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const resp = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await resp.json();
        setProductos(data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      }
    };

    fetchProductos();

    const favGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favGuardados);
  }, []);

  const toggleFavorito = (producto) => {
    let nuevosFavoritos;
    if (favoritos.some((f) => f.id === producto.id)) {
      nuevosFavoritos = favoritos.filter((f) => f.id !== producto.id);
    } else {
      nuevosFavoritos = [...favoritos, producto];
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  // Filtrado por búsqueda y categoría resumida
  const productosFiltrados = productos.filter((p) => {
    const nombreValido = p.title.toLowerCase().includes(busqueda.toLowerCase());
    let categoriaValida = true;
    if (categoriaFiltro !== "todas") {
      // Mapear nombres de categorías resumidas a los productos
      if (categoriaFiltro === "electronics") categoriaValida = p.category.name.toLowerCase().includes("electronics");
      if (categoriaFiltro === "clothing") categoriaValida = p.category.name.toLowerCase().includes("clothing") || p.category.name.toLowerCase().includes("clothes");
      if (categoriaFiltro === "furniture") categoriaValida = p.category.name.toLowerCase().includes("furniture");
      if (categoriaFiltro === "bags") categoriaValida = p.category.name.toLowerCase().includes("bags");
    }
    return nombreValido && categoriaValida;
  });

  return (
    <div className="home-container">
      {/* Encabezado */}
      <div className="menu">
        <img
          src="/src/assets/Logo-platzi.png"
          alt="Logo"
          style={{ height: "40px", verticalAlign: "middle", marginRight: "10px" }}
        />
        <span>Platzi Store</span>
      </div>

      {/* Buscador */}
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Filtro resumido tipo botones */}
      <div className="filtro-botones" style={{ marginTop: "15px" }}>
        {categoriasResumidas.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaFiltro(cat.id)}
            style={{
              padding: "8px 12px",
              margin: "0 5px 5px 0",
              borderRadius: "8px",
              border: categoriaFiltro === cat.id ? "2px solid #66fcf1" : "1px solid #45a29e",
              background: "#1f2833",
              color: "#c5c6c7",
              cursor: "pointer",
              fontWeight: categoriaFiltro === cat.id ? "bold" : "normal",
            }}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
      {productosFiltrados.length > 0 ? (
        <ul className="lista">
          {productosFiltrados.map((p) => (
            <li key={p.id}>
              <img src={p.images[0]} alt={p.title} className="miniatura" />
              <div className="info">
                <h4>{p.title}</h4>
                <p>${p.price}</p>
              </div>
              <button
                className="btn-fav"
                onClick={() => toggleFavorito(p)}
                title="Agregar a favoritos"
              >
                {favoritos.some((f) => f.id === p.id) ? "★" : "☆"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="cargando">Cargando productos...</p>
      )}
    </div>
  );
}

export default Home;
