// frontend/src/services/api.js
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const fetchArticlesFromBackend = async () => {
  return axios.get(`${API_BASE}/articles`);
};

export const triggerArticleFetch = async () => {
  return axios.post(`${API_BASE}/articles/fetch`);
};

export const enhanceArticle = (id) => {
  return axios.post(`${API_BASE}/articles/${id}/enhance`);
};

export const deleteArticle = (id) => {
  return axios.delete(`${API_BASE}/articles/${id}`);
};