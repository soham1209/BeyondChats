// frontend/src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.PROD
  ? "https://beyondchats-backend-fxkm.onrender.com" 
  : "http://localhost:5000"; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchArticlesFromBackend = () => 
  apiClient.get("/api/articles");

export const triggerArticleFetch = () => 
  apiClient.post("/api/articles/fetch");

export const enhanceArticle = (id) => 
  apiClient.post(`/api/articles/${id}/enhance`);

export const deleteArticle = (id) => 
  apiClient.delete(`/api/articles/${id}`);