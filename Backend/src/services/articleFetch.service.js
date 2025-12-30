// Backend/src/services/articleFetch.service.js
import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BEYONDCHATS_BASE_URL || "https://beyondchats.com";
const BLOG_URL = `${BASE_URL}/blogs/`;
const SAVE_API_URL =
  process.env.BACKEND_API_URL || "http://localhost:5000/api/articles";

// Helper: Extract article summaries from a list page
const extractArticlesFromHtml = ($) => {
  const articles = [];

  $("article.entry-card").each((_, el) => {
    const title = $(el).find(".entry-title a").text().trim();
    const url = $(el).find(".entry-title a").attr("href");
    const publishedAt = $(el).find(".meta-date").text().trim();

    if (title && url) {
      articles.push({ title, url, publishedAt });
    }
  });

  return articles;
};

// 1. Find total pages
const getTotalPages = async () => {
  try {
    const { data } = await axios.get(BLOG_URL);
    const $ = cheerio.load(data);

    const pages = [];
    $(".ct-pagination .page-numbers").each((_, el) => {
      const n = parseInt($(el).text().trim());
      if (!isNaN(n)) pages.push(n);
    });

    return pages.length ? Math.max(...pages) : 1;
  } catch (error) {
    console.error("Error fetching total pages:", error.message);
    return 1;
  }
};

// 2. Fetch specific page
const fetchPageArticles = async (page) => {
  try {
    const url = page === 1 ? BLOG_URL : `${BLOG_URL}page/${page}/`;
    console.log(`Fetching list from: ${url}`);
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return extractArticlesFromHtml($);
  } catch (error) {
    console.error(`Error fetching page ${page}:`, error.message);
    return [];
  }
};

// 3. Logic to get the oldest 5 articles
const getOldestFiveArticles = async () => {
  let page = await getTotalPages();
  let collected = [];

  console.log(`Total pages found: ${page}`);

  while (collected.length < 5 && page >= 1) {
    const articles = await fetchPageArticles(page);
    collected = [...articles, ...collected];
    page--;
  }
  return collected.slice(-5).reverse();
};

// 4. Scrape the full content of a single article
const scrapeArticleContent = async (article) => {
  try {
    const { data } = await axios.get(article.url);
    const $ = cheerio.load(data);

    const selectors = [
      ".elementor-widget-theme-post-content",
      ".entry-content",
      ".ct-entry-content",
      "article",
      "main",
    ];

    let content = "";

    for (const sel of selectors) {
      const element = $(sel);
      if (element.length > 0) {
        content = element
          .find("p, h2, h3, h4, li")
          .map((_, el) => $(el).text().trim())
          .get()
          .join("\n\n");

        if (content.length > 500) break;
      }
    }

    if (!content) {
      for (const sel of selectors) {
        const rawText = $(sel).text().trim();
        if (rawText.length > 500) {
          content = rawText;
          break;
        }
      }
    }

    if (!content || content.length < 200) {
      // console.log(`Skipped (content too short/empty): ${article.title}`);
      return null;
    }

    return {
      original: {
        title: article.title,
        content: content,
        url: article.url,
        publishedAt: article.publishedAt,
        source: "beyondchats",
      },
      status: "original",
    };
  } catch (err) {
    // console.error(`Failed scrape for ${article.title}: ${err.message}`);
    return null;
  }
};

// 5. Save to your Backend API
const saveArticle = async (article) => {
  if (!article) return;

  try {
    await axios.post(SAVE_API_URL, article);
    // console.log(`Saved: ${article.original.title}`);
  } catch (err) {
    if (err.response?.status === 409) {
      // console.log(`Article already exists: ${article.original.title}`);
    } else {
      console.error(
        `❌ Save error for ${article.original.title}:`,
        err.message
      );
    }
  }
};

// MAIN EXPORTED FUNCTION
export const fetchAndStoreArticles = async () => {
  // console.log("Phase 1: Article Scraper Started");

  const articles = await getOldestFiveArticles();
  // console.log(`Found ${articles.length} articles to process.`);

  for (const article of articles) {
    const fullArticleData = await scrapeArticleContent(article);
    if (fullArticleData) {
      await saveArticle(fullArticleData);
    }
  }

  // console.log(" Phase 1: Scraper Completed");
};
