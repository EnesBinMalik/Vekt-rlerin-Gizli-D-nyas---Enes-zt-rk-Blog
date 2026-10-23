import React from 'react';
import { Undo2, X, Trash2 } from 'lucide-react';

interface ToastProps {
  message: string;
  onUndo?: () => void;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onUndo, onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-slate-700 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl animate-slide-up">
      <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
        <Trash2 className="w-3.5 h-3.5" />
      </div>

      <span className="text-xs font-medium">{message}</span>

      {onUndo && (
        <button
          onClick={onUndo}
          className="ml-2 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
        >
          <Undo2 className="w-3 h-3" />
          <span>Geri Al</span>
        </button>
      )}

      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer ml-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
