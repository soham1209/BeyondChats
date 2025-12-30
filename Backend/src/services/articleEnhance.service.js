import Article from "../models/Article.js";
import { searchTopArticles } from "./googleSearch.service.js";
import { extractMainContent } from "./readability.service.js";
import { rewriteArticleWithGemini } from "./llm.service.js";

export const enhanceSingleArticle = async (articleId) => {
  const article = await Article.findById(articleId);

  if (!article || !article.original?.content) {
    throw new Error("Article not found or original content missing");
  }

  const { original } = article;

  // 1. Google search
  const searchResults = await searchTopArticles(original.title);
  if (searchResults.length < 2) {
    throw new Error("Not enough reference articles found");
  }

  // 2. Scrape reference articles
  const refArticles = [];
  for (const ref of searchResults.slice(0, 2)) {
    const data = await extractMainContent(ref.url);
    if (data) refArticles.push(data);
  }

  if (refArticles.length < 2) {
    throw new Error("REFERENCE_SCRAPE_BLOCKED");
  }

  // 3. Gemini rewrite
  const rewritten = await rewriteArticleWithGemini({
    originalTitle: original.title,
    originalContent: original.content,
    refArticles
  });

  if (!rewritten) {
    throw new Error("Gemini rewrite failed");
  }

  // 4. Save update
  article.updated = {
    title: original.title,
    content: `${rewritten}

References:
1. ${refArticles[0].title} – ${refArticles[0].url}
2. ${refArticles[1].title} – ${refArticles[1].url}`,
    updatedAt: new Date(),
    references: refArticles.map((r) => ({
      title: r.title,
      url: r.url
    }))
  };

  article.status = "updated";
  await article.save();

  return article;
};
