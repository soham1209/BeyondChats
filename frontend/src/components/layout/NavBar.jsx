// frontend/src/components/layout/NavBar.jsx
import { Layout } from "lucide-react";

const NavBar = ({ view, articles, onLogoClick }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-20 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={onLogoClick}
        >
          <div className="bg-slate-900 text-white p-1 rounded">
            <Layout size={18} />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Doc<span className="text-indigo-600">Compare</span>
          </span>
        </div>

        {/* Stats */}
        {view !== "start" && (
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <span>Total: {articles.length}</span>
            <div className="h-4 w-px bg-slate-300" />
            <span className="text-green-600">
              {articles.filter((a) => a.status === "updated").length} Updated
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
