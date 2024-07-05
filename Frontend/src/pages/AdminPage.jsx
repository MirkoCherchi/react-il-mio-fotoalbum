import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../components/Auth/Context";
import { Link } from "react-router-dom";
import { FiHome, FiSettings, FiUpload, FiEdit, FiEye } from "react-icons/fi";

const AdminPage = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <section className="md:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-8">
              {user && user.img_path && (
                <img
                  className="rounded-full mr-4"
                  src={user.img_path}
                  alt="Immagine profilo"
                  style={{ width: "80px", height: "80px" }}
                />
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {user ? user.name : "Utente"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {user ? user.email : ""}
                </p>
              </div>
            </div>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="flex items-center py-2 px-4 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                >
                  <FiHome className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="flex items-center py-2 px-4 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                >
                  <FiSettings className="mr-2" /> Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/photos"
                  className="flex items-center py-2 px-4 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                >
                  <FiEye className="mr-2" /> Visualizza tutte le Foto
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="flex items-center py-2 px-4 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                >
                  <FiEye className="mr-2" /> Visualizza tutte le Categorie
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center py-2 px-4 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                >
                  <FiSettings className="mr-2" /> Logout
                </button>
              </li>
            </ul>
          </section>

          {/* Main Content */}
          <section className="md:col-span-2 bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Benvenuto {user ? user.name : "Utente"} nella tua Area
              Amministrativa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-teal-400">
                  Gestisci Foto <FiUpload className="inline-block ml-2" />
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/upload-photo"
                      className="flex items-center hover:text-teal-400"
                    >
                      <FiUpload className="mr-2" /> Carica Nuova Foto
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/edit-photos"
                      className="flex items-center hover:text-teal-400"
                    >
                      <FiEdit className="mr-2" /> Modifica Foto Esistenti
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Right Column */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-teal-400">
                  Gestisci Categorie <FiEdit className="inline-block ml-2" />
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/add-category"
                      className="flex items-center hover:text-teal-400"
                    >
                      <FiUpload className="mr-2" /> Aggiungi Nuova Categoria
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/edit-categories"
                      className="flex items-center hover:text-teal-400"
                    >
                      <FiEdit className="mr-2" /> Modifica Categorie Esistenti
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminPage;
