import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Api from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ConfirmationModal from "../../components/Utils/ConfirmationModal";
import { AuthContext } from "../../components/Auth/Context";

const PhotoManagement = () => {
  const { loggedInUserId } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosData = await Api.getPhotos();
        setPhotos(photosData);
      } catch (error) {
        console.error("Errore durante il recupero delle foto:", error.message);
        setError(error.message);
      }
    };

    fetchPhotos();
  }, []);

  const handleDeletePhoto = async (id) => {
    try {
      await Api.deletePhoto(id);
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
      console.log(`Foto con ID ${id} eliminata con successo dal frontend.`);
    } catch (error) {
      console.error("Errore durante l'eliminazione della foto:", error.message);
      setError(error.message);
    }
  };

  const openModal = (photoId) => {
    setShowModal(true);
    setPhotoToDelete(photoId);
  };

  const closeModal = () => {
    setShowModal(false);
    setPhotoToDelete(null);
  };

  const confirmDelete = async () => {
    if (photoToDelete) {
      await handleDeletePhoto(photoToDelete);
      closeModal();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <div className="container mx-auto px-4 py-24 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-beige text-center">
          Gestione Foto
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 gap-4">
          {photos
            .filter(
              (photo) => loggedInUserId && photo.userId === loggedInUserId
            )
            .map((photo) => (
              <div
                key={photo.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex items-center mb-4"
              >
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="w-24 h-24 object-cover"
                />
                <div className="p-4 bg-gray-800 flex-1 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-beige mb-2">
                      {photo.title}
                    </h2>
                  </div>
                  <div>
                    <Link
                      to={`/admin/photos/${photo.id}/edit`}
                      className="bg-teal text-black px-4 py-2 rounded-md hover:bg-gold hover:text-white mr-4"
                    >
                      Modifica
                    </Link>
                    <button
                      onClick={() => openModal(photo.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
      <ConfirmationModal
        isOpen={showModal}
        onCancel={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default PhotoManagement;
