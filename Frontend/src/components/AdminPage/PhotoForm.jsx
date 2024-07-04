import React, { useState, useEffect, useContext } from "react";
import Api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Context";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Select from "react-select";

const PhotoForm = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await Api.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error(
          "Errore durante il recupero delle categorie:",
          error.message
        );
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("UserId nel form:", user.id);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("visible", visible);
    formData.append(
      "categories",
      JSON.stringify(selectedCategories.map((cat) => cat.value))
    );
    formData.append("image", image);
    formData.append("userId", user.id);

    try {
      console.log("FormData:", formData);

      await Api.createPhoto(formData);
      navigate("/photos");
    } catch (error) {
      console.error("Errore durante il caricamento della foto:", error.message);
      setError(error.message);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-beige">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24 md:py-32">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Carica una Nuova Foto
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label htmlFor="title" className="block text-white text-lg">
              Titolo
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-white text-lg">
              Descrizione
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-white"
            />
          </div>
          <div>
            <label htmlFor="visible" className="block text-white text-lg">
              Visibile
            </label>
            <select
              id="visible"
              value={visible}
              onChange={(e) => setVisible(e.target.value === "true")}
              className="w-full p-3 rounded bg-gray-800 text-white"
            >
              <option value="true">Sì</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="categories" className="block text-white text-lg">
              Categorie
            </label>
            <Select
              isMulti
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              value={selectedCategories}
              onChange={handleCategoryChange}
              className="text-black"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-white text-lg">
              Immagine
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-3 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded bg-blue-600 text-white font-bold hover:bg-blue-700"
          >
            Carica
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PhotoForm;
