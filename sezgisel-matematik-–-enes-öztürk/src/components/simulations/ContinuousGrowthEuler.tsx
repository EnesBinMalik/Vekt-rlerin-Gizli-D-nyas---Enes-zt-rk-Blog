import React, { useState } from 'react';
import { TrendingUp, Layers, Check, Sparkles } from 'lucide-react';

export const ContinuousGrowthEuler: React.FC = () => {
  const [compoundStep, setCompoundStep] = useState<number>(12); // compound frequency n
  const [initialAmount, setInitialAmount] = useState<number>(100);

  const presets = [
    { label: 'Yıllık (n=1)', n: 1, desc: 'Yıl sonunda 1 kez %100 büyüme' },
    { label: '6 Aylık (n=2)', n: 2, desc: '6 ayda bir %50 + kazancın kazancı' },
    { label: 'Çeyreklik (n=4)', n: 4, desc: '3 ayda bir %25 büyüme' },
    { label: 'Aylık (n=12)', n: 12, desc: 'Her ay %8.33 büyüme' },
    { label: 'Günlük (n=365)', n: 365, desc: 'Her gün mikro büyüme' },
    { label: 'Sürekli (n=∞)', n: 100000, desc: 'Kesintisiz doğa ritmi (e sabiti)' },
  ];

  const calculateResult = (n: number) => {
    if (n >= 100000) {
      return initialAmount * Math.E;
    }
    return initialAmount * Math.pow(1 + 1 / n, n);
  };

  const finalAmount = calculateResult(compoundStep);
  const factor = finalAmount / initialAmount;
  const eVal = Math.E;

  // Breakdown of growth
  const principal = initialAmount;
  const directGain = initialAmount; // first order (100%)
  const compoundBonus = Math.max(0, finalAmount - (principal + directGain));

  return (
    <div className="my-8 rounded-xl border border-stone-300/80 bg-stone-50/70 p-5 md:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200/80 gap-3">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800">
            İnteraktif Deney 03
          </span>
          <h4 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
            Doğanın Büyüme Sabiti e ≈ 2.718: Sonsuz Bölünmenin Limiti
          </h4>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500 font-sans">Euler Limiti</span>
          <div className="font-mono font-bold text-emerald-900 text-sm">
            e = 2.7182818...
          </div>
        </div>
      </div>

      {/* Preset Frequencies */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {presets.map((preset) => {
          const isSelected = compoundStep === preset.n;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => setCompoundStep(preset.n)}
              className={`px-3 py-2 text-xs font-medium rounded-lg text-center transition-all ${
                isSelected
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <div className="font-semibold">{preset.label}</div>
              <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-stone-600'}`}>
                {preset.n >= 100000 ? 'Kesintisiz' : `n = ${preset.n}`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Bar Growth Comparison */}
      <div className="mt-6 bg-white rounded-lg border border-stone-200/80 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <span className="text-xs font-medium text-stone-500">Formül:</span>
            <div className="font-mono text-sm text-stone-800 mt-0.5">
              Sonuç = 100 × (1 + 1 / {compoundStep >= 100000 ? '∞' : compoundStep})
              <sup>{compoundStep >= 100000 ? '∞' : compoundStep}</sup>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs font-medium text-stone-500">Ulaşılan Büyüme Çarpanı:</span>
            <div className="font-mono text-xl font-bold text-emerald-900 tabular-nums">
              {factor.toFixed(5)} × Ana Para
            </div>
          </div>
        </div>

        {/* Growth Bar Representation */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5 font-medium">
            <span>Büyüme Bileşenleri Dağılımı</span>
            <span className="font-mono text-stone-800">Toplam: {finalAmount.toFixed(2)} ₺</span>
          </div>

          <div className="relative h-10 w-full bg-stone-100 rounded-lg overflow-hidden flex border border-stone-200">
            {/* Principal (100) */}
            <div
              style={{ width: `${(principal / (initialAmount * 3)) * 100}%` }}
              className="bg-stone-700 text-stone-100 flex items-center justify-center text-xs font-mono font-medium px-2 truncate"
              title="Başlangıç Ana Parası (100)"
            >
              Ana Para (1.00)
            </div>

            {/* Direct 1st order gain (100) */}
            <div
              style={{
                width: `${(Math.min(initialAmount, finalAmount - initialAmount) / (initialAmount * 3)) * 100}%`,
              }}
              className="bg-emerald-600 text-white flex items-center justify-center text-xs font-mono font-medium px-2 truncate transition-all duration-300"
              title="Doğrudan Faiz (1.00)"
            >
              + %100 Kazanç
            </div>

            {/* Compound bonus (0 to 0.71828) */}
            {compoundBonus > 0 && (
              <div
                style={{
                  width: `${(compoundBonus / (initialAmount * 3)) * 100}%`,
                }}
                className="bg-amber-500 text-stone-900 flex items-center justify-center text-xs font-mono font-bold px-2 truncate transition-all duration-300"
                title="Bileşik Faizin Kazandırdığı Ekstra Pay"
              >
                +{(compoundBonus / initialAmount).toFixed(3)}
              </div>
            )}

            {/* Ghost ceiling line for e (2.71828) */}
            <div
              style={{ left: `${(eVal / 3) * 100}%` }}
              className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-10"
              title="Euler Üst Limiti (e = 2.71828)"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-600 mt-2">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-stone-700 rounded-xs inline-block" /> Ana Para (1.0x)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs inline-block" /> Doğrudan Büyüme (1.0x)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-xs inline-block" /> Kazancın Kazancı (Maks: +0.718x)
            </span>
            <span className="flex items-center gap-1 text-red-600 font-medium">
              <span className="w-2.5 h-0.5 bg-red-500 inline-block" /> Limit e = 2.718
            </span>
          </div>
        </div>
      </div>

      {/* Deep intuition explanation */}
      <div className="mt-5 p-4 rounded-lg bg-emerald-50/70 border border-emerald-200/70 text-stone-800 text-sm">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-stone-900 font-serif">
              Sonsuz Kere Bölünürse Neden Sonsuza Ulaşmaz?
            </p>
            <p className="mt-1 text-xs text-stone-700 leading-relaxed">
              İnsan sezgisi ilk bakışta şöyle düşünür: <em>"Büyümeyi her saniye, her mikro saniye katlarsam zengin olurum, sayı sonsuza gider!"</em>
              Ama hayır. Çünkü bölünme sıklığı arttıkça, o anki büyüme oranı da o kadar küçülür (1/n).
              Bu iki kuvvet (sonsuz sıklık ile sonsuz küçülen parça) birbirini muazzam bir dengeyle frenler.
              O frenin durduğu yer evrenin büyüme imzasıdır: <strong className="font-mono text-emerald-950">2.71828...</strong>
              Bir ağacın yaprağındaki spiralden fincandaki kahvenin soğumasına kadar her şey bu sabite göre nefes alır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
