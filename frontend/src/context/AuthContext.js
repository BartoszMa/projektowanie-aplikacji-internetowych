import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedUser) {
      setUsername(storedUser);
    }
    if (storedToken) {
        setToken(storedToken);
    }
    setIsAuthInitialized(true);
  }, []);

  const login = (name, token) => {
    setUsername(name);
    setToken(token);
    localStorage.setItem("username", name);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUsername(null);
    setToken(null);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        isLoggedIn: !!username,
        isAuthInitialized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
