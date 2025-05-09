import { useState, useEffect } from "react";
import { geocode } from "../services/api";

function GeocodeSearch({ onResult }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const handleSearch = async () => {
    setError("");
    if (!query) return;

    try {
      const result = await geocode(query);
      if (result.features.length > 0) {
        const [lon, lat] = result.features[0].geometry.coordinates;
        onResult([lat, lon]);
      } else {
        setError("Dirección no encontrada.");
      }
    } catch (err) {
      setError("Error al buscar.");
    }
  };

  const addFavorite = () => {
    if (!query || favorites.includes(query)) return;
    const updated = [...favorites, query];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFavorite = (favToRemove) => {
    const updated = favorites.filter(fav => fav !== favToRemove);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };
  

  const selectFavorite = (fav) => {
    setQuery(fav);
    setTimeout(() => handleSearch(), 0);
  };

  return (
    <div className="geocode-search">
      <input
        type="text"
        placeholder="Buscar dirección..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={addFavorite}>☆</button>
      {error && <p className="error">{error}</p>}

      {favorites.length > 0 && (
        <div className="favorites">
          <h4>Favoritos:</h4>
          <ul>
          {favorites.map((fav, i) => (
          <li key={i}>
            <span onClick={() => selectFavorite(fav)} style={{ cursor: 'pointer' }}>{fav}</span>
            <button onClick={() => removeFavorite(fav)} style={{ marginLeft: '10px' }}>🗑️</button>
          </li>
          ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GeocodeSearch;
