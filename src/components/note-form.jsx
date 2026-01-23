import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "./button";

const NoteForm = ({ onNoteSubmit }) => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [importance, setImportance] = useState("MEDIUM");
  const [content, setContent] = useState("");

  const [titleError, setTitleError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;

    setTitleError("");
    setSubjectError("");
    setContentError("");

    if (!title.trim()) {
      setTitleError("Titel ist erforderlich");
      isValid = false;
    }

    if (!subject.trim()) {
      setSubjectError("Fach ist erforderlich");
      isValid = false;
    }

    if (!content.trim()) {
      setContentError("Inhalt ist erforderlich");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const newNote = {
      title,
      subject,
      importance,
      content,
      createdByUserId: user?.id,
    };

    onNoteSubmit(newNote);

    setTitle("");
    setSubject("");
    setImportance("MEDIUM");
    setContent("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h2>Neue Notiz erstellen</h2>

      <div className="form-group">
        <label htmlFor="title">Titel *</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="z.B. Zusammenfassung Photosynthese"
          className={`form-input ${titleError ? "form-input--error" : ""}`}
        />
        {titleError && <span className="error-message">{titleError}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="subject">Fach *</label>
        <input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="z.B. Biologie"
          className={`form-input ${subjectError ? "form-input--error" : ""}`}
        />
        {subjectError && <span className="error-message">{subjectError}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="importance">Wichtigkeit</label>
        <select
          id="importance"
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
          className="form-input"
        >
          <option value="LOW">Niedrig</option>
          <option value="MEDIUM">Mittel</option>
          <option value="HIGH">Hoch</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="content">Inhalt *</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Notizinhalt..."
          className={`form-input ${contentError ? "form-input--error" : ""}`}
          rows="4"
        />
        {contentError && <span className="error-message">{contentError}</span>}
      </div>

      <div className="edit-actions">
        <Button
          text={isSubmitting ? "Speichern..." : "Notiz speichern"}
          onAnswerClick={handleSubmit}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default NoteForm;
