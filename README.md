# 🗺️ Proyecto de Mapa con Geoapify + Leaflet

Este proyecto es una aplicación React que utiliza **Leaflet** junto con la API de **Geoapify** para mostrar mapas interactivos, buscar direcciones y trazar rutas entre dos puntos.

## 📌 Funcionalidades

- 🌍 Visualización de mapas interactivos con Leaflet.
- 🔍 Búsqueda de direcciones mediante texto.
- ⭐ Guardar direcciones como favoritos (se guardan en `localStorage`).
- 📍 Mostrar ruta entre dos ubicaciones.
- 📏 Cálculo de la distancia total de la ruta.
- 🧭 Vista centrada automáticamente en la ruta.

## 🛠️ Tecnologías y Librerías

- [React](https://reactjs.org/)
- [Leaflet](https://leafletjs.com/) para mapas interactivos.
- [React Router DOM](https://reactrouter.com/) para navegación.
- [Geoapify API](https://www.geoapify.com/) para geocodificación y rutas.
- `react-leaflet` para integrar Leaflet con React.

## 🔐 Obtener API Key de Geoapify

1. Ve a [https://myprojects.geoapify.com/](https://myprojects.geoapify.com/)
2. Crea una cuenta gratuita si no tienes una.
3. Crea un nuevo proyecto y copia tu **API Key**.
4. Crea un archivo `.env` en la raíz del proyecto y añade la siguiente línea:

```env
VITE_GEOAPIFY_KEY=tu_clave_api_aqui```

⚠️ Asegúrate de reiniciar el servidor de desarrollo si ya estaba corriendo, para que lea el archivo .env.
📁 Estructura de Archivos Clave

    MapView.jsx: componente principal del mapa.

    GeocodeSearch.jsx: permite buscar direcciones y manejar favoritos.

    RoutingControl.jsx: recoge dos direcciones y obtiene la ruta entre ellas.

    MapPage.jsx: página dedicada al mapa (accesible en /mapa).

    App.jsx: punto inicial de la app (también contiene un mapa).

    services/api.js: funciones para llamar a la API de Geoapify.

🚀 Instalación

    Clona el repositorio:

git clone https://github.com/javierlla/MapinGo.git
cd MapinGo

Instala las dependencias:

npm install

Añade tu clave API en el .env como se explicó arriba.

Ejecuta el proyecto:

    npm run dev

🌐 Uso

    Accede a / para la página principal.

    Accede a /mapa para ver y usar el mapa interactivo.

    Puedes buscar direcciones, guardarlas como favoritas y trazar rutas.
