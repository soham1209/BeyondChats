import { getJson } from "serpapi";
import dotenv from "dotenv";

dotenv.config();

const SERPAPI_KEY = process.env.SERPAPI_KEY;

const BLOCKED_DOMAINS = [
  "amazon.",
  "flipkart.",
  "myntra.",
  "meesho.",
  "ebay.",
  "pinterest.",
  "facebook.",
  "instagram.",
  "twitter.",
  "medium.",
  "x.com",
  "linkedin.",
  "reddit.",
  "quora.",
  "youtube.",
  "tiktok."
];

const isBlockedDomain = (url) =>
  BLOCKED_DOMAINS.some((domain) => url.includes(domain));

const looksLikeArticle = (url) => {
  return (
    url.includes("/blog") ||
    url.includes("/article") ||
    url.includes("/post") ||
    url.includes("/insights") ||
    url.split("/").length > 4 // deep URL = likely article
  );
};

export const searchTopArticles = async (query) => {
  return new Promise((resolve, reject) => {
    getJson(
      {
        engine: "google",
        q: `${query} blog OR article -site:pinterest.com -site:amazon.com`,
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

              const url = r.link.toLowerCase();

              // Exclude your own site
              if (url.includes("beyondchats.com")) return false;

              // Exclude ecommerce / social / aggregators
              if (isBlockedDomain(url)) return false;

              // Include only article-like URLs
              return looksLikeArticle(url);
            })
            .slice(0, 2)
            .map((r) => ({
              title: r.title,
              url: r.link
            }));

          resolve(filtered);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
