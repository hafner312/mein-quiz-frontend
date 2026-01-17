const Rules = () => {
  return (
    <div className="rules-page">
      <h1>Spielregeln</h1>
      <p className="rules-lead">
        Willkommen beim WISS-Quiz. Diese Regeln sorgen für ein faires und
        klares Spielerlebnis.
      </p>
      <div className="rules-grid">
        <div className="rule-card">
          <h3>Zugang und Start</h3>
          <p>
            Du musst eingeloggt sein, um ein Quiz zu starten. Wähle eine
            Kategorie und schon geht es los.
          </p>
        </div>
        <div className="rule-card">
          <h3>Antworten und Punkte</h3>
          <p>
            Pro Frage gibt es genau eine richtige Antwort. Jede richtige
            Antwort bringt einen Punkt, falsche Antworten bringen keine Punkte.
          </p>
        </div>
        <div className="rule-card">
          <h3>Ergebnis und Neustart</h3>
          <p>
            Am Ende siehst du dein Ergebnis und kannst ein neues Spiel starten,
            um deinen Score zu verbessern.
          </p>
        </div>
        <div className="rule-card">
          <h3>Fairplay</h3>
          <p>
            Bitte spiele fair, nutze keine Hilfe von außen und respektiere
            andere. Mehrfach-Accounts sind nicht erlaubt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
