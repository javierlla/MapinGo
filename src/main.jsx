import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';

/* 
getElemetById ('root') en el index.html busca el contedenor div con id=root 
ReactDOM.createRoot(...):
    ReactDOM.createRoot() es una función de React 18 que se usa para iniciar el proceso de renderización de la aplicación en el DOM.

    Crea un "punto de entrada" en el DOM para React.

    Con createRoot, React toma el control de todo lo que sucede dentro del contenedor #root y puede actualizar dinámicamente la
    UI (interfaz de usuario) de la aplicación según cambian los datos o el estado.
*/


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
