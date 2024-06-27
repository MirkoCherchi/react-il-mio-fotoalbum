import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context";
import Header from "../Header";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/admin"); // Redirect to admin page
    } catch (error) {
      setError("Credenziali non valide");
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen bg-teal">
        <div className="bg-beige p-8 rounded-lg shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gold text-white py-2 px-4 rounded-md hover:bg-yellow-800"
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
