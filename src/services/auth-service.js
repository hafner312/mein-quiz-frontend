import apiClient from "./api-client";

export const login = async (usernameOrEmail, password) => {
  try {
    console.log("Login-Versuch fuer:", usernameOrEmail);

    const response = await apiClient.post("/auth/login", {
      usernameOrEmail,
      password,
    });

    const { token, userId, id, username, email, role } = response.data;
    const resolvedUserId = userId ?? id;

    sessionStorage.setItem("authToken", token);

    const userData = { id: resolvedUserId, username, email, role };
    sessionStorage.setItem("userData", JSON.stringify(userData));

    console.log("Login erfolgreich - Token gespeichert");

    return response.data;
  } catch (error) {
    console.error("Login fehlgeschlagen:", error);
    const errorMessage =
      error.response?.data?.message || "Login fehlgeschlagen";
    throw new Error(errorMessage);
  }
};

export const logout = () => {
  console.log("Logout - Token wird geloescht");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userData");
};

export const isAuthenticated = () => {
  const token = sessionStorage.getItem("authToken");
  return !!token;
};

export const getToken = () => {
  return sessionStorage.getItem("authToken");
};

export const getUserData = () => {
  const userDataString = sessionStorage.getItem("userData");
  if (userDataString) {
    return JSON.parse(userDataString);
  }
  return null;
};

export const register = async (userData) => {
  try {
    console.log("Registrierung fuer:", userData.email);

    const response = await apiClient.post("/auth/register", userData);

    console.log("Registrierung erfolgreich");
    return response.data;
  } catch (error) {
    console.error("Registrierung fehlgeschlagen:", error);
    const errorMessage =
      error.response?.data?.message || "Registrierung fehlgeschlagen";
    throw new Error(errorMessage);
  }
};
