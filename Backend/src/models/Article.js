//Backend/src/models/Article.js
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    original: {
      title: String,
      content: String,
      url: String,
      publishedAt: Date,
      source: { type: String, default: "beyondchats" }
    },
    updated: {
      title: String,
      content: String,
      updatedAt: Date,
      references: [
        { title: String, url: String }
      ]
    },
    status: {
      type: String,
      enum: ["original", "updated"],
      default: "original"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Article", ArticleSchema);
