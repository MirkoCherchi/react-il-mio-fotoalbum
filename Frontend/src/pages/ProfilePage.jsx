import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/Auth/Context";
import Header from "../components/Header";
import Api from "../services/api";
import { Link } from "react-router-dom";
import { FiUser, FiCalendar, FiCamera } from "react-icons/fi";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileAndPhotos = async () => {
      if (!user) {
        setError("Utente non autenticato");
        setLoading(false);
        return;
      }

      try {
        // Ottieni il profilo dell'utente
        const profileResponse = await Api.getUserProfile(user.id);
        setProfile(profileResponse.data);

        // Ottieni le foto dell'utente
        const photosResponse = await Api.getPhotosByUser(user.id);
        setPhotos(photosResponse);
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error.message);
        setError("Errore durante il recupero dei dati");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPhotos();
  }, [user]);

  const handleDeletePhoto = async (id) => {
    try {
      await Api.deletePhoto(id);
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
      console.log(`Foto con ID ${id} eliminata con successo.`);
    } catch (error) {
      console.error("Errore durante l'eliminazione della foto:", error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-beige">
        Caricamento...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-beige">
        {error}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-black min-h-screen text-beige">
        <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="flex items-center justify-center">
                <img
                  src={user?.img_path || "/default-avatar.png"}
                  alt="Profile Avatar"
                  className="w-32 h-32 sm:w-48 sm:h-48 rounded-full shadow-md object-cover border-4 border-teal"
                />
              </div>
              <h1 className="text-4xl font-extrabold text-center text-gold mt-4">
                {user?.name || "Nome Utente"}
              </h1>
              <p className="text-xl text-center text-teal mt-2">
                {user?.email || "email@esempio.com"}
              </p>
            </div>
            <div className="border-t border-gray-700 bg-black bg-opacity-50 px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-xl font-semibold text-teal flex items-center justify-center">
                    <FiUser className="mr-2 text-2xl" /> Nome
                  </p>
                  <p className="text-lg text-gold">
                    {profile?.name || "username"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold text-teal flex items-center justify-center">
                    <FiCalendar className="mr-2 text-2xl" /> Data di
                    Registrazione
                  </p>
                  <p className="text-lg text-gold">
                    {profile
                      ? new Date(profile.createdAt).toLocaleDateString()
                      : "01/01/2020"}
                  </p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xl font-semibold text-teal flex items-center justify-center">
                  <FiCamera className="mr-2 text-2xl" /> Numero di Foto
                </p>
                <p className="text-lg text-gold">{photos.length}</p>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={
                    photo.img ||
                    `https://via.placeholder.com/300?text=Foto+${photo.id}`
                  }
                  alt={photo.title || `Foto ${photo.id}`}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                  <Link
                    to={`/photos/${photo.id}`}
                    className="text-teal text-xl font-bold"
                  >
                    Visualizza
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
