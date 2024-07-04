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
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="bg-beige p-10 rounded-3xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-black">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block font-bold mb-2 text-black text-lg"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gold rounded-lg focus:outline-none focus:ring-4 focus:ring-teal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block font-bold mb-2 text-black text-lg"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 border border-gold rounded-lg focus:outline-none focus:ring-4 focus:ring-teal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gold text-white py-3 px-6 rounded-lg hover:bg-teal hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-black text-lg">
            Non sei ancora registrato?{" "}
            <Link
              to="/register"
              className="text-gold hover:text-teal transition-all duration-300 ease-in-out"
            >
              Registrati qui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
