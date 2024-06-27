// Login.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Context";
import Header from "../Header";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      login();
    } else {
      alert("Credenziali non valide");
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen bg-teal">
        <div className="bg-beige p-8 rounded-lg shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label htmlFor="username" className="block font-bold mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-gold text-white py-2 px-4 rounded-md hover:bg-yellow-800"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Non sei ancora registrato?{" "}
            <Link to="/register" className="text-gold">
              Registrati qui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
