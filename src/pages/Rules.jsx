const Rules = () => {
  return (
    <div className="rules-page">
      <h1>Nutzungsregeln</h1>
      <p className="rules-lead">
        Willkommen bei Lern- und Schulnotizen. Diese Regeln sorgen für ein
        klares und respektvolles Miteinander.
      </p>
      <div className="rules-grid">
        <div className="rule-card">
          <h3>Zugang und Start</h3>
          <p>
            Du musst eingeloggt sein, um Notizen zu erstellen oder zu
            bearbeiten. Deine Notizen sind deinem Account zugeordnet.
          </p>
        </div>
        <div className="rule-card">
          <h3>Inhalte und Struktur</h3>
          <p>
            Verwende klare Titel, passende Fächer und kurze Absätze, damit
            deine Notizen später schnell gefunden werden.
          </p>
        </div>
        <div className="rule-card">
          <h3>Aktualität</h3>
          <p>
            Halte Notizen aktuell. Ergänze neue Erkenntnisse und markiere
            Wichtigkeit, damit dein Lernstand sichtbar bleibt.
          </p>
        </div>
        <div className="rule-card">
          <h3>Fairplay</h3>
          <p>
            Respektiere andere Nutzer:innen. Keine beleidigenden Inhalte oder
            Mehrfach-Accounts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
