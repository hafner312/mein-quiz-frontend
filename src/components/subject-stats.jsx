import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getSubjectStats } from "../services/stats-service";

const SubjectStats = () => {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadStats = useCallback(async () => {
    if (!user?.id) return;
    setIsLoading(true);
    setError(null);

    try {
      const data = await getSubjectStats(user.id);
      setStats(data);
    } catch (err) {
      console.error("Error loading subject stats:", err);
      setError("Fehler beim Laden der Fächerstatistiken");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadStats();
    }
  }, [isAuthenticated, user?.id, loadStats]);

  if (!isAuthenticated) {
    return (
      <div className="leaderboard-container">
        <h2>Login erforderlich</h2>
        <p>Bitte logge dich ein, um deine Fächerstatistiken zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <h1>Fächer-Übersicht</h1>

      {isLoading && (
        <div className="loading">
          <h3>Statistiken werden geladen...</h3>
        </div>
      )}

      {error && (
        <div className="error">
          <h3>{error}</h3>
          <button onClick={loadStats}>Erneut versuchen</button>
        </div>
      )}

      {!isLoading && !error && stats.length > 0 && (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Fach</th>
              <th>Notizen</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((subject) => (
              <tr key={subject.subject} className="leaderboard-row">
                <td className="username-cell">{subject.subject}</td>
                <td className="games-cell">{subject.notesCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isLoading && !error && stats.length === 0 && (
        <div className="no-data">
          <h3>Noch keine Notizen vorhanden</h3>
          <p>Erstelle deine erste Notiz, um Statistiken zu sehen.</p>
        </div>
      )}
    </div>
  );
};

export default SubjectStats;
