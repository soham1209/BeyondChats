// frontend/src/components/dashboard/ArticleList.jsx
import { Sparkles, FileText } from "lucide-react";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ title, items, type, onSelect }) => {
  const isUpdated = type === "updated";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={`p-4 rounded-t-xl border-b flex items-center gap-3 ${
          isUpdated
            ? "bg-green-50 border-green-100"
            : "bg-slate-50 border-slate-200"
        }`}
      >
        <div
          className={`p-2 rounded-lg ${
            isUpdated
              ? "bg-green-100 text-green-700"
              : "bg-white text-slate-500 border border-slate-200"
          }`}
        >
          {isUpdated ? <Sparkles size={18} /> : <FileText size={18} />}
        </div>

        <div>
          <h2
            className={`font-bold text-lg ${
              isUpdated ? "text-green-900" : "text-slate-800"
            }`}
          >
            {title}
          </h2>
          <span
            className={`text-xs font-medium ${
              isUpdated ? "text-green-600" : "text-slate-500"
            }`}
          >
            {items.length} items found
          </span>
        </div>
      </div>

      {/* List */}
      <div
        className={`grow p-4 bg-slate-50/50 rounded-b-xl border border-t-0 ${
          isUpdated ? "border-green-100" : "border-slate-200"
        }`}
      >
        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                type={type}
                onSelect={onSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">
            <p>No articles found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
