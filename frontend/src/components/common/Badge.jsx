// frontend/src/components/common/Badge.jsx
import { Sparkles, Clock } from "lucide-react";
const Badge = ({ type }) => {
  if (type === 'updated') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide bg-green-100 text-green-800 border border-green-200">
        <Sparkles className="w-3 h-3 mr-1" /> Updated
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide bg-slate-100 text-slate-600 border border-slate-200">
      <Clock className="w-3 h-3 mr-1" /> Original
    </span>
  );
};

export default Badge;