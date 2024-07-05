import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PhotoHomePage from "../assets/photo-HomePage.jpg";
import { FiCamera, FiArrowRight } from "react-icons/fi";
import { AuthContext } from "../components/Auth/Context";

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Logic to redirect based on authentication status
    if (isAuthenticated) {
      // User is authenticated, navigate to upload photo page
      navigate("/upload-photo");
    } else {
      // User is not authenticated, navigate to login page
      navigate("/login");
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
          <section className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col justify-center hover:shadow-xl transition duration-300">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Welcome to Photo App</h2>
              <p className="text-lg text-gray-300">
                Discover the beauty of photography with us. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                to={isAuthenticated ? "/photos" : "/login"}
                className="bg-teal-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 flex items-center transform hover:scale-105"
              >
                <FiArrowRight className="mr-2" /> Vedi tutte le Foto
              </Link>
            </div>
          </section>

          {/* Right Column */}
          <section className="p-6 bg-gray-900 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div
                className="absolute inset-0 bg-black opacity-50"
                style={{ mixBlendMode: "multiply" }}
              ></div>
              <img
                src={PhotoHomePage}
                alt="Featured"
                className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-end justify-center">
                <button
                  onClick={handleButtonClick}
                  className="bg-teal-500 text-white bg-black bg-opacity-50 py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 flex items-center transform hover:scale-105"
                >
                  <FiCamera className="mr-2" /> Scatta una Foto
                </button>
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

export default HomePage;
