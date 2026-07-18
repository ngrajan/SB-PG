import axios from "axios";

const backendUrl = import.meta.env.VITE_API_URL;

const apiHandlers = {
  getCall: async (url) => {
    try {
      const response = await axios.get(`${backendUrl}${url}`);
      return response.data;
    } catch (error) {
      console.error("Error making GET request:", error);
      throw error;
    }
  },

  postCall: async (url, data) => {
    try {
      const response = await axios.post(`${backendUrl}${url}`, data);
      return response.data;
    } catch (error) {
      console.error("Error making POST request:", error);
      throw error;
    }
  },
};

export default apiHandlers;
