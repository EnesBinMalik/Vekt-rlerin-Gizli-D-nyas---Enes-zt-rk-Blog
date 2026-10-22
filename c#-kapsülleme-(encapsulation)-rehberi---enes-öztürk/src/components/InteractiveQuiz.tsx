import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quiz';

export const InteractiveQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isComplete = answeredCount === QUIZ_QUESTIONS.length;

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();

  return (
    <section id="quiz" className="py-16 border-b border-slate-800 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-2">
            <span>PEKİŞTİRME & BİLGİ TESTİ</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Enes Öztürk İmzasıyla</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Kapsülleme (Encapsulation) Testi
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            Öğrendiklerinizi pekiştirmek için hazırlanmış 5 kritik soruyu yanıtlayın.
          </p>
        </div>

        {/* Progress & Score Bar */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-8 flex items-center justify-between">
          <div className="text-xs text-slate-300">
            Cevaplanan: <strong className="text-indigo-400 font-mono">{answeredCount} / {QUIZ_QUESTIONS.length}</strong>
          </div>
          <div className="flex items-center gap-3">
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={!isComplete}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                Sonuçları Değerlendir
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-4 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Testi Sıfırla</span>
              </button>
            )}
          </div>
        </div>

        {/* Result Summary Box if evaluated */}
        {showResults && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-700/50 mb-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mx-auto mb-2">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Tebrikler! Skorunuz: {score} / {QUIZ_QUESTIONS.length}
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              {score === 5
                ? 'Kusursuz! Kapsülleme, Field ve Property mantığını eksiksiz kavradınız.'
                : score >= 3
                ? 'Çok iyi! Birkaç detayı yukarıdaki canlı laboratuvarda tekrar deneyerek pekiştirebilirsiniz.'
                : 'Konuyu pekiştirmek için yukarıdaki Ogrenci ve Person analizini tekrar gözden geçirmeniz önerilir.'}
            </p>
          </div>
        )}

        {/* Questions list */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const userAnswer = selectedAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-semibold text-white">
                    <span className="text-indigo-400 font-mono mr-2">{qIndex + 1}.</span>
                    {q.question}
                  </div>
                  {showResults && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" /> Doğru
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-rose-400">
                          <XCircle className="w-4 h-4" /> Yanlış
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {q.codeSnippet && (
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                    <code>{q.codeSnippet}</code>
                  </pre>
                )}

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((option, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    let optionStyle =
                      'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/40 border-emerald-600 text-emerald-200 font-medium';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/40 border-rose-600 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-indigo-950/50 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/50';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={showResults}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {showResults && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                        )}
                        {showResults && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showResults && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed mt-2">
                    <strong className="text-slate-200 block mb-1">Açıklama:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
