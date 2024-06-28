import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import Api from "../../services/api";
import Header from "../Header";
import Footer from "../Footer";

const PhotoUpdate = () => {
  const { id } = useParams(); // Recupera l'ID della foto dalla URL
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [tags, setTags] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Ottieni la funzione navigate

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
        visible: true, // Esempio di valore booleano per 'visible'
        userId: 123, // Sostituisci con l'ID dell'utente corrente
      };
      await Api.updatePhoto(id, updatedPhoto);
      // Dopo aver aggiornato con successo, esegui il redirect
      navigate("/edit-photos"); // Redirect alla pagina desiderata
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

  const handleCategoryChange = (e) => {
    const { options } = e.target;
    const selectedCategories = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => parseInt(option.value));
    setSelectedCategories(selectedCategories);
  };

  const handleRemoveCategory = (categoryId) => {
    const updatedSelectedCategories = selectedCategories.filter(
      (catId) => catId !== categoryId
    );
    setSelectedCategories(updatedSelectedCategories);
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
                URL dell'immagine
              </label>
              <input
                type="text"
                id="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-beige text-black"
                required
              />
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
                  <div
                    key={category.id}
                    className={`bg-gray-200 text-gray-800 px-3 py-1 rounded-full m-1 flex items-center ${
                      selectedCategories.includes(category.id)
                        ? "bg-teal-500"
                        : ""
                    }`}
                  >
                    <span>{category.name}</span>
                    <button
                      type="button"
                      className="ml-2 text-sm text-red-600 focus:outline-none"
                      onClick={() => handleRemoveCategory(category.id)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <select
                id="categories"
                value={selectedCategories}
                onChange={handleCategoryChange}
                className="w-full mt-2 p-2 border rounded-md bg-beige text-black"
                multiple
                required
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
