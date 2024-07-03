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
  const [visible, setVisible] = useState(false);
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
        setVisible(photoData.visible);
      } catch (error) {
        console.error("Error retrieving photo:", error.message);
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
        tags: tags.split(",").map((tag) => tag.trim()),
        categories: selectedCategories,
        visible,
        userId: 123,
      };

      console.log("Update request payload:", updatedPhoto);
      await Api.updatePhoto(id, updatedPhoto);
      navigate("/edit-photos");
    } catch (error) {
      console.error("Error updating photo:", error.message);
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
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-teal-400">
            Modifica Foto
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {photo && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-400 font-medium"
                >
                  Titolo
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-teal-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-400 font-medium"
                >
                  Descrizione
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-teal-400"
                  rows={4}
                />
              </div>
              <div>
                <label
                  htmlFor="img"
                  className="block text-gray-400 font-medium"
                >
                  Immagine
                </label>
                <div className="mt-2">
                  {img && (
                    <img
                      src={img}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="categories"
                  className="block text-gray-400 font-medium"
                >
                  Categorie
                </label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center text-gray-300"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="form-checkbox h-5 w-5 text-teal-400"
                      />
                      <span className="ml-2">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="visible"
                    className="block text-gray-400 font-medium"
                  >
                    Visibilità
                  </label>
                  <div className="mt-2">
                    <label className="inline-flex items-center text-gray-300">
                      <input
                        type="checkbox"
                        checked={visible}
                        onChange={() => setVisible(!visible)}
                        className="form-checkbox h-5 w-5 text-teal-400"
                      />
                      <span className="ml-2">Visibile</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center pt-24">
                  <button
                    type="submit"
                    className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 mr-4"
                  >
                    Salva Modifiche
                  </button>
                  <Link
                    to="/admin/photos"
                    className="text-teal-400 hover:text-teal-300"
                  >
                    Annulla
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhotoUpdate;
