import { useState } from 'react';
import MapView from '../components/MapView';

const MapPage = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeDistance, setRouteDistance] = useState(null);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Mapa de la Ruta</h2>
      <MapView
        routeCoordinates={routeCoordinates}
        setRouteCoordinates={setRouteCoordinates}
        routeDistance={routeDistance}
        setRouteDistance={setRouteDistance}
      />
    </div>
  );
};

export default MapPage;
