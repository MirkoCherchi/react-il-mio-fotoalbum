import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Api from "../services/api";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the app element for accessibility

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!categoryName) {
      setError("Il nome della categoria è obbligatorio");
      return;
    }

    try {
      await Api.addCategory({ name: categoryName });
      setModalIsOpen(true); // Open the modal upon success
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Categoria già esistente.");
      } else {
        setError("Errore durante l'aggiunta della categoria");
      }
      console.error(
        "Errore durante l'aggiunta della categoria:",
        error.message
      );
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/categories");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-beige">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-28 flex items-center justify-center">
        <section className="p-8 bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">
            Aggiungi Categoria
          </h2>
          <p className="text-lg text-gray-300 mb-6 text-center">
            Inserisci una nuova categoria
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-gray-400 mb-2"
                htmlFor="categoryName"
              >
                Nome Categoria
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg shadow-inner placeholder-gray-500"
                placeholder="Nome della categoria"
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Aggiungi Categoria
            </button>
          </form>
        </section>
      </main>
      <Footer />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Successo!</h2>
          <p className="text-lg text-gray-300 mb-4">
            Categoria aggiunta con successo!
          </p>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Prosegui
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddCategory;
