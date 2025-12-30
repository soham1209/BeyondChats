// Backend/src/app.js
import express from "express";
import cors from "cors";
import articleRoutes from "./routes/article.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/articles", articleRoutes);

export default app;
