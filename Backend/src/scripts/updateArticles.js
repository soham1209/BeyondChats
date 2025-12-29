// Backend/src/scripts/updateArticles.js
// import { fetchOriginalArticles } from "../services/articleUpdate.service.js";

// const run = async () => {
//   const articles = await fetchOriginalArticles();
//   console.log(
//     articles.map((a) => ({
//       id: a._id,
//       title: a.original.title
//     }))
//   );
// };

// run();

// import { searchTopArticles } from "../services/googleSearch.service.js";

// const test = async () => {
//   const results = await searchTopArticles(
//     "Future of Node.js in 2025"
//   );
//   console.log(results);
// };

// test();

import { extractMainContent } from "../services/readability.service.js";

const test = async () => {
  const result = await extractMainContent(
    "https://beyondchats.com/blogs/introduction-to-chatbots/"
  );

  console.log({
    title: result?.title,
    site: result?.siteName,
    length: result?.content.length,
  });
};

test();
