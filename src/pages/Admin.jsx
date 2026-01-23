import { useEffect, useState } from "react";
import {
  getAllUsers,
  getAllNotes,
  updateUserRole,
  updateNoteAsAdmin,
  deleteNoteAsAdmin,
} from "../services/admin-service";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [editingNote, setEditingNote] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Admin users load failed:", err);
      setError("Fehler beim Laden der Benutzer");
    } finally {
      setIsLoading(false);
    }
  };

  const loadNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllNotes();
      setNotes(data);
    } catch (err) {
      console.error("Admin notes load failed:", err);
      setError("Fehler beim Laden der Notizen");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "users") {
      loadUsers();
    } else {
      loadNotes();
      if (users.length === 0) {
        loadUsers();
      }
    }
  }, [activeTab]);

  const handleRoleChange = async (userId, role) => {
    try {
      const updated = await updateUserRole(userId, role);
      setUsers((prev) =>
        prev.map((user) => (user.id === updated.id ? updated : user))
      );
    } catch (err) {
      console.error("Role update failed:", err);
      setError("Rolle konnte nicht aktualisiert werden");
    }
  };

  const handleEditNote = (note) => {
    setEditingNote({
      ...note,
      createdByUserId: note.createdByUserId ?? null,
    });
  };

  const handleNoteFieldChange = (field, value) => {
    setEditingNote((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNote = async () => {
    if (!editingNote) return;
    try {
      const updated = await updateNoteAsAdmin(editingNote.id, editingNote);
      setNotes((prev) =>
        prev.map((note) => (note.id === updated.id ? updated : note))
      );
      setEditingNote(null);
    } catch (err) {
      console.error("Note update failed:", err);
      setError("Notiz konnte nicht aktualisiert werden");
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Notiz wirklich löschen?")) return;
    try {
      await deleteNoteAsAdmin(noteId);
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
    } catch (err) {
      console.error("Note delete failed:", err);
      setError("Notiz konnte nicht gelöscht werden");
    }
  };

  return (
    <div className="page-container">
      <h1>Admin-Bereich</h1>

      <div className="leaderboard-tabs">
        <button
          className={`tab-button ${activeTab === "users" ? "tab-button--active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Benutzer
        </button>
        <button
          className={`tab-button ${activeTab === "notes" ? "tab-button--active" : ""}`}
          onClick={() => setActiveTab("notes")}
        >
          Notizen
        </button>
      </div>

      {isLoading && (
        <div className="loading">
          <h3>Lädt Daten...</h3>
        </div>
      )}

      {error && (
        <div className="error">
          <h3>{error}</h3>
        </div>
      )}

      {!isLoading && !error && activeTab === "users" && (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Rolle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="leaderboard-row">
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isLoading && !error && activeTab === "notes" && (
        <>
          <div className="admin-notes-filter">
            <label htmlFor="admin-user-select">Benutzer</label>
            <select
              id="admin-user-select"
              value={selectedUser}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedUser(value);
                setSelectedSubject("");
              }}
            >
              <option value="">Alle Benutzer</option>
              {users
                .map((user) => user.username)
                .sort((a, b) => a.localeCompare(b))
                .map((username) => (
                  <option key={username} value={username}>
                    {username}
                  </option>
                ))}
            </select>

            <label htmlFor="admin-subject-select">Thema</label>
            <select
              id="admin-subject-select"
              value={selectedSubject}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedSubject(value);
                if (value && selectedUser) {
                  const target = document.getElementById(
                    `admin-user-${selectedUser}`
                  );
                  target?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              <option value="">Alle Themen</option>
              {Array.from(
                new Set(
                  notes
                    .filter((note) =>
                      selectedUser
                        ? note.createdByUsername === selectedUser
                        : true
                    )
                    .map((note) => note.subject || "Unbekannt")
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
          {users
            .map((user) => ({
              username: user.username,
              notes: notes
                .filter((note) => note.createdByUsername === user.username)
                .sort((a, b) => a.title.localeCompare(b.title)),
            }))
            .sort((a, b) => {
              const aEmpty = a.notes.length === 0;
              const bEmpty = b.notes.length === 0;
              if (aEmpty !== bEmpty) {
                return aEmpty ? 1 : -1;
              }
              return a.username.localeCompare(b.username);
            })
            .map(({ username, notes: userNotes }) => {
              if (selectedUser && username !== selectedUser) {
                return null;
              }

              const subjectGroups = userNotes.reduce((acc, note) => {
                const key = note.subject || "Unbekannt";
                if (selectedSubject && key !== selectedSubject) {
                  return acc;
                }
                acc[key] = acc[key] || [];
                acc[key].push(note);
                return acc;
              }, {});

              const sortedSubjects = Object.keys(subjectGroups).sort((a, b) =>
                a.localeCompare(b)
              );

              return (
                <div
                  key={username}
                  id={`admin-user-${username}`}
                  style={{ marginBottom: "24px" }}
                >
                  <h3 style={{ marginBottom: "8px" }}>
                    {username} ({userNotes.length})
                  </h3>
                  {userNotes.length === 0 ? (
                    <div className="no-data">
                      <p>Keine Notizen vorhanden.</p>
                    </div>
                  ) : (
                    sortedSubjects.map((subject) => (
                      <div
                        key={`${username}-${subject}`}
                        style={{ marginBottom: "16px" }}
                      >
                        <h4 style={{ marginBottom: "6px" }}>{subject}</h4>
                        <table className="leaderboard-table">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Titel</th>
                              <th>Wichtigkeit</th>
                              <th>Aktionen</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subjectGroups[subject]
                              .sort((a, b) => a.title.localeCompare(b.title))
                              .map((note) => (
                                <tr key={note.id} className="leaderboard-row">
                                  <td>{note.id}</td>
                                  <td>{note.title}</td>
                                  <td>{note.importance}</td>
                                  <td>
                                    <button onClick={() => handleEditNote(note)}>
                                      Bearbeiten
                                    </button>
                                    <button onClick={() => handleDeleteNote(note.id)}>
                                      Löschen
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    ))
                  )}
                </div>
              );
            })}

          {editingNote && (
            <div className="question-form" style={{ marginTop: "20px" }}>
              <h3>Notiz bearbeiten (ID {editingNote.id})</h3>

              <div className="form-group">
                <label>Titel</label>
                <input
                  className="form-input"
                  value={editingNote.title || ""}
                  onChange={(e) => handleNoteFieldChange("title", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Fach</label>
                <input
                  className="form-input"
                  value={editingNote.subject || ""}
                  onChange={(e) => handleNoteFieldChange("subject", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Wichtigkeit</label>
                <select
                  className="form-input"
                  value={editingNote.importance || "MEDIUM"}
                  onChange={(e) => handleNoteFieldChange("importance", e.target.value)}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>

              <div className="form-group">
                <label>Inhalt</label>
                <textarea
                  className="form-input"
                  rows="4"
                  value={editingNote.content || ""}
                  onChange={(e) => handleNoteFieldChange("content", e.target.value)}
                />
              </div>

              <div className="edit-actions">
                <button onClick={handleSaveNote}>Speichern</button>
                <button onClick={() => setEditingNote(null)}>Abbrechen</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
