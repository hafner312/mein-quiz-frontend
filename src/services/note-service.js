import apiClient from "./api-client";

export const getNotesByUser = async (userId) => {
  const response = await apiClient.get(`/notes/user/${userId}`);
  return response.data;
};

export const getAllNotes = async () => {
  const response = await apiClient.get("/notes");
  return response.data;
};

export const searchNotes = async (keyword) => {
  const response = await apiClient.get("/notes/search", {
    params: { keyword },
  });
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await apiClient.post("/notes", noteData);
  return response.data;
};

export const updateNote = async (noteId, updatedData) => {
  const response = await apiClient.put(`/notes/${noteId}`, updatedData);
  return response.data;
};

export const deleteNote = async (noteId) => {
  await apiClient.delete(`/notes/${noteId}`);
  return noteId;
};
