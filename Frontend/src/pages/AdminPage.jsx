import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-beige">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-32">
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
          <section className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Manage Categories</h3>
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
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminPage;
