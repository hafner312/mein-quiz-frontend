import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="layout-header-nav">
      <div className="nav-left">
        <NavLink to="/" end>
          Home
        </NavLink>
      </div>

      <div className="nav-center">
        {isAuthenticated && (
          <NavLink to="/notes/new">
            Neue Notiz
          </NavLink>
        )}
        <NavLink to="/notes">Meine Notizen</NavLink>
        <NavLink to="/subjects">Fächer-Übersicht</NavLink>
        <NavLink to="/regeln">Regeln</NavLink>
        <NavLink to="/stats">Meine Stats</NavLink>
      </div>

      <div className="nav-right">
        {isAuthenticated ? (
          <>
            {user?.role === "ADMIN" && <NavLink to="/admin">Admin</NavLink>}
            <span className="user-pill">
              {user.username} ({user.role})
            </span>
            <button onClick={handleLogout} className="nav-button">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
