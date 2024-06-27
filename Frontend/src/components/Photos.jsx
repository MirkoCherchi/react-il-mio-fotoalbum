import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import defaultPhoto from "../assets/photo-HomePage.jpg";
import Api from "../services/api";

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
      <main className="flex-1 container mx-auto px-4 py-24 md:py-32">
        <div className="mb-8">
          <span className="text-white mr-2">Filtra per categoria:</span>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="p-6 bg-gray-800 rounded-lg shadow-lg"
              style={{ height: "100%" }}
            >
              <div
                className="relative rounded-lg overflow-hidden mb-4"
                style={{ height: "250px" }}
              >
                <img
                  src={photo.img || defaultPhoto}
                  alt={photo.title}
                  className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>

              <div className="text-white mb-2">
                <h3 className="text-xl font-bold">{photo.title}</h3>
                <p className="text-gray-300">{photo.description}</p>
              </div>

              <p className="text-gray-400">
                Visible: {photo.visible ? "Yes" : "No"}
              </p>

              <p className="text-gray-400">
                User: {photo.user?.name || "Unknown"}
              </p>

              <div className="mt-2">
                <span className="text-gray-400">Categories: </span>
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
