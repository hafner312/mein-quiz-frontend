import apiClient from "./api-client";

export const getAllUsers = async () => {
  const response = await apiClient.get("/admin/users");
  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const response = await apiClient.put(`/admin/users/${userId}/role`, {
    role,
  });
  return response.data;
};

export const getAllNotes = async () => {
  const response = await apiClient.get("/admin/notes");
  return response.data;
};

export const updateNoteAsAdmin = async (noteId, updatedData) => {
  const response = await apiClient.put(`/admin/notes/${noteId}`, updatedData);
  return response.data;
};

export const deleteNoteAsAdmin = async (noteId) => {
  await apiClient.delete(`/admin/notes/${noteId}`);
  return noteId;
};
