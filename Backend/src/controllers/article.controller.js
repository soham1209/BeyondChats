//Backend/src/controllers/article.controller.js
import Article from "../models/Article.js";
import { fetchAndStoreArticles } from "../services/articleFetch.service.js";
import { enhanceSingleArticle } from "../services/articleEnhance.service.js";

export const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Article already exists"
      });
    }

    res.status(500).json({ message: error.message });
  }
};

export const getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};

export const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.json(article);
};

export const updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(article);
};

export const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Article deleted" });
};


export const fetchArticlesController = async (req, res) => {
  try {
    const result = await fetchAndStoreArticles();
    res.status(200).json({
      success: true,
      message: "Articles fetched successfully",
      result,
    });
  } catch (error) {
    console.error("Fetch controller error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch articles",
    });
  }
};


export const enhanceArticleController = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedArticle = await enhanceSingleArticle(id);

    res.status(200).json({
      success: true,
      message: "Article enhanced successfully",
      article: updatedArticle
    });
  } catch (error) {
  res.status(400).json({
    success: false,
    code: error.message,
  });
}
};


