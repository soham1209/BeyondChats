import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ content }) => {
  if (!content) return null;

  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-1" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-semibold text-slate-800 mt-5 mb-2" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="leading-relaxed text-slate-700 mb-4" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4 text-slate-700" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4 text-slate-700" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="mb-2" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-slate-900" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-indigo-600 underline hover:text-indigo-800"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          code: ({ inline, ...props }) =>
            inline ? (
              <code className="bg-slate-100 px-1 py-0.5 rounded text-sm" {...props} />
            ) : (
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code {...props} />
              </pre>
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
