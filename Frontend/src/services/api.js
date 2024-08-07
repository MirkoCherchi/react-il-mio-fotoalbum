import axios from "axios";

const BASE_URL = "http://localhost:3000";

const Api = {
  // Funzione per ottenere tutte le foto
  getPhotos: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/photos`);
      return response.data;
    } catch (error) {
      console.error("Errore durante il recupero delle foto:", error.message);
      throw error;
    }
  },

  // Funzione per ottenere una foto per ID
  getPhotoById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/photos/${id}`);
      const photoData = response.data;

      // Eseguire una chiamata separata per ottenere i dettagli dell'utente
      const userData = await Api.getUserProfile(photoData.userId); // Assicurati di usare la funzione corretta per ottenere il profilo dell'utente

      // Aggiungi i dettagli dell'utente ai dati della foto
      photoData.user = userData;

      return photoData;
    } catch (error) {
      console.error(
        `Errore durante il recupero della foto ${id}:`,
        error.message
      );
      throw error;
    }
  },

  // Funzione per ottenere le foto dell'utente loggato
  getPhotosByUser: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/photos`);
      const photos = response.data.filter((photo) => photo.userId === userId);
      return photos;
    } catch (error) {
      console.error(
        `Errore durante il recupero delle foto per l'utente ${userId}:`,
        error.message
      );
      throw error;
    }
  },

  // Funzione per creare una nuova foto
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

  // Funzione per aggiornare una foto esistente
  updatePhoto: async (id, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/photos/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(
        `Errore durante l'aggiornamento della foto ${id}:`,
        error.message
      );
      throw error;
    }
  },

  // Funzione per eliminare una foto
  deletePhoto: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/photos/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Errore durante l'eliminazione della foto ${id}:`,
        error.message
      );
      throw error;
    }
  },

  // Funzione per ottenere tutte le categorie
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

  // Funzione per ottenere le foto per una categoria specifica
  getPhotosByCategory: async (categoryId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/categories/${categoryId}/photos`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Errore durante il recupero delle foto per la categoria ${categoryId}:`,
        error.message
      );
      throw error;
    }
  },

  // Funzione per aggiungere una nuova categoria
  addCategory: async (categoryData) => {
    try {
      const response = await axios.post(`${BASE_URL}/categories`, categoryData);
      return response.data;
    } catch (error) {
      console.error(
        "Errore durante l'aggiunta della categoria:",
        error.message
      );
      throw error;
    }
  },

  // Funzione per ottenere il profilo utente
  getUserProfile: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Errore durante il recupero del profilo utente ${userId}:`,
        error.message
      );
      throw error;
    }
  },
};

export default Api;
