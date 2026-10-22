import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/constructorContent';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      const selected = userAnswers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (selected && correctOpt && selected === correctOpt.id) {
        score += 1;
      }
    });
    return score;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const score = calculateScore();

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
            <span>05. Kendini Sına</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>İnteraktif Bilgi Testi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Constructor Bilgini Ölç: 5 Gerçekçi Senaryo
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Enes Öztürk'ün anlattığı kurucu metot kurallarını, varsayılan atamaları ve aşırı yükleme mantığını pekiştirmek için soruları cevaplayın.
          </p>
        </div>

        {/* Quiz Progress & Reset */}
        <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 shrink-0">
          <div className="text-xs">
            <span className="text-slate-400">Cevaplanan: </span>
            <span className="font-mono text-cyan-400 font-bold">{answeredCount} / {QUIZ_QUESTIONS.length}</span>
          </div>
          <button
            onClick={handleResetQuiz}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Quiz Questions List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const selectedOptionId = userAnswers[q.id];
          const isAnswered = selectedOptionId !== undefined;
          const correctOption = q.options.find((o) => o.isCorrect);
          const isUserCorrect = isAnswered && selectedOptionId === correctOption?.id;

          return (
            <div
              key={q.id}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold">
                    {qIndex + 1}
                  </span>
                  <span className="text-xs font-mono text-slate-400">SORU {qIndex + 1}</span>
                </div>
                {isAnswered && (
                  <span className={`text-xs font-semibold flex items-center gap-1 px-2.5 py-0.5 rounded ${
                    isUserCorrect
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}>
                    {isUserCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Doğru</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Yanlış</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Question Text */}
              <h3 className="text-base font-semibold text-white mb-4 leading-relaxed whitespace-pre-line">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5 mb-4">
                {q.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let optStyle = "bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 text-slate-300";

                  if (isAnswered) {
                    if (opt.isCorrect) {
                      optStyle = "bg-emerald-950/30 border-emerald-600/60 text-emerald-200 font-medium";
                    } else if (isSelected && !opt.isCorrect) {
                      optStyle = "bg-red-950/30 border-red-600/60 text-red-200";
                    } else {
                      optStyle = "bg-slate-950/40 border-slate-900 text-slate-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center font-mono text-[11px] shrink-0 font-bold">
                        {opt.id}
                      </span>
                      <span className="leading-relaxed flex-1">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after answered */}
              {isAnswered && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <div className="font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Açıklama:</span>
                  </div>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {answeredCount === QUIZ_QUESTIONS.length && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/40 shadow-xl text-center">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Tebrikler! Testi Tamamladınız
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mb-4">
            Toplam {QUIZ_QUESTIONS.length} sorudan <strong className="text-cyan-300 font-bold">{score} tanesini</strong> doğru cevapladınız.
            {score === 5 ? " Mükemmel! Constructor ve bellek mekanizmalarını eksiksiz kavramışsınız." : " İlgili ders notlarını ve bellek simülatörünü tekrar inceleyerek tam puan alabilirsiniz."}
          </p>
          <button
            onClick={handleResetQuiz}
            className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors"
          >
            Testi Tekrar Çöz
          </button>
        </div>
      )}
    </section>
  );
};
