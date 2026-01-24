import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Willkommen bei Lern- und Schulnotizen</h1>
        <p className="home-lead">
          Halte deine Lerninhalte strukturiert fest, plane Prüfungen und
          behalte deine Notizen jederzeit im Blick. Sammle Zusammenfassungen,
          Übungen und Lernziele an einem Ort, ordne sie nach Fächern und finde
          alles in wenigen Sekunden wieder. So bleibt dein Lernalltag klar,
          motivierend und leicht planbar. Erstelle jetzt deine erste Notiz.
        </p>
        <div className="home-actions">
          <Link className="home-button home-button--primary" to="/notes">
            Notizen öffnen
          </Link>
          <Link className="home-button home-button--secondary" to="/subjects">
            Fächer-Übersicht
          </Link>
        </div>
      </div>

      <div className="home-grid">
        <div className="home-card">
          <h3>Mehrere Fächer</h3>
          <p>
            Organisiere Notizen nach Mathematik, Sprachen oder Informatik.
          </p>
        </div>
        <div className="home-card">
          <h3>Persönliche Statistiken</h3>
          <p>
            Behalte den Überblick über deine Notizen und Lernfortschritte.
          </p>
        </div>
        <div className="home-card">
          <h3>Einfach und klar</h3>
          <p>
            Erstelle, bearbeite und finde deine Notizen in wenigen Klicks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
