import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/register-form";
import { register } from "../services/auth-service";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (userData) => {
    setError("");

    try {
      await register(userData);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      setError(
        err.message || "Registrierung fehlgeschlagen. Bitte pruefe deine Daten."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
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

        <RegisterForm onRegister={handleRegister} />

        <div className="auth-links">
          <p>Schon registriert?</p>
          <Link to="/login">Zum Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
