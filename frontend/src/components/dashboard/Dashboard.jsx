// frontend/src/components/dashboard/Dashboard.jsx
import ArticleList from "./ArticleList";

const Dashboard = ({ articles, onSelect,onDelete }) => {
  const updatedArticles = articles.filter(
    (a) => a.status === "updated"
  );
  const originalArticles = articles.filter(
    (a) => a.status === "original"
  );

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full
                 transition-all duration-300 ease-out"
    >
      {/* Left: Original Articles */}
      <ArticleList
        title="Original Articles"
        items={originalArticles}
        type="original"
        onSelect={onSelect}
        onDelete={onDelete}
      />

      {/* Right: Updated Articles */}
      <ArticleList
        title="Updated Articles"
        items={updatedArticles}
        type="updated"
        onSelect={onSelect}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Dashboard;
