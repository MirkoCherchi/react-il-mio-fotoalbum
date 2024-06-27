import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PhotoHomePage from "../assets/photo-HomePage.jpg";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-beige">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-32">
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
                  src={PhotoHomePage}
                  alt="Featured"
                  className="object-cover w-full h-full"
                />
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
