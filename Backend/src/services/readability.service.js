// Backend/src/services/readability.service.js
import axios from "axios";
import { Readability } from "@mozilla/readability";
import { JSDOM, VirtualConsole } from "jsdom";

export const extractMainContent = async (url) => {
  try {
    // 1. Fetch raw HTML
    const { data: html } = await axios.get(url, {
      timeout: 15000,
      headers: {
        // Pretend to be a real browser
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "text/html",
      },
    });

    // 2. Create virtual DOM and suppress console warnings
    const virtualConsole = new VirtualConsole();
    virtualConsole.on("error", () => {}); // suppress CSS parse warnings

    const dom = new JSDOM(html, {
      url,
      virtualConsole,
    });

    // 3. Run Readability algorithm
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      throw new Error("Readability could not extract content");
    }

    // 4. Clean text
    const cleanText = article.textContent.replace(/\s+/g, " ").trim();

    // 5. Basic validation
    if (cleanText.length < 500) {
      throw new Error("Extracted content too short");
    }

    return {
      title: article.title,
      content: cleanText,
      siteName: article.siteName || new URL(url).hostname,
      url,
    };
  } catch (error) {
    console.error(`Readability failed for ${url}:`, error.message);
    return null;
  }
};
