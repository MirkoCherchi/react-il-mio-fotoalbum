import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

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
      const response = await axios.post(`${apiUrl}/auth/login`, userData);
      const { token, data } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "authData",
        JSON.stringify({ isAuthenticated: true, user: data })
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(data);
      setIsAuthenticated(true);
      navigate("/admin");
    } catch (error) {
      throw new Error(error.response.data.message || "Login failed");
    }
  };

  const register = async (userData) => {
    try {
      const formData = new FormData();
      formData.append("email", userData.email);
      formData.append("name", userData.name);
      formData.append("password", userData.password);
      formData.append("img_path", userData.img_path);

      const response = await axios.post(`${apiUrl}/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { token, data } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "authData",
        JSON.stringify({ isAuthenticated: true, user: data })
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(data);
      setIsAuthenticated(true);
      navigate("/login");
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
    navigate("/");
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
