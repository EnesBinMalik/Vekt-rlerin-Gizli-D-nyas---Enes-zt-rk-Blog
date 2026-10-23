import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, CornerDownLeft, Flag } from 'lucide-react';
import { Priority } from '../types/todo';

interface TodoInputProps {
  onAddTodo: (text: string, priority?: Priority) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [showPriority, setShowPriority] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    onAddTodo(trimmed, priority);
    setText('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setText('');
    }
  };

  const priorityLabels: Record<Priority, { label: string; color: string; bg: string }> = {
    low: { label: 'Düşük', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    medium: { label: 'Normal', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' },
    high: { label: 'Önemli', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-2.5 sm:p-3 shadow-lg focus-within:border-indigo-500/70 transition-all duration-200"
    >
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Yeni bir görev ekleyin... (Örn: todo_4 veya Proje sunumu)"
            className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none"
            autoFocus
          />
          {text && (
            <button
              type="button"
              onClick={() => {
                setText('');
                inputRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 rounded-full hover:bg-slate-700/60 transition-colors"
              title="Temizle"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Priority dropdown / toggle */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPriority(!showPriority)}
            className={`px-2.5 py-2 text-xs font-medium rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
              priorityLabels[priority].bg
            } ${priorityLabels[priority].color}`}
            title="Öncelik belirle"
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{priorityLabels[priority].label}</span>
          </button>

          {showPriority && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-1 z-20">
              {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPriority(p);
                    setShowPriority(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    priority === p ? 'bg-indigo-600/30 text-indigo-300' : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <span>{priorityLabels[p].label}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    p === 'high' ? 'bg-amber-400' : p === 'medium' ? 'bg-sky-400' : 'bg-emerald-400'
                  }`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Ekle</span>
          <CornerDownLeft className="w-3 h-3 text-indigo-200 hidden md:inline ml-0.5" />
        </button>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between px-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <span>İpucu: Enter tuşu ile hızlıca ekleyebilirsiniz</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-slate-400">
          <span className="text-amber-400/90 font-medium">EK Özellik:</span>
          <span>Silmek için göreve basılı tutun</span>
        </div>
      </div>
    </form>
  );
};
