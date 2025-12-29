import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BEYONDCHATS_BASE_URL || "https://beyondchats.com";
const BLOG_URL = `${BASE_URL}/blogs/`;
const API_URL =
  process.env.BACKEND_API_URL || "http://localhost:5000/api/articles";

// Helper: Extract articles from a specific page HTML
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

// 1. Find the total number of pages
const getTotalPages = async () => {
  try {
    const { data } = await axios.get(BLOG_URL);
    const $ = cheerio.load(data);

    const pageNumbers = [];
    $(".ct-pagination .page-numbers").each((_, el) => {
      const num = parseInt($(el).text().trim());
      if (!isNaN(num)) {
        pageNumbers.push(num);
      }
    });

    return pageNumbers.length > 0 ? Math.max(...pageNumbers) : 1;
  } catch (error) {
    console.error("Error finding total pages:", error.message);
    return 1;
  }
};

// 2. Fetch HTML for a specific page number
const fetchPageArticles = async (pageNum) => {
  const pageUrl = pageNum === 1 ? BLOG_URL : `${BLOG_URL}page/${pageNum}/`;
  console.log(`Fetching articles from: ${pageUrl}`);
  try {
    const { data } = await axios.get(pageUrl);
    const $ = cheerio.load(data);
    return extractArticlesFromHtml($);
  } catch (error) {
    console.error(`Failed to fetch page ${pageNum}:`, error.message);
    return [];
  }
};

// 3. Main Logic: Get oldest 5 (handling short last pages)
const getOldestFiveArticles = async () => {
  let currentPage = await getTotalPages();
  let collectedArticles = [];

  console.log(`Starting collection from page ${currentPage}...`);

  while (collectedArticles.length < 5 && currentPage >= 1) {
    const articlesOnPage = await fetchPageArticles(currentPage);

    collectedArticles = [...articlesOnPage, ...collectedArticles];
    currentPage--;
  }

  const oldestFive = collectedArticles.slice(-5);
  return oldestFive.reverse();
};

// 4. Scrape full article content
const scrapeArticleContent = async (article) => {
  try {
    const { data } = await axios.get(article.url);
    const $ = cheerio.load(data);

    let content = $(".entry-content").text().trim();
    if (!content) content = $(".ct-entry-content").text().trim();

    return {
      original: {
        title: article.title,
        content: content || "Content extraction failed",
        url: article.url,
        publishedAt: article.publishedAt,
        source: "beyondchats",
      },
    };
  } catch (error) {
    console.error(`Error scraping content for ${article.url}:`, error.message);
    return null;
  }
};

// 5. Save to DB using API
const saveArticle = async (articleData) => {
  if (!articleData) return;
  try {
    await axios.post(API_URL, articleData);
    console.log(`Saved: ${articleData.original.title}`);
  } catch (error) {
    console.error(`Error saving to DB: ${error.message}`);
  }
};

// 6. MAIN RUNNER
const runScraper = async () => {
  try {
    console.log("Scraping started...");

    const articles = await getOldestFiveArticles();
    console.log(`Found ${articles.length} oldest articles to process.`);

    for (const article of articles) {
      const fullArticle = await scrapeArticleContent(article);
      if (fullArticle) {
        await saveArticle(fullArticle);
      }
    }

    console.log("Scraping completed.");
  } catch (err) {
    console.error("Scraper error:", err.message);
  }
};

runScraper();
