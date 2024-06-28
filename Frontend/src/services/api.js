import axios from "axios";

const BASE_URL = "http://localhost:3000";

const Api = {
  getPhotos: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/photos`);
      return response.data;
    } catch (error) {
      console.error("Errore durante il recupero delle foto:", error.message);
      throw error;
    }
  },
  createPhoto: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/photos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Errore durante il caricamento della foto:", error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error(
        "Errore durante il recupero delle categorie:",
        error.message
      );
      throw error;
    }
  },
};

export default Api;
