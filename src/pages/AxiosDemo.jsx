import { useState } from "react";
import { login, logout, isAuthenticated } from "../services/auth-service";
import { getQuizQuestions } from "../services/question-service";

const AxiosDemo = () => {
  const [email, setEmail] = useState("admin@quiz.com");
  const [password, setPassword] = useState("admin123");
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [message, setMessage] = useState("");
  const [quizData, setQuizData] = useState(null);

  const handleLogin = async () => {
    try {
      setMessage("Login laeuft...");
      await login(email, password);
      setLoggedIn(true);
      setMessage("Login erfolgreich!");
    } catch (error) {
      setMessage("Login fehlgeschlagen: " + error.message);
    }
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setQuizData(null);
    setMessage("Logout erfolgreich");
  };

  const handleLoadQuiz = async () => {
    try {
      setMessage("Lade Quiz-Fragen...");
      const data = await getQuizQuestions();
      setQuizData(data);
      setMessage("Quiz geladen!");
    } catch (error) {
      setMessage("Fehler: " + error.message);
    }
  };

  return (
    <div className="axios-demo">
      <h1>Axios Interceptor Demo</h1>
      <p>Spring Boot Backend auf: http://localhost:8080</p>

      <div
        style={{
          padding: "20px",
          backgroundColor: loggedIn ? "#d4edda" : "#f8d7da",
          borderRadius: "8px",
          margin: "20px 0",
        }}
      >
        <h2>Status: {loggedIn ? "Eingeloggt" : "Nicht eingeloggt"}</h2>
        {message && <p>{message}</p>}
      </div>

      {!loggedIn && (
        <div
          style={{
            border: "2px solid #007bff",
            padding: "20px",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          <h3>Login</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            style={{ marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            style={{ marginBottom: "10px" }}
          />
          <button
            onClick={handleLogin}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Login
          </button>
        </div>
      )}

      {loggedIn && (
        <div
          style={{
            border: "2px solid #28a745",
            padding: "20px",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          <h3>Geschuetzter Bereich</h3>
          <p>Du bist eingeloggt! Jetzt kannst du geschuetzte Daten abrufen.</p>

          <button
            onClick={handleLoadQuiz}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Quiz laden
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: "#dc3545",
              color: "white",
            }}
          >
            Logout
          </button>

          {quizData && (
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <h4>Quiz Daten:</h4>
              <pre style={{ textAlign: "left", overflow: "auto" }}>
                {JSON.stringify(quizData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AxiosDemo;
