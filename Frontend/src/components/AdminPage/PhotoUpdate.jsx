import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Api from "../../services/api";
import Header from "../Header";
import Footer from "../Footer";

const PhotoUpdate = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [img, setImg] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhoto = async () => {
      setLoading(true);
      try {
        const photoData = await Api.getPhotoById(id);
        setPhoto(photoData);
        setTitle(photoData.title);
        setDescription(photoData.description);
        setImg(photoData.img);
        setTags(photoData.tags ? photoData.tags.join(", ") : "");
        const categoriesData = await Api.getCategories();
        setCategories(categoriesData);
        setSelectedCategories(
          photoData.categories ? photoData.categories.map((cat) => cat.id) : []
        );
      } catch (error) {
        console.error("Errore durante il recupero della foto:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedPhoto = {
        id,
        title,
        description,
        img,
        tags: tags.split(",").map((tag) => tag.trim()),
        categories: selectedCategories,
        visible: true,
        userId: 123,
      };
      console.log("Payload della richiesta di aggiornamento:", updatedPhoto);
      await Api.updatePhoto(id, updatedPhoto);
      navigate("/edit-photos");
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento della foto:",
        error.message
      );
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Modifica Foto</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {photo && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700"
              >
                Titolo
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-beige text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700"
              >
                Descrizione
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-beige text-black"
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="img"
                className="block text-lg font-medium text-gray-700"
              >
                Immagine
              </label>
              <div className="mt-2">
                {img && (
                  <img
                    src={img}
                    alt="Preview"
                    className="max-w-xs max-h-64 object-contain"
                  />
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="categories"
                className="block text-lg font-medium text-gray-700"
              >
                Categorie
              </label>
              <div className="flex flex-wrap mt-1">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center mr-4 mb-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="form-checkbox h-5 w-5 text-teal-600"
                    />
                    <span className="ml-2">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
              >
                Salva Modifiche
              </button>
              <Link
                to="/admin/photos"
                className="ml-4 text-teal-500 hover:text-teal-600"
              >
                Annulla
              </Link>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PhotoUpdate;
