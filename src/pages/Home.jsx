import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Willkommen beim WISS-Quiz</h1>
        <p className="home-lead">
          Teste dein Wissen, sammle Punkte und klettere im Leaderboard nach
          oben. Starte jetzt dein nächstes Quiz.
        </p>
        <div className="home-actions">
          <Link className="home-button home-button--primary" to="/quiz">
            Quiz starten
          </Link>
          <Link className="home-button home-button--secondary" to="/leaderboard">
            Leaderboard ansehen
          </Link>
        </div>
      </div>

      <div className="home-grid">
        <div className="home-card">
          <h3>Mehrere Kategorien</h3>
          <p>
            Wähle aus Sport, Filme oder Geographie und finde deine Stärken.
          </p>
        </div>
        <div className="home-card">
          <h3>Persönliche Statistiken</h3>
          <p>
            Sieh dir deine Spiele, Punkte und den Durchschnitt in den Stats an.
          </p>
        </div>
        <div className="home-card">
          <h3>Fair und schnell</h3>
          <p>
            Kurze Runden, klare Regeln und sofortiges Feedback nach jeder
            Frage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
