// pages/AdminPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-beige">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Admin Page</h2>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-gray-300">
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Manage Photos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-teal">
                  Upload New Photo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal">
                  Edit Existing Photos
                </a>
              </li>
            </ul>
          </section>

          {/* Right Column */}
          {/* <section className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Filter Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-teal">
                  Add New Category
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal">
                  Edit Existing Categories
                </a>
              </li>
            </ul>
          </section> */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Photo App. Mirko Cherchi
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
