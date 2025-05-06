import { useState } from "react";
import { geocode, getRoute } from "../services/api";

const RoutingControl = ({ onRoute }) => {
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoute = async () => {
    setError("");
    setIsLoading(true);
    
    if (!startAddress || !endAddress) {
      setError("Introduce ambas direcciones.");
      setIsLoading(false);
      return;
    }

    try {
      const startRes = await geocode(startAddress);
      const endRes = await geocode(endAddress);

      const start = startRes.features[0]?.geometry.coordinates;
      const end = endRes.features[0]?.geometry.coordinates;

      if (!start || !end) {
        setError("No se pudieron encontrar coordenadas para alguna dirección.");
        setIsLoading(false);
        return;
      }

      const waypoints = `${start[1]},${start[0]}|${end[1]},${end[0]}`;
      const result = await getRoute(waypoints);

      if (result.features?.length > 0) {
        let coordinates = [];

        const geometry = result.features[0].geometry;
        if (geometry.type === "LineString") {
          coordinates = geometry.coordinates.map(([lon, lat]) => [lat, lon]);
        } else if (geometry.type === "MultiLineString") {
          coordinates = geometry.coordinates.flat().map(([lon, lat]) => [lat, lon]);
        }

        const distanceMeters = result.features[0].properties.distance;
        const distanceKm = (distanceMeters / 1000).toFixed(2);

        onRoute(coordinates, distanceKm);
      } else {
        setError("Ruta no encontrada. Prueba con direcciones más específicas.");
      }
    } catch (err) {
      console.error("Error al obtener la ruta:", err);
      setError("Error al obtener la ruta. Verifica la consola para más detalles.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="routing-control">
      <div className="routing-inputs">
        <input 
          type="text" 
          value={startAddress} 
          onChange={(e) => setStartAddress(e.target.value)} 
          placeholder="Dirección de inicio"
        />
        <input 
          type="text" 
          value={endAddress} 
          onChange={(e) => setEndAddress(e.target.value)} 
          placeholder="Dirección de destino"
        />
      </div>
      <button 
        onClick={handleRoute}
        disabled={isLoading}
        className="routing-button"
      >
        {isLoading ? 'Buscando ruta...' : 'Obtener ruta'}
      </button>
      {error && <p className="routing-error">{error}</p>}
    </div>
  );
};

export default RoutingControl;
