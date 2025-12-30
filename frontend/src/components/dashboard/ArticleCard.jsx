// frontend/src/components/dashboard/ArticleCard.jsx
import { ChevronLeft } from "lucide-react";
import Badge from "../common/Badge";

const ArticleCard = ({ article, type, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(article)}
      className="bg-white p-4 rounded-lg shadow-sm border border-slate-100
                 hover:border-indigo-300 hover:shadow-md
                 cursor-pointer transition-all duration-200 group"
    >
      <div className="flex justify-between items-start mb-2">
        <Badge type={type} />
        <ChevronLeft className="w-4 h-4 text-slate-300 rotate-180 group-hover:text-indigo-500 transition-colors" />
      </div>

      <h3 className="font-semibold text-slate-900 leading-tight group-hover:text-indigo-700 mb-1">
        {article.title}
      </h3>

      <p className="text-sm text-slate-500 line-clamp-2">
        {article.preview}
      </p>
    </div>
  );
};

export default ArticleCard;
