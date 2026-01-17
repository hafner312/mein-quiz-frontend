import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="layout-header-nav">
      <Link to="/">Home</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/admin">Fragen verwalten</Link>
      <Link to="/regeln">Regeln</Link>
      <Link to="/blabli">Impressum</Link>

      {isAuthenticated ? (
        <>
          <Link to="/stats">Meine Stats</Link>
          <span
            style={{
              marginLeft: "20px",
              padding: "5px 12px",
              background: user.role === "ADMIN" ? "#dc3545" : "#007bff",
              color: "white",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {user.username} ({user.role})
          </span>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "10px",
              padding: "5px 12px",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navigation;
