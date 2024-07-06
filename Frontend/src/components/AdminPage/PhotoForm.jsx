import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AuthContext } from "../../components/Auth/Context";
import Api from "../../services/api";

const PhotoForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Stato per l'anteprima dell'immagine
  const [error, setError] = useState(null);

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

  // Funzione per gestire il cambiamento dell'immagine
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageUrl(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      await Api.createPhoto(formData);
      navigate("/edit-photos");
    } catch (error) {
      console.error("Errore durante il caricamento della foto:", error.message);
      setError(error.message);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Carica una Nuova Foto
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          <div>
            <label htmlFor="title" className="block text-lg mb-1">
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
            <label htmlFor="description" className="block text-lg mb-1">
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
            <label htmlFor="visible" className="block text-lg mb-1">
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
            <label htmlFor="categories" className="block text-lg mb-1">
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
            <label htmlFor="image" className="block text-lg mb-1">
              Immagine
            </label>
            <div className="flex items-center bg-gray-800 text-white rounded p-3">
              <label
                htmlFor="file-upload"
                className="flex items-center cursor-pointer"
              >
                <AiOutlineCloudUpload className="text-3xl mr-2" />
                <span>Seleziona un'immagine...</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required
              />
            </div>
            {imageUrl && (
              <div className="mt-4 rounded-md shadow-md bg-gray-800 p-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="rounded-md mb-2 mx-auto" // Aggiunta di `mx-auto` per centrare l'immagine
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h3 className="text-lg font-bold mb-1">{title}</h3>
                  <p className="text-sm mb-2">{description}</p>
                  {selectedCategories.map((category, index) => (
                    <span
                      key={category.value}
                      className="inline-block bg-blue-600 text-white px-2 py-1 rounded-full text-xs mr-2 mb-2"
                    >
                      {category.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
