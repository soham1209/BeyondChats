// frontend/src/pages/Home.jsx
import { useState } from "react";
import StartScreen from "../components/start/StartScreen";
import Dashboard from "../components/dashboard/Dashboard";
import DetailView from "../components/detail/DetailView";
import NavBar from "../components/layout/NavBar";
import { getArticles } from "../services/api";

const Home = () => {
  const [view, setView] = useState("start"); // start | dashboard | detail
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartFetching = async () => {
    setLoading(true);
    try {
      const response = await getArticles();
      setArticles(response.data);
      setView("dashboard");
    } catch (error) {
      console.error("Failed to fetch", error);
      alert("Error fetching articles");
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
          <Dashboard articles={articles} onSelect={handleSelectArticle} />
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
