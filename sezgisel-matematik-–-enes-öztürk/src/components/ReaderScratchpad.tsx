import React, { useState, useEffect } from 'react';
import { PenLine, Check, Trash2 } from 'lucide-react';

export const ReaderScratchpad: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('enes_ozturk_math_notes');
    if (saved) {
      setNotes(saved);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNotes(text);
    localStorage.setItem('enes_ozturk_math_notes', text);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 1500);
  };

  const handleInsertSymbol = (sym: string) => {
    const updated = notes + sym;
    setNotes(updated);
    localStorage.setItem('enes_ozturk_math_notes', updated);
  };

  const handleClear = () => {
    if (window.confirm('Notlarınızı temizlemek istediğinize emin misiniz?')) {
      setNotes('');
      localStorage.removeItem('enes_ozturk_math_notes');
    }
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 text-xs font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 font-bold text-stone-900 hover:text-amber-900 transition-colors"
        >
          <PenLine className="w-3.5 h-3.5 text-amber-800" />
          <span>Sezgisel Not Defteri</span>
        </button>
        {savedStatus && (
          <span className="text-[11px] text-emerald-700 flex items-center gap-0.5 font-mono">
            <Check className="w-3 h-3" /> Kaydedildi
          </span>
        )}
      </div>

      {isOpen && (
        <div className="mt-3 space-y-2">
          {/* Quick symbols */}
          <div className="flex flex-wrap gap-1 items-center text-[11px] font-mono">
            {['π', 'e', '∫', 'dx', 'f\'(x)', 'lim', '√', '≈', '∞', '½'].map((sym) => (
              <button
                key={sym}
                type="button"
                onClick={() => handleInsertSymbol(sym)}
                className="px-1.5 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200"
              >
                {sym}
              </button>
            ))}
          </div>

          <textarea
            value={notes}
            onChange={handleChange}
            placeholder="Okurken zihninizde beliren sezgisel benzetmeleri ve soruları buraya not alın..."
            rows={4}
            className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/50 text-xs text-stone-800 focus:outline-stone-400 font-sans resize-y"
          />

          <div className="flex justify-between items-center text-[10px] text-stone-400 pt-1">
            <span>Tarayıcınızda otomatik saklanır</span>
            {notes && (
              <button
                type="button"
                onClick={handleClear}
                className="text-stone-500 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Temizle
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
