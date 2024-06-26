// api.js

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
};

export default Api;
