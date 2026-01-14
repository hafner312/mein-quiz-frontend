import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (usernameOrEmail, password) => {
    setIsLoading(true);

    setTimeout(() => {
      if (usernameOrEmail && password) {
        const fakeUser = {
          id: 1,
          username: usernameOrEmail.includes("@")
            ? usernameOrEmail.split("@")[0]
            : usernameOrEmail,
          email: usernameOrEmail.includes("@")
            ? usernameOrEmail
            : `${usernameOrEmail}@example.com`,
          role:
            usernameOrEmail === "admin" || usernameOrEmail === "admin@quiz.com"
              ? "ADMIN"
              : "USER",
        };

        const fakeToken = "fake-jwt-token-" + Date.now();

        setUser(fakeUser);
        setToken(fakeToken);
        console.log("✅ Login erfolgreich (FAKE):", fakeUser);
      } else {
        console.error("❌ Login fehlgeschlagen");
      }

      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    console.log("👋 User ausgeloggt");
  };

  const isAuthenticated = user !== null;

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
