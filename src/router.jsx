// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import MapPage from './pages/MapPage'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'mapa',
        element: <MapPage />,
      },
    ],
  },
]);

export default router;
