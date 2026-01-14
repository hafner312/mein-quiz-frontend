import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Navigation = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <nav className="layout-header-nav">
      <Link to="/">Home</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/admin">Fragen verwalten</Link>
      <Link to="/regeln">Regeln</Link>
      <Link to="/blabli">Impressum</Link>
      <Link to="/login">Login</Link>
      <Link to="/axios-demo">Axios Demo</Link>

      {isAuthenticated && (
        <span
          style={{
            marginLeft: "20px",
            padding: "5px 10px",
            background: user.role === "ADMIN" ? "#dc3545" : "#007bff",
            color: "white",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          👤 {user.username} ({user.role})
        </span>
      )}
    </nav>
  );
};

export default Navigation;
