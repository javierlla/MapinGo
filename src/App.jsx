import { useState } from "react";
import MapView from "./components/MapView";

function App() {
  const [route, setRoute] = useState({
    coordinates: [],
    distance: null,
  });

  return (
    <div>
      <h1>Geoapify API Demo</h1>
      <MapView 
        routeCoordinates={route.coordinates} 
        setRouteCoordinates={(coords) => setRoute(prev => ({ ...prev, coordinates: coords }))}
        routeDistance={route.distance}
        setRouteDistance={(distanceKm) => setRoute(prev => ({ ...prev, distance: distanceKm }))}
      />
    </div>
  );
}

export default App;
