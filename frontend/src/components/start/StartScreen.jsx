// frontend/src/components/start/StartScreen.jsx
import { ArrowRight, Layout } from "lucide-react";

const StartScreen = ({ onStart, loading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4
                    transition-all duration-500 ease-out
                    opacity-100 scale-100">
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Content Comparison{" "}
        <span className="text-indigo-600">Engine</span>
      </h1>

      <p className="text-xl text-slate-500 mb-10 max-w-2xl">
        Fetch articles from the repository and analyze the differences between
        original drafts and AI-enhanced versions.
      </p>

      <button
        onClick={onStart}
        disabled={loading}
        className={`
          group relative px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-full
          shadow-lg shadow-indigo-200
          flex items-center gap-3
          transition-all duration-300
          hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-1
          active:scale-95
          ${loading ? "opacity-75 cursor-wait" : ""}
        `}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Fetching Repository...
          </>
        ) : (
          <>
            Start Fetching Articles
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </div>
  );
};

export default StartScreen;
