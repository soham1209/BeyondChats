// Backend/src/scripts/updateArticles.js
import { fetchOriginalArticles } from "../services/articleUpdate.service.js";

const run = async () => {
  const articles = await fetchOriginalArticles();
  console.log(
    articles.map((a) => ({
      id: a._id,
      title: a.original.title
    }))
  );
};

run();
