import { useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { startGame } from "../services/game-service";
import { getQuizQuestions } from "../services/question-service";

import Button from "../components/button";
import GameSession from "../components/game-session";

const Game = () => {
  const { user, isAuthenticated } = useAuth();

  const [gameSessionId, setGameSessionId] = useState(null);

  // Bestehende States
  const [showCategorySelector, setShowCategorySelector] = useState(true);
  const [apiQuestions, setApiQuestions] = useState([]);

  // Neue States für Ladezustand und Fehler
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Kategorie-Button-Klick-Handler
  // warum async? Damit wir await verwenden können
  // warum await? Damit wir warten, bis die Fragen geladen sind, bevor wir den Zustand ändern
  // warum setShowCategorySelector(false)? Damit die Kategorie-Auswahl ausgeblendet wird
  // warum kein useEffect?
  // Weil wir die Fragen nur laden wollen, wenn der Benutzer eine Kategorie auswählt
  // und nicht nicht automatisch beim Laden der Seite
  const handleCategoryClick = async (category) => {
    if (!isAuthenticated || !user?.id) {
      setError("Du musst eingeloggt sein, um zu spielen!");
      setShowCategorySelector(true);
      return;
    }

    setShowCategorySelector(false);
    setIsLoading(true);
    setError(null);

    try {
      const questions = await getQuizQuestions(5, category);

      if (questions.length === 0) {
        setError("Keine Fragen für diese Kategorie verfügbar");
        setShowCategorySelector(true);
        return;
      }

      const gameSession = await startGame(user.id, category, questions.length);
      setGameSessionId(gameSession.id);
      setApiQuestions(questions);
    } catch (err) {
      console.error("Backend Error:", err);
      if (err.response?.status === 401) {
        setError("Bitte logge dich erneut ein.");
      } else if (err.response?.status === 404) {
        setError(
          "Kategorie nicht gefunden. Bitte versuche eine andere Kategorie."
        );
      } else if (err.response?.status >= 500) {
        setError("Server-Fehler. Bitte versuche es später erneut.");
      } else {
        setError("Fehler beim Laden der Fragen. Bitte versuche es erneut.");
      }
      setShowCategorySelector(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset-Handler, um das Spiel zurückzusetzen
  // warum setShowCategorySelector(true)?
  // Damit die Kategorie-Auswahl wieder angezeigt wird
  // warum setApiQuestions([])?
  // Damit die Fragen zurückgesetzt werden und das Spiel neu gestartet werden kann
  const handleResetGame = () => {
    setShowCategorySelector(true);
    setApiQuestions([]);
    setGameSessionId(null);
  };

  return (
    <div className="game">
      {/* Loading-Zustand anzeigen */}
      {isLoading && (
        <div className="loading">
          <h2>🔄 Fragen werden geladen...</h2>
          <p>Bitte warten Sie einen Moment.</p>
        </div>
      )}

      {/* Error-Zustand anzeigen */}
      {error && (
        <div className="error">
          <h2>❌ Fehler aufgetreten</h2>
          <p>{error}</p>
          <Button
            text="Zurück zur Auswahl"
            onAnswerClick={() => {
              setError(null);
              setShowCategorySelector(true);
            }}
          />
        </div>
      )}

      {/* Kategorienauswahl nur anzeigen wenn nicht geladen wird und kein Fehler */}
      {showCategorySelector && !isLoading && !error && (
        <div>
          <h2>Wähle eine Kategorie:</h2>
          <div className="category-buttons">
            <Button
              text="Sport"
              onAnswerClick={() => handleCategoryClick("sports")}
            />
            <Button
              text="Filme"
              onAnswerClick={() => handleCategoryClick("movies")}
            />
            <Button
              text="Geographie"
              onAnswerClick={() => handleCategoryClick("geography")}
            />
          </div>
        </div>
      )}

      {/* Quiz-Session nur anzeigen wenn Fragen vorhanden und nicht geladen wird */}
      {!showCategorySelector &&
        !isLoading &&
        !error &&
        apiQuestions.length > 0 && (
          <GameSession
            questions={apiQuestions}
            onResetGame={handleResetGame}
            gameSessionId={gameSessionId}
          />
        )}
    </div>
  );
};

export default Game;
