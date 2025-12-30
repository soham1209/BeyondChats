// Backend/src/services/articleUpdate.service.js
import axios from "axios";

const API_URL =
  process.env.BACKEND_API_URL || "http://localhost:5000/api/articles";

export const fetchOriginalArticles = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data.filter((a) => a.status === "original");
  } catch (error) {
    console.error("Failed to fetch articles:", error.message);
    return [];
  }
};
