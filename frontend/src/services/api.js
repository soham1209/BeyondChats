// frontend/src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.PROD
  ? "https://beyondchats-backend-fxkm.onrender.com"
  : "http://localhost:5000"; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchArticlesFromBackend = () =>
  axios.get("/api/articles");

export const triggerArticleFetch = () =>
  axios.post("/api/articles/fetch");

export const enhanceArticle = (id) =>
  axios.post(`/api/articles/${id}/enhance`);

export const deleteArticle = (id) =>
  axios.delete(`/api/articles/${id}`);