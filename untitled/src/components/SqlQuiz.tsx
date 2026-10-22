import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, HelpCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "customer tablosunda first_name değeri 'Mary' olan müşterinin last_name değeri nedir?",
    options: ["JOHNSON", "SMITH", "WILLIAMS", "BROWN"],
    correctAnswer: 1,
    explanation: "Sakila / DVD Rental örnek veri tabanındaki 1 numaralı müşteri 'Mary Smith'tir."
  },
  {
    id: 2,
    question: "rental_rate = 0.99 AND replacement_cost = 12.99 OR replacement_cost = 28.99 sorgusunda neden parantez zorunludur?",
    options: [
      "SQL'de OR, AND'den önce çalıştığı için",
      "SQL'de AND, OR'dan önce çalıştığı için (Operator Precedence)",
      "Parantez olmasa da aynı sonucu verir, sadece okunabilirlik içindir",
      "PostgreSQL hata verir ve sorgu hiç çalışmaz"
    ],
    correctAnswer: 1,
    explanation: "SQL mantığında AND operatörü OR'dan önce işletilir. Parantez olmazsa maliyeti 28.99 olan her film kiralanma bedeline bakılmaksızın listelenir."
  },
  {
    id: 3,
    question: "WHERE length > 60 AND length < 75 filtresinde 60 veya 75 dakika süren filmler sonuca dahil edilir mi?",
    options: [
      "Evet, her iki sınır da dahildir",
      "Hayır, yalnızca 61 ile 74 dakika arası (sınırlar hariç) dahildir",
      "Sadece 60 dahildir, 75 hariçtir",
      "Sadece 75 dahildir, 60 hariçtir"
    ],
    correctAnswer: 1,
    explanation: "Kesin büyüktür (>) ve kesin küçüktür (<) operatörleri eşitlik içermez (exclusive). Dahil etmek için BETWEEN veya >= ve <= kullanılmalıdır."
  },
  {
    id: 4,
    question: "film tablosunda 'NOT (length > 50)' ifadesinin eşdeğeri hangi seçenektir?",
    options: [
      "length < 50",
      "length >= 50",
      "length <= 50",
      "length != 50"
    ],
    correctAnswer: 2,
    explanation: "'50'den büyük olmama' şartı, 50'ye eşit veya 50'den küçük olmayı (length <= 50) ifade eder."
  },
  {
    id: 5,
    question: "ORDER BY title ifadesinde sıralama yönü belirtilmediğinde PostgreSQL varsayılan olarak hangi yönü kullanır?",
    options: [
      "DESC (Büyükten küçüğe / Z-A)",
      "RANDOM (Rastgele)",
      "ASC (Küçükten büyüğe / A-Z)",
      "Eklenme sırasına göre"
    ],
    correctAnswer: 2,
    explanation: "SQL standardında ORDER BY varsayılan yönü 'ASC' (Ascending) yani artandır."
  }
];

export const SqlQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  const handleFinish = () => {
    setShowResults(true);
    if (score >= 4) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
        <div>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-amber-400" />
            <h2 className="text-xl font-bold text-white">
              DVD Rental SQL Bilgi Testi (5/5 Quiz)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            5 senaryonun püf noktalarını ne kadar iyi kavradınız? Testi tamamlayıp skorunuzu görün.
          </p>
        </div>

        {showResults ? (
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-950 border border-slate-700 px-4 py-2 text-center">
              <span className="text-xs text-slate-400 block font-mono">Skorunuz</span>
              <span className={`text-xl font-black font-mono ${
                score === 5 ? 'text-emerald-400' : score >= 3 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {score} / 5
              </span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs text-slate-200 font-semibold"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Tekrar Dene</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleFinish}
            disabled={answeredCount < QUIZ_QUESTIONS.length}
            className="flex items-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:hover:bg-cyan-600 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-lg shadow-cyan-950"
          >
            <Sparkles className="h-4 w-4" />
            <span>Testi Tamamla ({answeredCount}/5)</span>
          </button>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 backdrop-blur transition-colors ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-500/40 bg-emerald-950/10'
                    : 'border-red-500/40 bg-red-950/10'
                  : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 font-mono text-xs font-bold text-cyan-300">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-semibold text-white leading-relaxed">
                  {q.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pl-9">
                {q.options.map((option, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  const isThisCorrect = q.correctAnswer === optIdx;

                  let btnStyle = 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-900';

                  if (showResults) {
                    if (isThisCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-300 font-semibold';
                    } else if (isSelected && !isThisCorrect) {
                      btnStyle = 'border-red-500 bg-red-950/60 text-red-300 line-through';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-cyan-500 bg-cyan-950/60 text-cyan-200 font-semibold ring-1 ring-cyan-500';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[10px] bg-slate-900 text-slate-400">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-snug">{option}</span>
                      {showResults && isThisCorrect && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      )}
                      {showResults && isSelected && !isThisCorrect && (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Result explanation */}
              {showResults && (
                <div className="mt-3 pl-9 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Açıklama: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
