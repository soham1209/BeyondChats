// frontend/src/components/common/MarkdownRenderer.jsx
const MarkdownRenderer = ({ content }) => {
  if (!content) return null;
  return (
    <div className="space-y-4 text-slate-700 leading-relaxed font-sans">
      {content.split('\n').map((line, index) => {
        if (line.startsWith('### ')) return <h4 key={index} className="text-lg font-semibold text-slate-800 mt-6">{line.replace('### ', '')}</h4>;
        if (line.startsWith('## ')) return <h3 key={index} className="text-xl font-bold text-slate-900 mt-8 mb-3 pb-1 border-b border-slate-200">{line.replace('## ', '')}</h3>;
        if (line.startsWith('# ')) return <h2 key={index} className="text-2xl font-bold text-slate-900 mb-4">{line.replace('# ', '')}</h2>;
        if (line.trim() === '') return <div key={index} className="h-2"></div>;
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
};

export default MarkdownRenderer;