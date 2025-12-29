// Backend/src/services/googleSearch.service.js
import { getJson } from "serpapi";
import dotenv from "dotenv";

dotenv.config();

const SERPAPI_KEY = process.env.SERPAPI_KEY;

export const searchTopArticles = async (query) => {
  return new Promise((resolve, reject) => {
    getJson(
      {
        engine: "google",
        q: query,
        google_domain: "google.com",
        gl: "us",
        hl: "en",
        num: 10,
        api_key: SERPAPI_KEY
      },
      (json) => {
        try {
          const results = json.organic_results || [];

          const filtered = results
            .filter((r) => {
              if (!r.link) return false;

              // exclude BeyondChats
              if (r.link.includes("beyondchats.com")) return false;

              // basic article URL heuristic
              return r.link.includes("/") && r.link.length > 30;
            })
            .slice(0, 2)
            .map((r) => ({
              title: r.title,
              url: r.link
            }));

          resolve(filtered);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};
