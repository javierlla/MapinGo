import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import RoutingControl from './RoutingControl';
import GeocodeSearch from './GeocodeSearch';
import 'leaflet/dist/leaflet.css';

/* delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
}); */

const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY || 'd38324b86c1e4889b8ed0c95fb1b31cb';

function MapView({ routeCoordinates, setRouteCoordinates, routeDistance, setRouteDistance, zoom = 13 }) { 
  const [center, setCenter] = useState([43.2630, -2.9350]); //BILBAO
  const mapRef = useRef();

  useEffect(() => { //centrar el mapa a la ruta
    if (routeCoordinates.length > 0 && mapRef.current) {
      const bounds = L.latLngBounds(routeCoordinates);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [routeCoordinates]);

  return (
    <>
      <GeocodeSearch onResult={(coords) => {
        setCenter(coords);
        setRouteCoordinates([]);
        setRouteDistance(null);
      }} />
      
      <RoutingControl onRoute={(coords, distanceKm) => {
        setRouteCoordinates(coords);
        setRouteDistance(distanceKm);
      }} />
      
      {routeDistance && (
        <div style={{
          position: 'absolute',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'white',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          Distancia total: {routeDistance} km
        </div>
      )}

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: "100vh", width: "100%" }}
        whenCreated={(map) => { mapRef.current = map; }}
      >
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?apiKey=${API_KEY}`}
          attribution="&copy; OpenStreetMap contributors"
        />
        
        <Marker position={center}>
          <Popup>Ubicación actual</Popup>
        </Marker>
        
        {routeCoordinates.length > 0 ? (
          <Polyline positions={routeCoordinates} color="blue" weight={5} />
        ) : (
          <div style={{
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            color: 'red', 
            zIndex: 1000
          }}>
            No se ha dibujado ruta aún.
          </div>
        )}
      </MapContainer>
    </>
  );
}

export default MapView;
