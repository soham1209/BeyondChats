const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-red-50 border border-red-300 text-red-800 px-5 py-4 rounded-xl shadow-lg max-w-sm">
        <div className="font-semibold mb-1">⚠ Update Failed</div>
        <p className="text-sm">{message}</p>
        <button
          onClick={onClose}
          className="mt-3 text-sm font-medium text-red-700 hover:underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default Toast;
