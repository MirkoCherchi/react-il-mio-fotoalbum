import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await Api.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error(
          "Errore durante il recupero delle categorie:",
          error.message
        );
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}/photos`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-beige">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24 md:py-32">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">
          Tutte le categorie
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <li
              key={category.id}
              className="relative bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-20 rounded-lg"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-2xl font-semibold text-white">
                  {category.name}
                </h2>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default AllCategories;
