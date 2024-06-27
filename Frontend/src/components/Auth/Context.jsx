// components/Auth/Context.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_API_URL;
console.log(apiUrl);

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authData = JSON.parse(localStorage.getItem("authData"));

    if (token && authData && authData.isAuthenticated) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(authData.user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, userData);
      const { token, data } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "authData",
        JSON.stringify({ isAuthenticated: true, user: data })
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(error.response.data.message || "User not found");
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userData);
      const { token, data } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "authData",
        JSON.stringify({ isAuthenticated: true, user: data })
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(error.response.data.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authData");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
