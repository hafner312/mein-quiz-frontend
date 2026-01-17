import { useCallback, useEffect, useState } from "react";
import {
  getTop10Players,
  getTop10ByCategory,
} from "../services/leaderboard-service";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("global");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { id: "global", label: "Global" },
    { id: "sports", label: "Sport" },
    { id: "movies", label: "Filme" },
    { id: "geography", label: "Geographie" },
  ];

  const loadLeaderboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data =
        selectedCategory === "global"
          ? await getTop10Players()
          : await getTop10ByCategory(selectedCategory);
      setLeaderboardData(data);
    } catch (err) {
      console.error("Error loading leaderboard:", err);
      setError("Fehler beim Laden des Leaderboards");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>

      <div className="leaderboard-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`tab-button ${
              selectedCategory === cat.id ? "tab-button--active" : ""
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="loading">
          <h3>Leaderboard wird geladen...</h3>
        </div>
      )}

      {error && (
        <div className="error">
          <h3>{error}</h3>
          <button onClick={loadLeaderboard}>
            Erneut versuchen
          </button>
        </div>
      )}

      {!isLoading && !error && leaderboardData.length > 0 && (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rang</th>
              <th>Spieler</th>
              <th>Spiele</th>
              <th>Punkte</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player, index) => (
              <tr key={player.userId} className="leaderboard-row">
                <td className="rank-cell">{getMedal(index + 1)}</td>
                <td className="username-cell">{player.username}</td>
                <td className="games-cell">{player.gamesPlayed}</td>
                <td className="score-cell">{player.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isLoading && !error && leaderboardData.length === 0 && (
        <div className="no-data">
          <h3>Noch keine Spieler im Leaderboard</h3>
          <p>Spiele ein Quiz, um auf dem Leaderboard zu erscheinen.</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
