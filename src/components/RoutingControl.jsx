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
    
    //que ambas direcciones estén
    if (!startAddress || !endAddress) {
      setError("Introduce ambas direcciones.");
      setIsLoading(false);
      return;
    }

    try { //convierto a coordenadas
      const startRes = await geocode(startAddress);
      const endRes = await geocode(endAddress);
        //extraigo las coordenadas
      const start = startRes.features[0]?.geometry.coordinates;
      const end = endRes.features[0]?.geometry.coordinates;

      if (!start || !end) {
        setError("No se pudieron encontrar coordenadas para alguna dirección.");
        setIsLoading(false);
        return;
      }
      //obtengo la ruta
      const waypoints = `${start[1]},${start[0]}|${end[1]},${end[0]}`;
      const result = await getRoute(waypoints);

      if (result.features?.length > 0) {
        let coordinates = [];
        //extraigo las coordenadas de la ruta
        const geometry = result.features[0].geometry;
        if (geometry.type === "LineString") {
          coordinates = geometry.coordinates.map(([lon, lat]) => [lat, lon]);
        } else if (geometry.type === "MultiLineString") {
          coordinates = geometry.coordinates.flat().map(([lon, lat]) => [lat, lon]);
        }
        //y las calculo a km
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
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'white',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
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
      >
        {isLoading ? 'Buscando ruta...' : 'Obtener ruta'}
      </button>
      {error && <p style={{ color: "red", marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default RoutingControl;
