import { useState, useEffect } from "react";
import Button from "./button";

const NoteCard = ({ note, onEdit, onDelete, isHighlighted = false }) => {
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
    <article className="note-card">
      {isEditing ? (
        <div className="note-edit-form">
          <h3 className="note-edit-title">Notiz bearbeiten</h3>

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

          <div className="note-actions">
            <Button
              text="✅ Speichern"
              onAnswerClick={saveChanges}
              className="note-action note-action--primary"
            />
            <Button
              text="❌ Abbrechen"
              onAnswerClick={cancelEditing}
              className="note-action note-action--ghost"
            />
          </div>
        </div>
      ) : (
        <>
          <header className="note-header">
            <h3 className="note-title">{note.title}</h3>
            <div className="note-badges">
              <span className="note-badge">{note.subject}</span>
              <span className="note-badge note-badge--muted">
                {note.importance}
              </span>
            </div>
          </header>

          <div className="note-content">
            {note.content}
          </div>

          <div className="note-actions">
            <Button
              text="✏️ Bearbeiten"
              onAnswerClick={startEditing}
              className="note-action note-action--ghost"
            />
            <Button
              text="🗑️ Löschen"
              onAnswerClick={handleDelete}
              className="note-action note-action--danger"
            />
          </div>
        </>
      )}
    </article>
  );
};

export default NoteCard;
