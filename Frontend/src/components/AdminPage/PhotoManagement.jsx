import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ConfirmationModal from "../../components/Utils/ConfirmationModal";
import { AuthContext } from "../../components/Auth/Context";
import Api from "../../services/api";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const PhotoManagement = () => {
  const { loggedInUserId } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosData = await Api.getPhotos();
        setPhotos(photosData);
        setLoading(false);
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-20 flex-grow overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Gestione Foto
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Caricamento...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos
              .filter(
                (photo) => loggedInUserId && photo.userId === loggedInUserId
              )
              .map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition duration-300"
                >
                  <img
                    src={photo.img}
                    alt={photo.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-800 truncate">
                        {photo.title}
                      </h2>
                      <div className="flex space-x-2 items-center">
                        {/* Mostra solo icone su tablet e dispositivi mobili */}
                        <div className="hidden xl:flex">
                          <Link
                            to={`/admin/photos/${photo.id}/edit`}
                            className="bg-gold text-black px-3 py-1 rounded-md hover:bg-gold-dark transition duration-300 flex items-center"
                          >
                            <AiFillEdit className="mr-1" /> Modifica
                          </Link>
                          <button
                            onClick={() => openModal(photo.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300 flex items-center ml-2"
                          >
                            <AiFillDelete className="mr-1" /> Elimina
                          </button>
                        </div>
                        {/* Mostra solo icone su dispositivi mobili (tablet e sotto) */}
                        <div className="flex xl:hidden">
                          <Link
                            to={`/admin/photos/${photo.id}/edit`}
                            className="bg-gold text-black px-3 py-1 rounded-md hover:bg-gold-dark transition duration-300 flex items-center"
                          >
                            <AiFillEdit className="mr-1" />
                          </Link>
                          <button
                            onClick={() => openModal(photo.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300 flex items-center ml-2"
                          >
                            <AiFillDelete className="mr-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
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
