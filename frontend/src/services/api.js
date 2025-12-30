// frontend/src/services/api.js
import axios from "axios";

export const fetchArticlesFromBackend = () =>
  axios.get("/api/articles");

export const triggerArticleFetch = () =>
  axios.post("/api/articles/fetch");

export const enhanceArticle = (id) =>
  axios.post(`/api/articles/${id}/enhance`);

export const deleteArticle = (id) =>
  axios.delete(`/api/articles/${id}`);