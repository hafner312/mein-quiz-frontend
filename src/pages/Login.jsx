import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/login-form";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const { login } = useAuth();
  const registrationSuccess = location.state?.registered;

  const handleLogin = async (loginData) => {
    setError("");

    try {
      console.log("Login wird gestartet...");
      await login(loginData.usernameOrEmail, loginData.password);
      console.log("Login erfolgreich");
      navigate("/quiz");
    } catch (err) {
      console.error("Login fehlgeschlagen:", err);
      setError(
        err.message || "Login fehlgeschlagen. Bitte prüfe deine Eingaben."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {registrationSuccess && (
          <div
            style={{
              color: "#155724",
              padding: "10px",
              backgroundColor: "#d4edda",
              borderRadius: "4px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            Registrierung erfolgreich. Bitte jetzt einloggen.
          </div>
        )}

        {error && (
          <div
            className="error-message"
            style={{
              color: "red",
              padding: "10px",
              backgroundColor: "#ffe6e6",
              borderRadius: "4px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <LoginForm onLogin={handleLogin} />

        <div className="auth-links">
          <p>Noch kein Account?</p>
          <Link to="/register">Jetzt registrieren</Link>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e7f3ff",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          <strong>Test-Accounts:</strong>
          <br />
          <br />
          <strong>Admin:</strong>
          <br />
          Username: admin
          <br />
          Email: admin@quiz.com
          <br />
          Passwort: admin123
          <br />
          <br />
          <strong>Normaler User:</strong>
          <br />
          Username: player1
          <br />
          Email: player1@quiz.com
          <br />
          Passwort: player123
        </div>
      </div>
    </div>
  );
};

export default Login;
