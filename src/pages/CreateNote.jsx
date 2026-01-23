import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { createNote, getNotesByUser } from "../services/note-service";
import NoteForm from "../components/note-form";

const CreateNote = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const loadSubjects = async () => {
      if (!user?.id) return;
      try {
        const existingNotes = await getNotesByUser(user.id);
        const uniqueSubjects = Array.from(
          new Set(
            existingNotes
              .map((note) => note.subject)
              .filter((subject) => !!subject && subject.trim().length > 0)
          )
        );
        setSubjects(uniqueSubjects);
      } catch (err) {
        console.error("Fächer konnten nicht geladen werden:", err);
      }
    };
    loadSubjects();
  }, [user?.id]);

  const handleNoteSubmit = async (newNoteData) => {
    try {
      setError("");
      const createdNote = await createNote({
        ...newNoteData,
        createdByUserId: user?.id,
      });
      if (createdNote) {
        navigate("/notes", { state: { createdId: createdNote.id } });
      }
    } catch (err) {
      console.error("Fehler beim Erstellen der Notiz:", err);
      setError("Notiz konnte nicht erstellt werden.");
    }
  };

  return (
    <div className="question-manager">
      <h1>Neue Notiz erstellen</h1>
      {error && <p className="error-message">{error}</p>}
      <NoteForm onNoteSubmit={handleNoteSubmit} subjects={subjects} />
    </div>
  );
};

export default CreateNote;
