import React, { useState } from 'react';
import { HelpCircle, Check, X, Sparkles, ChevronDown } from 'lucide-react';

interface QuizCardProps {
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  hint?: string;
  riddleId: string;
}

export const InteractiveQuizCard: React.FC<QuizCardProps> = ({
  question,
  options,
  hint,
  riddleId,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const selected = options.find((o) => o.id === selectedOption);

  return (
    <div className="my-8 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-stone-50 to-orange-50/40 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-amber-100 pb-3">
        <div className="flex items-center gap-2 text-amber-800 font-sans-ui text-xs font-bold tracking-wider uppercase">
          <HelpCircle className="h-4 w-4 text-amber-600" />
          <span>Düşünme Molası • Sezginizi Test Edin</span>
        </div>
        {hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-700 hover:text-amber-900 underline underline-offset-2 font-medium"
          >
            {showHint ? 'İpucunu Gizle' : '💡 İpucu Al'}
          </button>
        )}
      </div>

      {showHint && hint && (
        <div className="mt-3 rounded-lg bg-amber-100/60 p-3 text-xs text-amber-900 leading-relaxed font-sans-ui">
          {hint}
        </div>
      )}

      <h4 className="mt-4 font-reading text-lg md:text-xl font-bold text-stone-900 leading-snug">
        {question}
      </h4>

      <div className="mt-4 space-y-2.5">
        {options.map((opt) => {
          const isChosen = selectedOption === opt.id;
          let btnStyle = 'border-stone-200/80 bg-white text-stone-800 hover:border-amber-400 hover:bg-amber-50/30';

          if (revealed) {
            if (opt.isCorrect) {
              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium ring-1 ring-emerald-500';
            } else if (isChosen && !opt.isCorrect) {
              btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through opacity-80';
            } else {
              btnStyle = 'border-stone-200 bg-white/50 text-stone-400 opacity-60';
            }
          } else if (isChosen) {
            btnStyle = 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20';
          }

          return (
            <button
              key={opt.id}
              onClick={() => {
                if (!revealed) {
                  setSelectedOption(opt.id);
                }
              }}
              className={`w-full text-left rounded-xl border p-3.5 text-sm transition-all flex items-center justify-between font-sans-ui ${btnStyle}`}
            >
              <span>{opt.text}</span>
              {revealed && opt.isCorrect && (
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              )}
              {revealed && isChosen && !opt.isCorrect && (
                <X className="h-4 w-4 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {!revealed ? (
        <div className="mt-4 flex justify-end">
          <button
            disabled={!selectedOption}
            onClick={() => setRevealed(true)}
            className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Cevabı Gör & Sezgiyi Aç
          </button>
        </div>
      ) : (
        <div className="mt-4 rounded-xl bg-white p-4 border border-stone-200 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold font-sans-ui mb-1">
            {selected?.isCorrect ? (
              <span className="text-emerald-700 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Doğru Sezgi!
              </span>
            ) : (
              <span className="text-amber-800">
                Şaşırtıcı Değil mi? 3 Boyutlu Beynimiz Yanıldı!
              </span>
            )}
          </div>
          <p className="text-xs text-stone-700 font-sans-ui leading-relaxed">
            {selected?.explanation || options.find((o) => o.isCorrect)?.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
