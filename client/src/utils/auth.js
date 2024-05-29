import { redirect } from "react-router-dom";

export const setSession = (token) => {
  localStorage.setItem("jwtToken", token);
};

export const getSession = () => {
  return localStorage.getItem("jwtToken");
};

export const checkAuthLoader = () => {
  const token = getSession();
  if (!token) {
    return redirect("/auth/login");
  }
  return null;
};

export const getSessionRequired = () => {
  const token = getSession();
  if (!token) return false;
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  return redirect("/auth/login");
};
