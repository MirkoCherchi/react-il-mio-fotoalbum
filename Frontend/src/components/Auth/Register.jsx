import React from "react";
import axios from "axios";
import Header from "../Header";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const registerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      img_path: formData.get("img_path"),
    };

    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        registerData
      );
      const { token, data } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "authData",
        JSON.stringify({ isAuthenticated: true, user: data })
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Registrazione avvenuta con successo:", data);
      e.target.reset();
    } catch (error) {
      console.error("Errore durante la registrazione:", error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen bg-teal">
        <div className="bg-beige p-8 rounded-lg shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-1">
                Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-1">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-1">
                Password<span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="img_path" className="block font-bold mb-1">
                Profile Image
              </label>
              <input
                type="file"
                id="img_path"
                name="img_path"
                accept="image/*"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gold text-white py-2 px-4 rounded-md hover:bg-yellow-800"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
