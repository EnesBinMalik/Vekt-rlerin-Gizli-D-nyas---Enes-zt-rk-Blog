import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Lightbulb, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../types';

export const IntuitionQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      question:
        "Dünya'nın ekvatorunu saran sımsıkı bir halat düşünün. Bu halatı tüm gezegen boyunca yerden tam 1 metre havaya kaldırmak için halatın boyunu kaç metre uzatmanız gerekir?",
      options: [
        {
          text: 'Yüzlerce kilometre (Dünya devasa bir küredir)',
          isCorrect: false,
          explanation: 'Görünüş yanıltıcıdır! Formülün içine girdiğimizde gezegenin yarıçapı tamamen yok olur.',
        },
        {
          text: 'Sadece yaklaşık 6.28 metre (2π metre)',
          isCorrect: true,
          explanation:
            'Çevre = 2πr. Yeni Çevre = 2π(r + 1) = 2πr + 2π. Aradaki fark sadece 2π ≈ 6.28 metredir! Bir portakalın etrafındaki ipi 1 metre kaldırmak için de aynı 6.28 metre gerekir!',
        },
        {
          text: 'Yaklaşık 40.000 metre (Ekvator çevresinin %0.1\'i kadar)',
          isCorrect: false,
          explanation: 'Dünya’nın ne kadar büyük olduğunun hiçbir önemi yoktur; lineer büyüme yarıçapa bağımlı değildir.',
        },
      ],
      insight: 'Doğrusallık ve çevre ilişkisi: Eklenen çevre sadece yarıçapın artış miktarıyla orantılıdır, mevcut boyutla değil!',
    },
    {
      id: 'q2',
      question:
        'Bir dağ yoluna sabah 08:00\'de tırmanmaya başlayıp 18:00\'de zirveye ulaşan bir gezgin, ertesi gün aynı saatlerde (08:00 - 18:00) aynı yoldan aşağı iniyor. Gezginin iki günde de tam olarak aynı saatte aynı yükseklikte bulunduğu bir nokta mutlaka var mıdır?',
      options: [
        {
          text: 'Hayır, inerken daha hızlı koşabilir veya mola verebilir',
          isCorrect: false,
          explanation: 'Hızının nasıl değiştiği sonucu değiştirmez.',
        },
        {
          text: 'Evet, kesinlikle tam aynı saatte aynı noktada bulunmuştur',
          isCorrect: true,
          explanation:
            'Sezgisel düşünün: Sanki birinci gezgin yukarı çıkarken, onun ikizi aynı anda zirveden aşağı iniyor olsun! İki gezgin bu tek patikada bir yerlerde mutlaka karşılaşmak (çarpışmak) zorundadır. O an, tam aynı saatte aynı noktada oldukları andır! (Ara Değer Teoremi)',
        },
        {
          text: 'Yalnızca sabit hızla hareket ettiyse mümkündür',
          isCorrect: false,
          explanation: 'Süreklilik olduğu müddetçe hızın değişken olması fark etmez.',
        },
      ],
      insight: 'Ara Değer Teoremi (Intermediate Value Theorem): İki sürekli fonksiyon birbirini kesmek zorundadır.',
    },
    {
      id: 'q3',
      question:
        'Diyelim ki bir dairenin içine rastgele noktalar atıyorsunuz. Bir noktanın merkeze, çemberin kenarına olduğundan daha yakın olma olasılığı nedir?',
      options: [
        {
          text: '%50 (Yarıçapın ortası olduğu için eşit şans)',
          isCorrect: false,
          explanation:
            'Uzunluk olarak ortadadır ancak alan karesiyle büyür! Merkeze yakın olan alan çok daha dardır.',
        },
        {
          text: '%25 (Dörtte bir)',
          isCorrect: true,
          explanation:
            'Noktanın merkeze daha yakın olması için yarıçapın ilk yarısının (r/2) içinde kalması gerekir. Bu küçük dairenin alanı π(r/2)² = (1/4)πr² kadardır. Yani tüm alanın sadece %25\'idir!',
        },
        {
          text: '%75 (Merkez çekimi fazladır)',
          isCorrect: false,
          explanation: 'Dış halkadaki alan merkeze göre 3 kat daha geniştir.',
        },
      ],
      insight: 'Boyut 2 katına çıktığında alan 4 katına çıkar! İnsan beyni doğrusal düşünürken geometri karesel çalışır.',
    },
  ];

  const handleSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowResults((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults({});
  };

  return (
    <div className="my-12 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
            Düşünce Deneyleri
          </span>
          <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
            Sezgisel Düşünce Egzersizleri
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Formül ezberlemeden, sadece görsel ve mantıksal canlandırmayla çözün.
          </p>
        </div>

        {Object.keys(selectedAnswers).length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors w-fit"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Cevapları Temizle
          </button>
        )}
      </div>

      <div className="mt-6 space-y-8">
        {questions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          const isAnswered = selected !== undefined;

          return (
            <div key={q.id} className="p-4 sm:p-5 rounded-xl border border-stone-200/90 bg-stone-50/50">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <p className="text-stone-900 font-serif font-semibold text-base leading-snug">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="mt-4 space-y-2.5 pl-0 sm:pl-8">
                {q.options.map((opt, optIndex) => {
                  const isThisSelected = selected === optIndex;
                  const showFeedback = isAnswered;

                  let borderClass = 'border-stone-200 bg-white hover:border-stone-300';
                  if (showFeedback) {
                    if (opt.isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-medium';
                    } else if (isThisSelected) {
                      borderClass = 'border-rose-400 bg-rose-50/50 text-rose-950';
                    }
                  }

                  return (
                    <button
                      key={opt.text}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelect(q.id, optIndex)}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${borderClass}`}
                    >
                      <span>{opt.text}</span>
                      {showFeedback && (
                        <span>
                          {opt.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : isThisSelected ? (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reveal Feedback */}
              {isAnswered && (
                <div className="mt-4 sm:ml-8 p-3.5 rounded-lg bg-amber-50/90 border border-amber-200/80 text-xs text-stone-800">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-950">
                        {q.options[selected].isCorrect ? 'Tebrikler, Sezginiz Kusursuz!' : 'Ezber Tuzağına Dikkat:'}
                      </p>
                      <p className="mt-1 text-stone-700 leading-relaxed">
                        {q.options[selected].explanation}
                      </p>
                      <div className="mt-2 pt-2 border-t border-amber-200 text-stone-600 italic">
                        <strong>Derin Çıkarım:</strong> {q.insight}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
