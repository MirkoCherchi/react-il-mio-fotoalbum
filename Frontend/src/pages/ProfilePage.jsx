import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/Auth/Context";
import Header from "../components/Header";
import Api from "../services/api";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setError("Utente non autenticato");
        setLoading(false);
        return;
      }

      try {
        const response = await Api.getUserProfile(user.id);
        setProfile(response.data);
      } catch (error) {
        console.error("Errore durante il recupero del profilo:", error.message);
        setError("Errore durante il recupero del profilo");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        {error}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto py-32 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="flex items-center justify-center">
                <img
                  src={user?.img_path || "/default-avatar.png"}
                  alt="Profile Avatar"
                  className="w-32 h-32 sm:w-48 sm:h-48 rounded-full shadow-md"
                />
              </div>
              <h1 className="text-3xl font-extrabold text-center text-gray-900 mt-4">
                {user?.name || "Nome Utente"}
              </h1>
              <p className="text-lg text-center text-gray-600 mt-2">
                {user?.email || "email@esempio.com"}
              </p>
            </div>
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">Nome</p>
                  <p className="text-lg text-gray-600">
                    {profile?.name || "username"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    Data di Registrazione
                  </p>
                  <p className="text-lg text-gray-600">
                    {profile
                      ? new Date(profile.createdAt).toLocaleDateString()
                      : "01/01/2020"}
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/edit-photos"
                  className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                >
                  <p className="text-lg font-semibold text-gray-900">
                    Numero di Foto
                  </p>
                  <p className="text-lg text-gray-600 pb-4">
                    {profile?.photoCount || 0}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
