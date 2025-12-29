// Backend/src/services/llm.service.js
import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const rewriteArticleWithGemini = async ({
  originalTitle,
  originalContent,
  refArticles,
}) => {
  try {
    const prompt = `
You are a professional content editor and SEO writer.

TASK:
Rewrite the original article so that it matches the depth, structure, and formatting
of the two reference articles, while keeping the topic the same.

STRICT RULES:
- Do NOT copy sentences or phrases from reference articles.
- Do NOT mention the reference articles inside the main content.
- Keep the content original and plagiarism-free.
- Improve clarity, structure, and flow.
- Use proper headings and subheadings.
- Tone should be professional and informative.

ORIGINAL ARTICLE:
Title: ${originalTitle}

Content:
${originalContent}

REFERENCE ARTICLE 1:
${refArticles[0].content}

REFERENCE ARTICLE 2:
${refArticles[1].content}

OUTPUT REQUIREMENTS:
- Start with a clear improved title
- Use headings and subheadings
- End with a strong conclusion
- Do NOT include references
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text || text.length < 500) {
      throw new Error("Gemini output too short or empty");
    }

    return text.trim();
  } catch (error) {
    console.error("Gemini rewrite failed:", error.message);
    return null;
  }
};
