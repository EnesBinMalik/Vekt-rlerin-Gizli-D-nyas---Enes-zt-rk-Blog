import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-amber-700 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-300 bg-white',
    error: 'border-rose-300 bg-white',
    info: 'border-amber-300 bg-white',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-4 duration-200">
      <div
        className={`p-3.5 rounded-xl shadow-xl border ${borders[toast.type]} flex items-start gap-3`}
      >
        <div className="mt-0.5">{icons[toast.type]}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-stone-900 leading-tight">{toast.title}</h4>
          <p className="text-xs text-stone-600 mt-0.5 leading-snug">{toast.message}</p>
        </div>
      </div>
    </div>
  );
};
