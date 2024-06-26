// pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-beige">
      {/* Header */}
      <header className="bg-black text-beige py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="text-2xl font-bold">
            Photo App
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-teal">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-teal">
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Welcome to Photo App</h2>
            <p className="text-lg text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              condimentum tortor id libero tristique, quis venenatis orci
              ultricies.
            </p>
          </section>

          {/* Right Column */}
          <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Featured Photos</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src="/public/photo-HomePage.jpg"
                  alt="Featured"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gold py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Photo App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
