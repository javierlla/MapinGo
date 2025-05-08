import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/mapa">Mapa</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
