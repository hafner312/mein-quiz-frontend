import apiClient from "./api-client";

export const getUserStats = async (userId) => {
  const response = await apiClient.get(`/stats/user/${userId}`);
  return response.data;
};

export const getSubjectStats = async (userId) => {
  const response = await apiClient.get(`/stats/user/${userId}/subjects`);
  return response.data;
};
