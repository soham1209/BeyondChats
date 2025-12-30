// frontend/src/pages/Home.jsx
import { useState } from "react";
import StartScreen from "../components/start/StartScreen";
import Dashboard from "../components/dashboard/Dashboard";
import DetailView from "../components/detail/DetailView";
import NavBar from "../components/layout/NavBar";
import { fetchArticlesFromBackend, triggerArticleFetch,deleteArticle } from "../services/api";

const Home = () => {
  const [view, setView] = useState("start"); // start | dashboard | detail
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartFetching = async () => {
    setLoading(true);
    try {
      // 1. Trigger backend scraping
      await triggerArticleFetch();

      // 2. Normalize articles
      const normalizeArticles = (data) => {
        return data.map((a) => ({
          id: a._id,
          status: a.status,

          // Card data
          title: a.original?.title || "Untitled Article",
          preview: a.original?.content
            ? a.original.content.slice(0, 120) + "..."
            : "No preview available",

          // Detail view data
          original_article: a.original?.content || "",
          updated_article: a.updated?.content || null,

          // keep full refs if needed later
          _raw: a,
        }));
      };

      // 3. Fetch articles from DB
      const response = await fetchArticlesFromBackend();
      setArticles(normalizeArticles(response.data));


      console.log(normalizeArticles(response.data));


      // 4. Move to dashboard
      setView("dashboard");
    } catch (error) {
      console.error("Fetch failed:", error);
      alert("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    setView("detail");
    window.scrollTo(0, 0);
  };

  const handleBackToDashboard = () => {
    setSelectedArticle(null);
    setView("dashboard");
  };

  const handleDeleteArticle = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this article?");
  if (!confirm) return;

  try {
    await deleteArticle(id);
    setArticles(prev => prev.filter(a => a.id !== id));
  } catch (err) {
    alert("Failed to delete article");
  }
};

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900">
      <NavBar
        view={view}
        articles={articles}
        onLogoClick={() => {
          if (view !== "start") setView("dashboard");
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "start" && (
          <StartScreen onStart={handleStartFetching} loading={loading} />
        )}

        {view === "dashboard" && (
          <Dashboard articles={articles} onSelect={handleSelectArticle} onDelete={handleDeleteArticle} />
        )}

        {view === "detail" && selectedArticle && (
          <DetailView
            article={selectedArticle}
            onBack={handleBackToDashboard}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
