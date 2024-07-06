import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PhotoHomePage from "../assets/photo-HomePage.jpg";
import { FiCamera, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { AuthContext } from "../components/Auth/Context";

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const handleButtonClick = () => {
    // Logic to redirect based on authentication status
    if (isAuthenticated) {
      // User is authenticated, redirect to upload photo page
      window.location.href = "/upload-photo";
    } else {
      // User is not authenticated, redirect to login page
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-beige">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-24 md:py-32 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col justify-center hover:shadow-xl transition duration-300"
          >
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-bold mb-4"
              >
                Esplora e Condividi la Bellezza della Fotografia
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-gray-300"
              >
                Unisciti alla nostra comunità di appassionati di fotografia.
                Carica, scopri e condividi immagini straordinarie. Sia che tu
                sia un fotografo esperto o un principiante, Photo App è il posto
                perfetto per trovare ispirazione e mostrare il tuo talento.
              </motion.p>
            </div>
            <div className="flex justify-center">
              <Link
                to={isAuthenticated ? "/photos" : "/login"}
                className="bg-teal-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 flex items-center transform hover:scale-105"
              >
                <FiArrowRight className="mr-2" /> Vedi tutte le Foto
              </Link>
            </div>
          </motion.section>

          {/* Right Column */}
          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="p-6 bg-gray-900 rounded-lg shadow-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div
                className="absolute inset-0 bg-black opacity-50"
                style={{ mixBlendMode: "multiply" }}
              ></div>
              <motion.img
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                src={PhotoHomePage}
                alt="Featured"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-end justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleButtonClick}
                  className="bg-teal-500 text-white bg-black bg-opacity-50 py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 flex items-center transform hover:scale-105"
                >
                  <FiCamera className="mr-2" /> Scatta una Foto
                </motion.button>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
