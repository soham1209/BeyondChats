import axios from "axios";

// 1. DETERMINE BACKEND URL
// We explicitly check if we are in production. 
// If yes, we force the Backend URL. If no, we use localhost.
const API_BASE_URL = import.meta.env.PROD
  ? "https://beyondchats-backend-fxkm.onrender.com" // YOUR BACKEND URL
  : "http://localhost:5000"; // LOCAL URL

console.log("--------------------------------------");
console.log("🔌 API SERVICE INITIALIZED");
console.log("🌍 MODE:", import.meta.env.MODE);
console.log("🔗 TARGET BACKEND:", API_BASE_URL);
console.log("--------------------------------------");

// 2. CREATE AXIOS INSTANCE
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 3. ADD "TOO MUCH LOGS" (Request Interceptor)
// This runs BEFORE the request leaves your browser
apiClient.interceptors.request.use(
  (config) => {
    console.group(`🚀 REQUEST: ${config.method?.toUpperCase()} ${config.url}`);
    console.log("🔗 Full URL:", config.baseURL + config.url);
    console.log("📦 Payload:", config.data);
    console.log("🛡️ Headers:", config.headers);
    console.groupEnd();
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// 4. ADD "TOO MUCH LOGS" (Response Interceptor)
// This runs WHEN the response comes back
apiClient.interceptors.response.use(
  (response) => {
    console.group(`✅ RESPONSE: ${response.status} ${response.config.url}`);
    console.log("📦 Data:", response.data);
    console.groupEnd();
    return response;
  },
  (error) => {
    console.group(`🚨 ERROR: ${error.config?.url}`);
    console.error("❌ Message:", error.message);
    console.error("🔢 Status Code:", error.response?.status);
    console.error("📄 Response Data:", error.response?.data);
    
    if (error.response?.status === 404) {
      console.warn("⚠️ 404 WARNING: The backend endpoint was not found.");
      console.warn("👉 Check if your backend route '/api/articles' actually exists.");
    }
    console.groupEnd();
    return Promise.reject(error);
  }
);

// 5. API FUNCTIONS (Using the logging instance)
// Note: We keep '/api' here assuming your backend routes are defined like router.get('/api/articles')
export const fetchArticlesFromBackend = () => 
  apiClient.get("/api/articles");

export const triggerArticleFetch = () => 
  apiClient.post("/api/articles/fetch");

export const enhanceArticle = (id) => 
  apiClient.post(`/api/articles/${id}/enhance`);

export const deleteArticle = (id) => 
  apiClient.delete(`/api/articles/${id}`);