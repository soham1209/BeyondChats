//Backend/src/controllers/article.controller.js
import Article from "../models/Article.js";

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
