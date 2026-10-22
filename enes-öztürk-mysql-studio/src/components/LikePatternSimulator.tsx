import React, { useState, useMemo } from 'react';
import { matchesSqlLike } from '../lib/sqlEngine';
import { Check, X, Sparkles, HelpCircle } from 'lucide-react';

export const LikePatternSimulator: React.FC = () => {
  const [testString, setTestString] = useState<string>('Algeria');
  const [pattern, setPattern] = useState<string>('A%a');
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);

  const isMatch = useMemo(() => {
    return matchesSqlLike(testString, pattern, isCaseSensitive);
  }, [testString, pattern, isCaseSensitive]);

  // Preset test suites
  const presets = [
    { label: "'A%a' (A ile başlar, a ile biter)", pattern: 'A%a', sample: 'Argentina' },
    { label: "'_____%n' (En az 6 harf, sonu n)", pattern: '_____%n', sample: 'Kazakhstan' },
    { label: "'%t%t%t%t%' (En az 4 'T' harfi)", pattern: '%t%t%t%t%', sample: 'ATTRACTION INSTINCT' },
    { label: "'C%' (C ile başlayanlar)", pattern: 'C%', sample: 'CABIN FLASH' },
    { label: "'_____n' (Tam olarak 6 harf ve sonu n)", pattern: '_____n', sample: 'Jordan' }
  ];

  const quickSamples = [
    'Algeria', 'Argentina', 'Armenia', 'Australia', 'Afghanistan',
    'Jordan', 'Japan', 'Oman', 'Cameroon', 'Sweden',
    'ATTRACTION NEWTON', 'CONSTITUTION HANOVER', 'TITANIC TRANSLATION', 'PATRIOT ROMAN',
    'CABIN FLASH', 'CASABLANCA SUPER', 'CHOCOLATE DUCK'
  ];

  return (
    <div className="flex flex-col gap-5 bg-[#0e1420] border border-slate-800/80 rounded-lg p-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            MySQL LIKE & Joker Karakter Görsel Laboratuvarı
          </h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Bu simülatörde istediğiniz herhangi bir metin ve SQL <code className="text-emerald-400 font-mono">LIKE</code> kalıbını gerçek zamanlı test edebilir; joker karakterlerin (<code className="text-amber-300 font-mono">%</code> ve <code className="text-amber-300 font-mono">_</code>) nasıl çalıştığını anında görebilirsiniz.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-500 mr-1">Hazır Kalıplar:</span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPattern(p.pattern);
              setTestString(p.sample);
            }}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Interactive Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Test Candidate String */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span>Test Edilecek Metin (Sütun Değeri)</span>
            <span className="text-slate-500 font-mono text-[11px]">
              Uzunluk: {testString.length} karakter
            </span>
          </label>
          <input
            type="text"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Örn: Argentina"
            className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 text-slate-100 rounded text-sm font-mono outline-none focus:border-emerald-500"
          />

          {/* Quick Word Chips */}
          <div className="flex flex-wrap gap-1 pt-1.5">
            {quickSamples.slice(0, 8).map((word) => (
              <button
                key={word}
                onClick={() => setTestString(word)}
                className="px-2 py-0.5 rounded text-[11px] bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* LIKE Pattern */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300">
              LIKE Deseni / Kalıbı
            </label>
            <label className="flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isCaseSensitive}
                onChange={(e) => setIsCaseSensitive(e.target.checked)}
                className="rounded border-slate-700 text-emerald-500 focus:ring-0"
              />
              <span>Harf Büyüklüğüne Duyarlı (BINARY)</span>
            </label>
          </div>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Örn: A%a veya _____%n"
            className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 text-emerald-300 rounded text-sm font-mono outline-none focus:border-emerald-500"
          />

          <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1.5">
            <span>
              <strong className="text-amber-300 font-mono">%</strong> = 0 veya daha fazla karakter
            </span>
            <span>·</span>
            <span>
              <strong className="text-amber-300 font-mono">_</strong> = Tam olarak 1 karakter
            </span>
          </div>
        </div>
      </div>

      {/* Match Result Banner */}
      <div className={`p-4 rounded-lg border flex items-center justify-between transition-all ${
        isMatch
          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
          : 'bg-red-950/20 border-red-500/40 text-red-300'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isMatch ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {isMatch ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </div>

          <div>
            <div className="text-sm font-semibold">
              {isMatch ? 'KOŞUL SAĞLANDI: EŞLEŞTİ (TRUE)' : 'KOŞUL SAĞLANMADI: EŞLEŞMEDİ (FALSE)'}
            </div>
            <div className="text-xs text-slate-300/80 font-mono mt-0.5">
              &lsquo;{testString}&rsquo; LIKE &lsquo;{pattern}&rsquo; → {isMatch ? '1 (Satır sorgu sonucuna dahil edilir)' : '0 (Satır elenir)'}
            </div>
          </div>
        </div>

        <div className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
          Uzunluk: {testString.length} krş
        </div>
      </div>

      {/* Educational Explanation Box */}
      <div className="p-3.5 bg-slate-900/40 border border-slate-800/60 rounded text-xs text-slate-400 space-y-1.5">
        <div className="font-semibold text-slate-300 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
          <span>Joker Karakter Kuralları Hatırlatması:</span>
        </div>
        <p className="leading-relaxed">
          1. <code className="text-emerald-300 font-mono">LIKE &apos;A%a&apos;</code>: &apos;A&apos; ile başlar, ardından sıfır veya sonsuz sayıda harf gelebilir ve &apos;a&apos; ile biter. (Örn: Algeria ✓, Argentina ✓, Afghanistan ✕).
        </p>
        <p className="leading-relaxed">
          2. <code className="text-emerald-300 font-mono">LIKE &apos;_____%n&apos;</code>: 5 adet <code className="text-amber-300 font-mono">_</code> en az 5 karakter garanti eder, ardından gelen <code className="text-amber-300 font-mono">%</code> ek karakterlere izin verir, son harf <code className="text-amber-300 font-mono">n</code> olmalıdır. Toplam en az 6 karakter! (Örn: Jordan [6] ✓, Pakistan [8] ✓, Oman [4] ✕, Japan [5] ✕).
        </p>
        <p className="leading-relaxed">
          3. <code className="text-emerald-300 font-mono">LIKE &apos;%t%t%t%t%&apos;</code>: Metin içinde birbirinden bağımsız en az 4 adet &apos;t&apos; veya &apos;T&apos; harfi bulunduğunu doğrular. (Örn: ATTRACTION NEWTON [4] ✓, CONSTITUTION HANOVER [3] ✕).
        </p>
      </div>
    </div>
  );
};
