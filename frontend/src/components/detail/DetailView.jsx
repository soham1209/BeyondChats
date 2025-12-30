import { useState } from "react";
import {
  ChevronLeft,
  Clock,
  Zap,
  FileText,
  Sparkles,
  Loader2,
} from "lucide-react";

import { enhanceArticle } from "../../services/api";
import Badge from "../common/Badge";
import MarkdownRenderer from "../common/MarkdownRenderer";
import Toast from "../ui/Toast";

const DetailView = ({ article, onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState(null);

  const hasUpdated = !!article.updated_article;

  const handleUpdateClick = async () => {
  setIsGenerating(true);

  try {
    await enhanceArticle(article.id);
    window.location.reload(); 
  } catch (err) {
    const code = err.response?.data?.code;

    if (code === "REFERENCE_SCRAPE_BLOCKED") {
      setToast(
        "One of the top two result website does not allow automated bots to access its content. Please try updating another article."
      );
    } else {
      setToast("Something went wrong while updating the article.");
    }
  } finally {
    setIsGenerating(false);
  }
};


  return (
    <div className="transition-all duration-300 ease-out">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-indigo-600 font-medium transition-colors"
        >
          <div className="bg-white border border-slate-200 p-1.5 rounded-lg mr-2 shadow-sm">
            <ChevronLeft size={16} />
          </div>
          Back to Dashboard
        </button>

        <div className="flex items-center gap-3">
          <Badge type={article.status} />
        </div>
      </div>

      {!hasUpdated && !isGenerating ? (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
                {article.title}
              </h1>

              {/* Action Area */}
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      Pending Update
                    </p>
                    <p className="text-sm">
                      This article has not been updated yet.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleUpdateClick}
                  className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700
                             text-white rounded-lg font-semibold shadow-sm shadow-indigo-200
                             flex items-center justify-center gap-2
                             transition-all active:scale-95"
                >
                  <Zap size={18} />
                  Update Article
                </button>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Original Content
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed font-serif
                              bg-slate-50/50 p-6 rounded-lg border border-slate-100">
                  {article.original_article}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {article.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="flex flex-col">
              <div className="bg-slate-100 border border-slate-200 rounded-t-xl p-3 flex items-center gap-2">
                <FileText className="text-slate-500 w-4 h-4" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Original Draft
                </span>
              </div>

              <div className="bg-slate-50 border border-t-0 border-slate-200 rounded-b-xl p-6 grow">
                <p className="text-slate-600 font-serif leading-relaxed whitespace-pre-wrap">
                  {article.original_article}
                </p>
              </div>
            </div>

            
            <div className="flex flex-col relative h-full">
              {isGenerating ? (
                <div className="flex flex-col h-full bg-white rounded-xl border border-indigo-100 shadow-sm relative">
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]
                                  z-10 flex flex-col items-center justify-center text-center p-6">
                    <div className="bg-indigo-50 p-4 rounded-full mb-4">
                      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Generating Article…
                    </h3>
                    <p className="text-slate-500 max-w-xs">
                      AI is rewriting and enhancing your content.
                    </p>
                  </div>

                  <div className="p-8 space-y-6 opacity-20">
                    <div className="h-8 bg-slate-300 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-300 rounded w-full" />
                      <div className="h-4 bg-slate-300 rounded w-5/6" />
                    </div>
                    <div className="h-32 bg-slate-200 rounded w-full" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full bg-white rounded-xl border border-green-100 shadow-sm">
                  <div className="bg-green-50 border-b border-green-100 rounded-t-xl p-3 flex items-center gap-2">
                    <Sparkles className="text-green-600 w-4 h-4" />
                    <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                      AI Enhanced Version
                    </span>
                  </div>

                  <div className="p-6 lg:p-8 grow">
                    <MarkdownRenderer content={article.updated_article} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DetailView;
