import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import defaultPhoto from "../assets/photo-HomePage.jpg";
import Api from "../services/api";
import { FiEye } from "react-icons/fi";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Fetch photos
        const photosData = await Api.getPhotos();
        setPhotos(photosData);
        setLoading(false);

        // Fetch categories
        const categoriesData = await Api.getCategories();
        setCategories([
          { id: "All", name: "All" },
          ...categoriesData.map((category) => ({
            id: category.id,
            name: category.name,
          })),
        ]);
      } catch (error) {
        console.error("Errore durante il recupero delle foto:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleViewDetails = (id) => {
    // Naviga alla pagina SinglePhoto con l'ID della foto
    window.location.href = `/photos/${id}`;
  };

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((photo) =>
          photo.categories.some((cat) => cat.name === selectedCategory)
        );

  if (loading) {
    return <p className="text-center text-white">Caricamento in corso...</p>;
  }

  if (error) {
    return <p className="text-center text-white">Errore: {error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-beige">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Tutte le Foto</h2>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="block appearance-none w-full bg-gray-800 border border-gray-700 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-900 focus:border-gray-900"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M18.707 8.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 111.414-1.414L10 14.586l6.293-6.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="relative rounded-lg overflow-hidden mb-4">
                <img
                  src={photo.img || defaultPhoto}
                  alt={photo.title}
                  className="object-cover w-full h-64 md:h-72 xl:h-80 transition-transform duration-500 transform hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleViewDetails(photo.id)}
                    className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center"
                  >
                    <FiEye className="mr-2" /> Guarda Dettagli
                  </button>
                </div>
              </div>

              <div className="text-white mb-2">
                <h3 className="text-xl font-bold">{photo.title}</h3>
                <p className="text-gray-300">{photo.description}</p>
              </div>

              <p className="text-gray-400">
                Visibile: {photo.visible ? "Sì" : "No"}
              </p>

              <p className="text-gray-400">
                Autore: {photo.user?.name || "Sconosciuto"}
              </p>

              <div className="mt-2">
                <span className="text-gray-400">Categorie: </span>
                {photo.categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-block bg-gray-600 rounded-full px-2 py-1 text-sm text-gray-200 mr-2 mb-2"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Photos;
