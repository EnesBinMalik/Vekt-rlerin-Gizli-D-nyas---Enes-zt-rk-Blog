import React from 'react';
import { Check, X, Clock, HelpCircle, ArrowRight, Lightbulb, Flame } from 'lucide-react';
import { Question, UserAnswerRecord } from '../types/trivia';
import { CATEGORY_LABELS } from '../data/questions';
import { CircularTimer } from './CircularTimer';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  streak: number;
  timeRemaining: number;
  isAnswered: boolean;
  userAnswerRecord: UserAnswerRecord | null;
  onSelectAnswer: (answer: string) => void;
  onNextQuestion: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  streak,
  timeRemaining,
  isAnswered,
  userAnswerRecord,
  onSelectAnswer,
  onNextQuestion,
}) => {
  const categoryName = CATEGORY_LABELS[question.category] || 'Genel';

  const difficultyBadge = {
    easy: { label: 'Kolay', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    medium: { label: 'Orta', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    hard: { label: 'Zor', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  }[question.difficulty];

  const getOptionStyle = (optionValue: string) => {
    if (!isAnswered) {
      return 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-700/80 hover:border-slate-500 text-slate-100 hover:scale-[1.01] active:scale-[0.99] cursor-pointer';
    }

    const isThisCorrect = optionValue === question.correctAnswer;
    const isThisSelected = userAnswerRecord?.userAnswer === optionValue;

    if (isThisCorrect) {
      return 'bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-950/50 cursor-default';
    }

    if (isThisSelected && !isThisCorrect) {
      return 'bg-rose-500/20 border-rose-500 text-rose-200 ring-2 ring-rose-500/40 cursor-default';
    }

    return 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60 cursor-default';
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Top Meta Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono-numbers text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              Soru {currentIndex + 1} / {totalQuestions}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              {categoryName}
            </span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${difficultyBadge.color}`}>
              {difficultyBadge.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {streak > 1 && (
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>{streak}x Seri!</span>
              </div>
            )}
            <div className="text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block -mb-1">Puan</span>
              <span className="font-mono-numbers font-black text-lg text-amber-300">
                {score.toLocaleString('tr-TR')}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 to-indigo-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card with 12s Timer */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Question Header & Circular 12s Timer */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
              <span>{categoryName}</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400/90">
                {question.type === 'true_false' ? 'Doğru mu? Yanlış mı?' : 'Çoktan Seçmeli'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
              {question.question}
            </h2>
          </div>

          {/* 12-second circular timer */}
          <div className="shrink-0">
            <CircularTimer timeRemaining={timeRemaining} totalTime={12} />
          </div>
        </div>

        {/* Question Options */}
        {question.type === 'true_false' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
            {['Doğru', 'Yanlış'].map((opt) => {
              const isSelected = userAnswerRecord?.userAnswer === opt;
              const isCorrectAnswer = opt === question.correctAnswer;

              return (
                <button
                  key={opt}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => onSelectAnswer(opt)}
                  className={`relative p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between text-left group ${getOptionStyle(
                    opt
                  )}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        opt === 'Doğru'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {opt === 'Doğru' ? 'D' : 'Y'}
                    </div>
                    <span className="text-lg font-bold tracking-wide">{opt}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrectAnswer && (
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                          <Check className="w-5 h-5 stroke-[3]" />
                        </div>
                      )}
                      {isSelected && !isCorrectAnswer && (
                        <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                          <X className="w-5 h-5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
            {(question.options || []).map((opt, idx) => {
              const letter = optionLetters[idx] || String(idx + 1);
              const isSelected = userAnswerRecord?.userAnswer === opt;
              const isCorrectAnswer = opt === question.correctAnswer;

              return (
                <button
                  key={opt}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => onSelectAnswer(opt)}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between text-left ${getOptionStyle(
                    opt
                  )}`}
                >
                  <div className="flex items-center gap-3 flex-1 mr-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {letter}
                    </div>
                    <span className="font-semibold text-sm sm:text-base leading-snug">
                      {opt}
                    </span>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0">
                      {isCorrectAnswer && (
                        <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                      {isSelected && !isCorrectAnswer && (
                        <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                          <X className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Answer Feedback & Explanation Card */}
        {isAnswered && userAnswerRecord && (
          <div className="mt-5 pt-5 border-t border-slate-800/90 animate-fadeIn">
            {/* Status Headline */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                {userAnswerRecord.timedOut ? (
                  <div className="flex items-center gap-1.5 text-rose-400 text-sm font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg">
                    <Clock className="w-4 h-4" />
                    <span>Süre Doldu! (12 sn aşıldı)</span>
                  </div>
                ) : userAnswerRecord.isCorrect ? (
                  <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                    <Check className="w-4 h-4" />
                    <span>Harika! Doğru Cevap</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-400 text-sm font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg">
                    <X className="w-4 h-4" />
                    <span>Yanlış Cevap</span>
                  </div>
                )}

                {userAnswerRecord.pointsEarned > 0 && (
                  <span className="font-mono-numbers text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                    +{userAnswerRecord.pointsEarned} Puan
                  </span>
                )}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={onNextQuestion}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm px-4 py-2 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
              >
                <span>{currentIndex + 1 >= totalQuestions ? 'Sonuçları Gör' : 'Sonraki Soru'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Explanation box */}
            {question.explanation && (
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 mr-1.5">Biliyor muydunuz?</span>
                  <span>{question.explanation}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
