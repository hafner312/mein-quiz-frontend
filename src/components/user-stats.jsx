import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUserStats } from "../services/stats-service";

const UserStats = () => {
  const { user, isAuthenticated } = useAuth();

  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUserStats = useCallback(async () => {
    if (!user?.id) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getUserStats(user.id);
      setStats(data);
    } catch (err) {
      console.error("Error loading user stats:", err);
      setError("Fehler beim Laden der Statistiken");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadUserStats();
    }
  }, [isAuthenticated, user?.id, loadUserStats]);

  if (!isAuthenticated) {
    return (
      <div className="user-stats-container">
        <div className="no-auth">
          <h2>Login erforderlich</h2>
          <p>Du musst eingeloggt sein, um deine Statistiken zu sehen.</p>
          <Link to="/login" className="button">
            Zum Login
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="user-stats-container">
        <div className="loading">
          <h3>Lädt deine Statistiken...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-stats-container">
        <div className="error">
          <h3>{error}</h3>
          <button onClick={loadUserStats} className="button">
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-stats-container">
      <div className="stats-header">
        <h1>Meine Statistiken</h1>
        <p className="stats-username">
          Nutzer: <strong>{stats?.username || user?.username}</strong>
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card--games">
          <div className="stat-icon">N</div>
          <div className="stat-content">
            <h3 className="stat-label">Notizen gesamt</h3>
            <p className="stat-value">{stats?.totalNotes || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-card--score">
          <div className="stat-icon">F</div>
          <div className="stat-content">
            <h3 className="stat-label">Fächer genutzt</h3>
            <p className="stat-value">{stats?.subjectsUsed || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-card--average">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3 className="stat-label">Letzte Aktualisierung</h3>
            <p className="stat-value">
              {stats?.lastUpdatedAt
                ? new Date(stats.lastUpdatedAt).toLocaleDateString("de-CH")
                : "-"}
            </p>
          </div>
        </div>
      </div>

      {stats?.totalNotes === 0 && (
        <div className="no-games">
          <h3>Noch keine Notizen erstellt</h3>
          <p>Erstelle deine erste Notiz, um Statistiken zu sehen.</p>
          <Link to="/notes" className="button">
            Notiz erstellen
          </Link>
        </div>
      )}

      <div className="stats-actions">
        <button onClick={loadUserStats} className="button button--secondary">
          Aktualisieren
        </button>
      </div>
    </div>
  );
};

export default UserStats;
