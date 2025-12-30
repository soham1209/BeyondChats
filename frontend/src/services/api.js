// // frontend/src/services/api.js
// const USE_MOCK_DATA = true;

// const MOCK_ARTICLES = [
//   {
//     id: 1,
//     title: "The Future of Artificial Intelligence in Healthcare",
//     status: "updated",
//     preview: "AI is revolutionizing diagnostics...",
//     original_article: "AI is revolutionizing the way we approach diagnostics and treatment plans. Doctors are using it to find diseases faster. It is very useful for checking X-rays and MRI scans. In the future, robots might do surgery.",
//     updated_article: "# The Future of Artificial Intelligence in Healthcare\n\nArtificial Intelligence (AI) is fundamentally transforming the healthcare landscape, shifting paradigms in diagnostics, treatment protocols, and patient care.\n\n## Diagnostic Precision\n\nMachine learning algorithms are currently being utilized to analyze medical imaging with precision that often surpasses human capability.\n\n### References\n1. Journal of Digital Medicine, 2024\n2. AI in Healthcare Annual Report"
//   },
//   {
//     id: 2,
//     title: "Basic Gardening Tips for Beginners",
//     status: "original",
//     preview: "Gardening is a great hobby. You need soil, seeds...",
//     original_article: "Gardening is a great hobby. You need soil, seeds, and water to start. Put the seeds in the dirt. Water them every day but not too much. Make sure they get sun. Wait for them to grow. It is relaxing.",
//     updated_article: null
//   },
//   {
//     id: 3,
//     title: "Understanding Quantum Computing",
//     status: "updated",
//     preview: "Quantum computers use qubits instead of bits...",
//     original_article: "Quantum computers use qubits instead of bits. This allows for massive parallel processing. They are faster than normal computers. They can solve hard math problems.",
//     updated_article: "# Understanding Quantum Computing\n\nQuantum computing represents a leap forward in computational power, leveraging the principles of quantum mechanics.\n\n## Qubits vs Bits\n\nUnlike classical bits which exist as either 0 or 1, quantum bits (qubits) can exist in a state of superposition.\n\n### References\n1. MIT Technology Review"
//   },
//   {
//     id: 4,
//     title: "Office Productivity Hacks",
//     status: "original",
//     preview: "To be productive, make a list. Take breaks...",
//     original_article: "To be productive, make a list. Take breaks. Don't multitask too much. Drink coffee if you are tired. Keep your desk clean. Turn off phone notifications when working.",
//     updated_article: null
//   },
//   {
//     id: 5,
//     title: "Healthy Eating Habits",
//     status: "original",
//     preview: "Eat more vegetables and less sugar...",
//     original_article: "Eat more vegetables and less sugar. Drink water. Do not eat too much fast food. Cooking at home is better. Breakfast is important.",
//     updated_article: null
//   },
//   {
//     id: 6,
//     title: "Remote Work Best Practices",
//     status: "updated",
//     preview: "Working from home requires discipline...",
//     original_article: "Working from home requires discipline. Set a schedule. Have a dedicated workspace. Communicate with your team. Take breaks to walk around.",
//     updated_article: "# Remote Work Best Practices\n\nAs the workforce shifts towards a distributed model, establishing robust remote work protocols is essential for maintaining productivity and work-life balance.\n\n## Dedicated Workspace\n\nCreating a physical boundary between 'work' and 'home' is crucial psychologically.\n\n## Asynchronous Communication\n\nMastering written communication is key when teams are spread across time zones."
//   }
// ];

export const getArticles = async () => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: MOCK_ARTICLES }), 1000);
    });
  }

  const res = await fetch("/api/articles");
  return { data: await res.json() };
};


import axios from "axios";


const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const fetchArticlesFromBackend = async () => {
  return axios.get(`${API_BASE}/articles`);
};

export const triggerArticleFetch = async () => {
  return axios.post(`${API_BASE}/articles/fetch`);
};