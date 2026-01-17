import apiClient from "./api-client";

/**
 * Loads the top 10 players (global).
 *
 * @returns {Promise<Array>} Top 10 players
 */
export const getTop10Players = async () => {
  try {
    const response = await apiClient.get("/leaderboard/top10");
    return response.data;
  } catch (error) {
    console.error("Error loading global leaderboard:", error);
    throw error;
  }
};

/**
 * Loads the top 10 players for a category.
 *
 * @param {string} category - Category (e.g. "sports")
 * @returns {Promise<Array>} Top 10 players for the category
 */
export const getTop10ByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/leaderboard/top10/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error loading category leaderboard:", error);
    throw error;
  }
};

/**
 * Loads user statistics.
 *
 * @param {number} userId - User ID
 * @returns {Promise<Object>} User statistics
 */
export const getUserStats = async (userId) => {
  try {
    const response = await apiClient.get(`/leaderboard/user/${userId}/stats`);
    return response.data;
  } catch (error) {
    console.error("Error loading user stats:", error);
    throw error;
  }
};
