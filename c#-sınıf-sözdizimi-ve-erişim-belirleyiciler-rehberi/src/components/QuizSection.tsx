/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/oopData';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

export default function QuizSection() {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / QUIZ_QUESTIONS.length) * 100);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(userAnswers).length === QUIZ_QUESTIONS.length;

  return (
    <section id="test" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200">
      {/* Section Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-1">
          Değerlendirme
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          05. İnteraktif Alıştırma & Bilgi Testi
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          C# sınıf sözdizimi, field/metot kuralları ve erişim belirleyicileri konularındaki
          bilgilerinizi test edin. %80 ve üzeri başarıda{' '}
          <strong className="text-slate-800">Enes Öztürk İmzalı Başarı Rozeti</strong> kazanın!
        </p>
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="space-y-8">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const selectedOpt = userAnswers[q.id];
            const isCorrect = selectedOpt === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="pb-8 border-b border-slate-200 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      Soru {qIndex + 1} / {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{q.conceptKey}</span>
                  </div>

                  {submitted && (
                    <div>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" /> Doğru
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
                          <XCircle className="w-4 h-4" /> Yanlış
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 leading-snug">
                  {q.question}
                </h3>

                {q.codeSnippet && (
                  <div className="mb-4 bg-slate-900 p-4 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
                    <pre>{q.codeSnippet}</pre>
                  </div>
                )}

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((option, optIdx) => {
                    const isOptionSelected = selectedOpt === optIdx;
                    let optionStyle =
                      'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300';

                    if (submitted) {
                      if (optIdx === q.correctAnswer) {
                        optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                      } else if (isOptionSelected && !isCorrect) {
                        optionStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                      } else {
                        optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isOptionSelected) {
                      optionStyle = 'bg-indigo-50 border-indigo-600 text-indigo-900 font-medium shadow-xs';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={`text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current shrink-0 flex items-center justify-center font-mono text-[11px] font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on submit */}
                {submitted && (
                  <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 font-semibold block mb-0.5">
                      Çözüm & Açıklama:
                    </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Score Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {!submitted ? (
            <>
              <div className="text-xs text-slate-500">
                {allAnswered
                  ? 'Tüm sorular işaretlendi! Sonuçlarınızı görüntüleyebilirsiniz.'
                  : `Lütfen tüm soruları işaretleyin (${Object.keys(userAnswers).length} / ${QUIZ_QUESTIONS.length})`}
              </div>
              <button
                disabled={!allAnswered}
                onClick={() => setSubmitted(true)}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap"
              >
                Cevapları Kontrol Et
              </button>
            </>
          ) : (
            <div className="w-full">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-slate-900 text-white mb-6">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Test Sonucunuz</div>
                  <div className="text-2xl font-bold flex items-center gap-2 mt-0.5">
                    <span className="tabular-nums font-mono text-emerald-400">%{score}</span>
                    <span className="text-xs text-slate-300 font-normal">
                      ({QUIZ_QUESTIONS.filter((q) => userAnswers[q.id] === q.correctAnswer).length} /{' '}
                      {QUIZ_QUESTIONS.length} Doğru)
                    </span>
                  </div>
                </div>

                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Testi Tekrar Çöz</span>
                </button>
              </div>

              {/* Certificate / Badge if >= 80% */}
              {score >= 80 ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-emerald-50 border border-indigo-200 text-slate-900">
                  <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs tracking-wider uppercase mb-2">
                    <Award className="w-4 h-4" />
                    <span>Tebrikler! Üstün Başarı</span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-2">
                    C# Sınıf & Erişim Belirleyiciler Başarı Belgesi
                  </h4>
                  <p className="text-xs text-slate-600 mb-4 max-w-xl">
                    C# Nesne Yönelimli Programlama sözdizimi, field/metot tanımlama ve erişim
                    belirleyicileri modülünü başarıyla tamamladınız.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <input
                      type="text"
                      placeholder="Adınız Soyadınız..."
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56"
                    />
                    <span className="text-xs text-slate-500">
                      (İsminizi girerek belgeyi kişiselleştirin)
                    </span>
                  </div>

                  <div className="pt-4 border-t border-indigo-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Öğrenci:</span>
                      <strong className="text-slate-800 font-semibold">
                        {studentName.trim() || 'C# Geliştiricisi'}
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block text-[11px]">Eğitmen & Onaylayan:</span>
                      <strong className="text-indigo-700 font-bold tracking-wide">
                        Enes Öztürk
                      </strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed">
                  Başarı rozetini açmak için %80 veya üzeri skor almanız gerekmektedir. Konu
                  özetini tekrar inceleyip testi yeniden deneyebilirsiniz.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
