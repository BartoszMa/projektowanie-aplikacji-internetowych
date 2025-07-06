import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
    setIsAuthInitialized(true);
  }, []);

  const login = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
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
