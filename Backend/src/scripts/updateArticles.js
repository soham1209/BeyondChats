import dotenv from "dotenv";
import axios from "axios";


import { fetchOriginalArticles } from "../services/articleUpdate.service.js";
import { searchTopArticles } from "../services/googleSearch.service.js";
import { extractMainContent } from "../services/readability.service.js";
import { rewriteArticleWithGemini } from "../services/llm.service.js";

dotenv.config();

const API_URL =
  process.env.BACKEND_API_URL || "http://localhost:5000/api/articles";

const updateArticle = async (id, payload) => {
  await axios.put(`${API_URL}/${id}`, payload);
};


const runPhase2 = async () => {

//   console.log("Phase 2: Article Enhancement");
  const articles = await fetchOriginalArticles();

  console.log(`📄 Found ${articles.length} original articles\n`);

  let success = 0;
  let skipped = 0;

  for (const article of articles) {
    const { _id, original } = article;
    // console.log(`Processing article: ${original.title}`);

    // 1️ Google Search
    // console.log("Searching Google...");
    const searchResults = await searchTopArticles(original.title);

    if (searchResults.length < 2) {
    //   console.log("Skipped: Less than 2 reference articles found");
      skipped++;
      continue;
    }

    // console.log("Reference articles:");
    searchResults.slice(0, 2).forEach((r, i) =>
      console.log(`   ${i + 1}. ${r.url}`)
    );

    // 2️ Scrape references
    // console.log("Scraping reference content...");
    const refArticles = [];

    for (const ref of searchResults.slice(0, 2)) {
      const data = await extractMainContent(ref.url);
      if (data) refArticles.push(data);
    }

    if (refArticles.length < 2) {
      // console.log("Skipped: Failed to extract reference content");
      skipped++;
      continue;
    }

    // 3️ Gemini rewrite
    // console.log("Rewriting article with Gemini...");
    const rewritten = await rewriteArticleWithGemini({
      originalTitle: original.title,
      originalContent: original.content,
      refArticles
    });

    if (!rewritten) {
      // console.log("Skipped: Gemini generation failed");
      skipped++;
      continue;
    }

    // 4️ Update DB
    await updateArticle(_id, {
      updated: {
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
      },
      status: "updated"
    });

    // console.log("Article updated successfully\n");
    success++;
  }

//   console.log(" Phase 2 Summary");

//   console.log(`Updated: ${success}`);
//   console.log(` Skipped: ${skipped}`);

};

runPhase2();
