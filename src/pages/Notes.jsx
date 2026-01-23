import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getNotesByUser,
  createNote,
  updateNote,
  deleteNote,
} from "../services/note-service";
import NoteForm from "../components/note-form";
import NoteCard from "../components/note-card";

const Notes = () => {
  const { user, isAuthenticated } = useAuth();
  const [notes, setNotes] = useState([]);

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

  const handleNoteSubmit = async (newNoteData) => {
    try {
      const createdNote = await createNote(newNoteData);
      if (createdNote) {
        setNotes((prevNotes) => [...prevNotes, createdNote]);
      }
    } catch (error) {
      console.error("Fehler beim Erstellen der Notiz:", error);
    }
  };

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

      <NoteForm onNoteSubmit={handleNoteSubmit} />

      <div className="saved-questions-section">
        <h2>Meine Notizen ({notes.length})</h2>

        {notes.length === 0 ? (
          <div className="no-questions">
            <p>📝 Noch keine Notizen erstellt.</p>
            <p>Erstelle oben deine erste Notiz!</p>
          </div>
        ) : (
          <div className="questions-list">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleNoteEdit}
                onDelete={handleNoteDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
