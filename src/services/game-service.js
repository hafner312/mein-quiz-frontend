import apiClient from "./api-client";

/**
 * Starts a new quiz game session in the backend.
 *
 * @param {number} userId - User ID
 * @param {string} category - Category (e.g. "sports")
 * @param {number} totalQuestions - Number of questions
 * @returns {Promise<Object>} Game session with ID
 */
export const startGame = async (userId, category, totalQuestions = 10) => {
  try {
    const response = await apiClient.post("/game/start", null, {
      params: {
        userId,
        category,
        totalQuestions,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error starting game:", error);
    throw error;
  }
};

/**
 * Finishes a game session and stores the result.
 *
 * @param {number} sessionId - Game session ID
 * @param {number} correctAnswers - Number of correct answers
 * @returns {Promise<Object>} Final game result
 */
export const finishGame = async (sessionId, correctAnswers) => {
  try {
    const response = await apiClient.put(`/game/${sessionId}/finish`, null, {
      params: {
        correctAnswers,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error finishing game:", error);
    throw error;
  }
};
