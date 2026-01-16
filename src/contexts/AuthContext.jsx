import { createContext, useContext, useEffect, useState } from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  getUserData,
} from "../services/auth-service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserData = getUserData();

    if (storedToken && storedUserData) {
      setToken(storedToken);
      setUser(storedUserData);
      setIsAuthenticated(true);
    } else {
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  };

  const login = async (usernameOrEmail, password) => {
    try {
      const response = await apiLogin(usernameOrEmail, password);

      setToken(response.token);
      setUser({
        id: response.userId ?? response.id,
        username: response.username,
        email: response.email,
        role: response.role,
      });
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>Laedt...</h2>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth muss innerhalb von AuthProvider verwendet werden!");
  }
  return context;
};
