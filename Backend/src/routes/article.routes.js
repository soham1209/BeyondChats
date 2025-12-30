//Backend/src/routes/article.routes.js
import express from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  fetchArticlesController,
  enhanceArticleController,
} from "../controllers/article.controller.js";

const router = express.Router();

router.post("/", createArticle);
router.get("/", getArticles);
router.get("/:id", getArticleById);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

router.post("/fetch", fetchArticlesController);
router.post("/:id/enhance", enhanceArticleController);

export default router;
