import React, { useState } from 'react';
import { Play, RotateCcw, Terminal, Code2, Sparkles, BookOpen } from 'lucide-react';
import { executeCustomSql, QueryResult } from '../utils/sqlEngine';
import { QueryResultsTable } from './QueryResultsTable';

const PRESET_QUERIES = [
  {
    name: '1. Senaryo (AVG Uzunluk)',
    query: `SELECT COUNT(*) AS ortalamadan_uzun_film_sayisi
FROM film
WHERE length > (SELECT AVG(length) FROM film);`
  },
  {
    name: '2. Senaryo (MAX rental_rate)',
    query: `SELECT COUNT(*) AS en_yuksek_ucretli_film_sayisi
FROM film
WHERE rental_rate = (SELECT MAX(rental_rate) FROM film);`
  },
  {
    name: '3. Senaryo (MIN Ücret & Maliyet)',
    query: `SELECT film_id, title, rental_rate, replacement_cost, length, rating
FROM film
WHERE rental_rate = (SELECT MIN(rental_rate) FROM film)
  AND replacement_cost = (SELECT MIN(replacement_cost) FROM film)
ORDER BY title ASC;`
  },
  {
    name: '4. Senaryo (Müşteri Alışveriş)',
    query: `SELECT c.customer_id, c.first_name, c.last_name, c.email,
       COUNT(p.payment_id) AS toplam_alisveris_sayisi,
       SUM(p.amount) AS toplam_harcama_tutari
FROM customer c
INNER JOIN payment p ON c.customer_id = p.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
ORDER BY toplam_alisveris_sayisi DESC;`
  },
  {
    name: 'film Tablosu (İlk 15 Kayıt)',
    query: `SELECT * FROM film LIMIT 15;`
  },
  {
    name: 'customer Tablosu (Müşteriler)',
    query: `SELECT * FROM customer LIMIT 15;`
  },
  {
    name: 'payment Tablosu (Ödemeler)',
    query: `SELECT * FROM payment LIMIT 15;`
  }
];

export const SqlPlayground: React.FC = () => {
  const [customQuery, setCustomQuery] = useState(PRESET_QUERIES[0].query);
  const [result, setResult] = useState<QueryResult | null>(() => executeCustomSql(PRESET_QUERIES[0].query));
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = executeCustomSql(customQuery);
      setResult(res);
      setIsRunning(false);
    }, 150);
  };

  const handleReset = () => {
    setCustomQuery(PRESET_QUERIES[0].query);
    setResult(executeCustomSql(PRESET_QUERIES[0].query));
  };

  return (
    <div className="space-y-6">
      {/* Hero Description */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono font-medium mb-2">
          <Terminal className="w-4 h-4" />
          <span>İnteraktif MySQL Çalışma Konsolu</span>
          <span className="text-slate-600">·</span>
          <span>dvdrental Sandbox</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Özelleştirilebilir MySQL Konsolu
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          dvdrental veri tabanı üzerinde dilediğiniz SQL sorgusunu yazabilir, düzenleyebilir ve anında çalıştırabilirsiniz.
          Hazır senaryoları yüklemek için aşağıdaki şablon butonlarını kullanabilirsiniz.
        </p>

        {/* Preset Query Chips */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <div className="text-xs text-slate-400 mb-2 font-medium">Hazır Sorgu Şablonları:</div>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCustomQuery(preset.query);
                  setResult(executeCustomSql(preset.query));
                }}
                className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700/80 rounded-md transition-colors cursor-pointer"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor & Actions */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-200 font-medium">SQL Editor (MySQL Modu)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
              title="Varsayılana sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold text-emerald-300 bg-emerald-950 border border-emerald-700 rounded-md hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
              <span>{isRunning ? 'Çalışıyor...' : 'Çalıştır (Ctrl+Enter)'}</span>
            </button>
          </div>
        </div>

        <div className="p-3 bg-slate-950">
          <textarea
            value={customQuery}
            onChange={e => setCustomQuery(e.target.value)}
            onKeyDown={e => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                handleRun();
              }
            }}
            rows={7}
            className="w-full bg-transparent text-cyan-300 font-mono text-sm leading-relaxed focus:outline-none resize-y selection:bg-cyan-500/30"
            placeholder="SELECT * FROM film WHERE length > 120;"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-200">
          Çalıştırma Sonuçları
        </h3>
        <QueryResultsTable result={result} />
      </div>
    </div>
  );
};
