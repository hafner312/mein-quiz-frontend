import { useState, useEffect } from "react";
import Button from "./button";

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editImportance, setEditImportance] = useState("MEDIUM");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (note) {
      setEditTitle(note.title || "");
      setEditSubject(note.subject || "");
      setEditImportance(note.importance || "MEDIUM");
      setEditContent(note.content || "");
    }
  }, [note]);

  if (!note) {
    return <div className="question-card">Loading note...</div>;
  }

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    const updatedNote = {
      ...note,
      title: editTitle,
      subject: editSubject,
      importance: editImportance,
      content: editContent,
    };

    onEdit(updatedNote);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Sind Sie sicher, dass Sie diese Notiz löschen möchten?"
    );
    if (isConfirmed) {
      onDelete(note.id);
    }
  };

  return (
    <div className="question-card">
      {isEditing ? (
        <div className="editing-form">
          <h3>Notiz bearbeiten</h3>

          <div className="edit-field">
            <label>Titel:</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="edit-field">
            <label>Fach:</label>
            <input
              type="text"
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="edit-field">
            <label>Wichtigkeit:</label>
            <select
              value={editImportance}
              onChange={(e) => setEditImportance(e.target.value)}
              className="form-input"
            >
              <option value="LOW">Niedrig</option>
              <option value="MEDIUM">Mittel</option>
              <option value="HIGH">Hoch</option>
            </select>
          </div>

          <div className="edit-field">
            <label>Inhalt:</label>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="form-input"
              rows="4"
            />
          </div>

          <div className="edit-actions">
            <Button
              text="✅ Speichern"
              onAnswerClick={saveChanges}
              className="save-button"
            />
            <Button
              text="❌ Abbrechen"
              onAnswerClick={cancelEditing}
              className="cancel-button"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="question-header">
            <h3>{note.title}</h3>
            <div className="question-meta">
              <span className="category-badge">{note.subject}</span>
              <span className="difficulty-badge">{note.importance}</span>
            </div>
          </div>

          <div className="question-answers">
            <div className="correct-answer">
              <strong>📝 Inhalt:</strong> {note.content}
            </div>
          </div>

          <div className="question-actions">
            <Button
              text="✏️ Bearbeiten"
              onAnswerClick={startEditing}
              className="edit-button"
            />
            <Button
              text="🗑️ Löschen"
              onAnswerClick={handleDelete}
              className="delete-button"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;
