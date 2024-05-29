// src/context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import {
  getSessionRequired,
  logout as removeSession,
  setSession,
} from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(getSessionRequired());
  const [authError, setAuthError] = useState(null);
  //   const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(getSessionRequired());
  }, []);

  const login = (token) => {
    try {
      setSession(token);
    } catch (error) {
      setAuthError(error.message);
      removeSession();
    }
  };

  const logout = () => {
    removeSession();
    setIsAuthenticated(false);
    return redirect("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
};
