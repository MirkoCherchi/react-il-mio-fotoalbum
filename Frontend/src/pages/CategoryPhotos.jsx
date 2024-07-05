import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import Api from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PhotosByCategory = () => {
  const { categoryId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Importa useNavigate da 'react-router-dom'

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosData = await Api.getPhotosByCategory(categoryId);
        if (photosData && Array.isArray(photosData)) {
          setPhotos(photosData);
        } else {
          setPhotos([]);
        }
        setLoading(false);
      } catch (error) {
        console.error(
          "Errore durante il recupero delle foto per categoria:",
          error.message
        );
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [categoryId]);

  const handlePhotoClick = (photoId) => {
    navigate(`/photos/${photoId}`); // Naviga alla pagina dettaglio della foto
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Foto per Categoria</h1>
          <Link
            to="/categories"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            Torna a tutte le categorie
          </Link>
        </div>

        {loading && (
          <div className="flex items-center justify-center h-64">
            <p className="text-xl text-gray-400">Caricamento...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500 text-xl">{error}</p>
          </div>
        )}

        {!loading && photos.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 text-xl">
              Nessuna foto trovata per questa categoria.
            </p>
          </div>
        )}

        {photos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                onClick={() => handlePhotoClick(photo.id)}
              >
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="w-full h-64 object-cover transition duration-300 transform hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    className="bg-gray-900 bg-opacity-50 hover:bg-opacity-75 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePhotoClick(photo.id);
                    }}
                  >
                    <FiEye className="mr-2" />
                    Dettagli
                  </button>
                </div>
                <div className="p-6 absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent">
                  <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
                  <p className="text-gray-300">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PhotosByCategory;
