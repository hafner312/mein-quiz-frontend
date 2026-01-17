import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "72px", margin: "0" }}>403</h1>
      <h2>Zugriff verweigert</h2>
      <p style={{ fontSize: "18px", color: "#666" }}>
        Du hast keine Berechtigung für diese Seite.
      </p>
      <p style={{ fontSize: "16px", color: "#888", marginTop: "20px" }}>
        Diese Seite ist nur für Administratoren zugänglich.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
};

export default Forbidden;
