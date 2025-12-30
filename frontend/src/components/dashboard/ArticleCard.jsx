// frontend/src/components/dashboard/ArticleCard.jsx
import { Trash2, ChevronLeft } from "lucide-react";
import Badge from "../common/Badge";

const ArticleCard = ({ article, type, onSelect, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation(); // 🚨 prevent opening detail view
    onDelete(article.id);
  };

  return (
    <div
      onClick={() => onSelect(article)}
      className="relative bg-white p-4 rounded-lg shadow-sm border border-slate-100 
                 hover:border-indigo-300 hover:shadow-md cursor-pointer 
                 transition-all duration-200 group"
    >
      <div className="flex justify-between items-start mb-2">
        <Badge type={type} />

        <button
          onClick={handleDelete}
          className="absolute top-3 right-7 p-1.5 rounded-md 
                   text-slate-400 hover:text-red-600 hover:bg-red-50 
                   transition"
          title="Delete article"
        >
          <Trash2 size={12} />
        </button>
        <ChevronLeft className="w-4 h-4 text-slate-300 rotate-180 group-hover:text-indigo-500" />
      </div>

      <h3 className="font-semibold text-slate-900 leading-tight mb-1">
        {article.title}
      </h3>

      <p className="text-sm text-slate-500 line-clamp-2">{article.preview}</p>
    </div>
  );
};

export default ArticleCard;
