import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import defaultPhoto from "../assets/photo-HomePage.jpg";
import Api from "../services/api";
import defaultAvatar from "../assets/avatar-default.jpg";

const SinglePhoto = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const photoData = await Api.getPhotoById(id);
        setPhoto(photoData);
        setLoading(false);
      } catch (error) {
        console.error(
          `Errore durante il recupero della foto con ID ${id}:`,
          error.message
        );
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  const toggleFullscreen = () => {
    setFullscreenImage(!fullscreenImage);
    if (!fullscreenImage) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  if (loading) {
    return <p className="text-center text-white">Caricamento in corso...</p>;
  }

  if (error) {
    return <p className="text-center text-white">Errore: {error}</p>;
  }

  if (!photo) {
    return <p className="text-center text-white">Foto non trovata.</p>;
  }

  const userName = photo.user
    ? photo.user.data.name || "Autore sconosciuto"
    : "Autore sconosciuto";
  const userAvatar = photo.user
    ? photo.user.data.img_path || defaultAvatar
    : defaultAvatar;

  return (
    <div className="flex flex-col min-h-screen bg-black text-beige">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 md:py-32">
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <div
            className={`relative cursor-pointer ${
              fullscreenImage
                ? "fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75"
                : ""
            }`}
            onClick={toggleFullscreen}
          >
            <img
              src={photo.img || defaultPhoto}
              alt={photo.title}
              className={`object-contain ${
                fullscreenImage
                  ? "fixed inset-0 w-full h-full object-cover"
                  : "object-cover w-full h-auto"
              }`}
              style={{ aspectRatio: "16/9" }}
            />
            {fullscreenImage && <button onClick={toggleFullscreen}></button>}
          </div>

          <div className="bg-gray-900 px-6 py-8 md:py-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              {photo.title}
            </h2>
            <p className="text-gray-400 mb-6">{photo.description}</p>

            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-gray-400 ml-4">{userName}</p>
            </div>

            <div>
              <span className="text-gray-400">Categorie: </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {photo.categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm text-gray-200"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Link
        to="/photos"
        className="fixed bottom-1/2 right-4 text-white text-sm bg-gray-800 bg-opacity-50 px-4 py-2 rounded"
      >
        Torna a tutte le foto
      </Link>
    </div>
  );
};

export default SinglePhoto;
