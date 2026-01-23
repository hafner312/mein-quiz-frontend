import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getNotesByUser, updateNote, deleteNote } from "../services/note-service";
import NoteCard from "../components/note-card";

const Notes = () => {
  const { user, isAuthenticated } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("ALL");
  const [highlightId, setHighlightId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const loadNotes = async () => {
      if (!user?.id) return;
      const loadedNotes = await getNotesByUser(user.id);
      setNotes(loadedNotes);
    };
    if (isAuthenticated) {
      loadNotes();
    }
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    const createdId = location.state?.createdId;
    if (createdId) {
      setHighlightId(createdId);
    }
  }, [location.state]);

  useEffect(() => {
    if (!highlightId) return;
    if (notes.length === 0) return;

    const createdNote = notes.find((note) => note.id === highlightId);
    if (createdNote) {
      const subject = createdNote.subject || "Unbekannt";
      if (selectedSubject !== "ALL" && selectedSubject !== subject) {
        setSelectedSubject(subject);
      }
    }

    requestAnimationFrame(() => {
      const target = document.getElementById(`note-${highlightId}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      const timeout = setTimeout(() => setHighlightId(null), 500);
      return () => clearTimeout(timeout);
    });
  }, [highlightId, notes, selectedSubject]);

  const handleNoteEdit = async (updatedNote) => {
    try {
      const response = await updateNote(updatedNote.id, updatedNote);
      if (response) {
        const updatedNotes = notes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        );
        setNotes(updatedNotes);
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Notiz:", error);
    }
  };

  const handleNoteDelete = async (noteId) => {
    try {
      const deletedID = await deleteNote(noteId);
      if (deletedID) {
        setNotes((prev) => prev.filter((note) => note.id !== noteId));
      }
    } catch (error) {
      console.error("Fehler beim Löschen der Notiz:", error);
    }
  };

  return (
    <div className="question-manager">
      <h1>Meine Lernnotizen</h1>

      <div className="saved-questions-section">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2 style={{ margin: 0 }}>Meine Notizen ({notes.length})</h2>
          <div style={{ marginLeft: "auto" }}>
            <select
              className="form-input"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="ALL">Alle Fächer</option>
              {Array.from(
                new Set(
                  notes
                    .map((note) => note.subject || "Unbekannt")
                    .filter(Boolean)
                )
              )
                .sort((a, b) => a.localeCompare(b))
                .map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="no-questions">
            <p>📝 Noch keine Notizen erstellt.</p>
            <p>Erstelle deine erste Notiz über „Neue Notiz“.</p>
          </div>
        ) : (
          <div className="notes-grid">
            {Object.keys(
              notes.reduce((acc, note) => {
                const key = note.subject || "Unbekannt";
                if (selectedSubject !== "ALL" && key !== selectedSubject) {
                  return acc;
                }
                acc[key] = acc[key] || [];
                acc[key].push(note);
                return acc;
              }, {})
            )
              .sort((a, b) => a.localeCompare(b))
              .map((subject) => {
                const subjectNotes = notes
                  .filter((note) => (note.subject || "Unbekannt") === subject)
                  .filter(
                    (note) =>
                      selectedSubject === "ALL" ||
                      (note.subject || "Unbekannt") === selectedSubject
                  )
                  .sort((a, b) => a.title.localeCompare(b.title));

                return (
                  <div key={subject} style={{ marginBottom: "20px" }}>
                    <h3 style={{ marginBottom: "12px" }}>{subject}</h3>
                    {subjectNotes.map((note) => (
                      <div key={note.id} id={`note-${note.id}`}>
                        <NoteCard
                          note={note}
                          onEdit={handleNoteEdit}
                          onDelete={handleNoteDelete}
                        />
                      </div>
                    ))}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
