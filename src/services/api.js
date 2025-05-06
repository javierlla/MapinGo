const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY || "d38324b86c1e4889b8ed0c95fb1b31cb";

export async function geocode(text) {
  try {
    const res = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(text)}&apiKey=${API_KEY}`);
    if (!res.ok) throw new Error("Error en geocodificación");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`);
    if (!res.ok) throw new Error("Error en reverse geocoding");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getRoute(waypoints) {
  try {
    const res = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${API_KEY}`);
    if (!res.ok) throw new Error("Error en routing");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getPlaces(filter) {
  try {
    const res = await fetch(`https://api.geoapify.com/v2/places?${filter}&apiKey=${API_KEY}`);
    if (!res.ok) throw new Error("Error en búsqueda de lugares");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}