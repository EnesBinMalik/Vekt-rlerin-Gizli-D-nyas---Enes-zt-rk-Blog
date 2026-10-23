import React, { useState } from 'react';
import { executeQuery, QueryResult } from '../services/sqlEngine';
import { QUERY_SCENARIOS } from '../data/dvdrentalData';
import { Play, Copy, Check, Download, RotateCcw, Sparkles, Terminal, Database } from 'lucide-react';

interface SqlPlaygroundProps {
  initialSql?: string;
}

const PRESET_QUERIES = [
  {
    name: '1. Ortalama rental_rate',
    sql: 'SELECT ROUND(AVG(rental_rate), 2) AS ortalama_kiralama_ucreti FROM film;'
  },
  {
    name: '2. C ile Başlayan Filmler',
    sql: "SELECT COUNT(*) AS c_ile_baslayan_film_sayisi FROM film WHERE title LIKE 'C%';"
  },
  {
    name: '3. 0.99$ En Uzun Film',
    sql: 'SELECT MAX(length) AS en_uzun_film_dakika FROM film WHERE rental_rate = 0.99;'
  },
  {
    name: '4. >150 dk Tekil replacement_cost',
    sql: 'SELECT COUNT(DISTINCT replacement_cost) AS farkli_maliyet_sayisi FROM film WHERE length > 150;'
  },
  {
    name: 'Rating Dağılımı & Ort. Süre',
    sql: 'SELECT rating, COUNT(*) AS film_sayisi, ROUND(AVG(length), 1) AS ortalama_dakika FROM film GROUP BY rating ORDER BY film_sayisi DESC;'
  },
  {
    name: 'En Pahalı 10 Film',
    sql: 'SELECT title, rental_rate, replacement_cost, length FROM film ORDER BY replacement_cost DESC, length DESC LIMIT 10;'
  }
];

export const SqlPlayground: React.FC<SqlPlaygroundProps> = ({ initialSql }) => {
  const [sql, setSql] = useState(
    initialSql || 'SELECT ROUND(AVG(rental_rate), 2) AS ortalama_kiralama_ucreti FROM film;'
  );
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Update SQL when initialSql prop changes
  React.useEffect(() => {
    if (initialSql) {
      setSql(initialSql);
      runQuery(initialSql);
    }
  }, [initialSql]);

  const runQuery = (queryText?: string) => {
    const q = (queryText || sql).trim();
    if (!q) return;

    setIsRunning(true);
    setTimeout(() => {
      const res = executeQuery(q);
      setResult(res);
      setIsRunning(false);
      setHistory(prev => [q, ...prev.filter(item => item !== q)].slice(0, 10));
    }, 60);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runQuery();
    }
  };

  const copyResults = (format: 'json' | 'csv') => {
    if (!result || !result.data.length) return;
    let output = '';
    if (format === 'json') {
      output = JSON.stringify(result.data, null, 2);
    } else {
      const headers = result.columns.join(',');
      const rows = result.data.map(row => result.columns.map(col => JSON.stringify(row[col] ?? '')).join(','));
      output = [headers, ...rows].join('\n');
    }
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Editor & Presets */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {/* Preset query selector bar */}
        <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Hazır Şablonlar:</span>
          </span>
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSql(preset.sql);
                runQuery(preset.sql);
              }}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-800 hover:border-slate-700 whitespace-nowrap shrink-0 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Textarea Editor */}
        <div className="p-4 bg-slate-950/90">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-medium text-slate-300">PostgreSQL SQL Konsolu</span>
              <span className="text-slate-500 font-mono text-[11px]">Tablo: film (1.000 satır)</span>
            </div>
            <span className="text-slate-500 font-mono text-[11px]">Kısayol: Ctrl + Enter</span>
          </div>

          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={5}
            placeholder="SELECT ... FROM film WHERE ..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            spellCheck={false}
          />

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => runQuery()}
                disabled={isRunning}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Çalıştırılıyor...' : 'Sorguyu Çalıştır (Ctrl+Enter)'}</span>
              </button>

              <button
                onClick={() => setSql('')}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Temizle</span>
              </button>
            </div>

            {result && result.success && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyResults('csv')}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-md font-medium transition-colors flex items-center gap-1"
                  title="CSV Formatında Kopyala"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => copyResults('json')}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-md font-medium transition-colors flex items-center gap-1"
                  title="JSON Formatında Kopyala"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Query Result Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">Sorgu Yürütme Çıktısı</span>
          </div>

          {result && (
            <div className="flex items-center gap-3 font-mono text-slate-400 text-[11px]">
              <span>Durum: <strong className={result.success ? 'text-emerald-400' : 'text-rose-400'}>{result.success ? 'Başarılı' : 'Hata'}</strong></span>
              <span>·</span>
              <span>Satır: <strong className="text-white">{result.rowCount}</strong></span>
              <span>·</span>
              <span>Süre: <strong className="text-white">{result.executionTimeMs} ms</strong></span>
            </div>
          )}
        </div>

        {/* Output container */}
        <div className="p-4">
          {!result && (
            <div className="py-12 text-center text-slate-500 text-xs">
              Sorguyu çalıştırmak için yukarıdaki butona tıklayın veya bir hazır şablon seçin.
            </div>
          )}

          {result && !result.success && (
            <div className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg text-rose-300 text-xs font-mono">
              <strong>Hata:</strong> {result.error}
            </div>
          )}

          {result && result.success && result.rowCount === 0 && (
            <div className="py-8 text-center text-slate-500 text-xs">
              Sorgu başarıyla çalıştı ancak dönen satır bulunamadı (0 satır).
            </div>
          )}

          {result && result.success && result.rowCount > 0 && (
            <div className="border border-slate-800 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-300 sticky top-0 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold text-slate-500 w-12">#</th>
                    {result.columns.map((col, idx) => (
                      <th key={idx} className="py-2.5 px-3 font-semibold text-blue-300 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-200">
                  {result.data.slice(0, 100).map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-slate-500">{rowIdx + 1}</td>
                      {result.columns.map((col, colIdx) => (
                        <td key={colIdx} className="py-2 px-3 whitespace-nowrap">
                          {row[col] !== null && row[col] !== undefined
                            ? String(row[col])
                            : <span className="text-slate-600 italic">NULL</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.rowCount > 100 && (
                <div className="p-2.5 text-center text-[11px] text-slate-500 bg-slate-950/90 border-t border-slate-800">
                  İlk 100 satır gösteriliyor (Toplam {result.rowCount} satır).
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Query History */}
      {history.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center justify-between">
            <span>Son Çalıştırılan Sorgular (Geçmiş)</span>
            <button
              onClick={() => setHistory([])}
              className="text-slate-500 hover:text-slate-300 text-[11px]"
            >
              Geçmişi Temizle
            </button>
          </div>
          <div className="space-y-2">
            {history.map((histSql, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-xs font-mono text-slate-300 hover:border-slate-700 transition-colors"
              >
                <div className="truncate flex-1">{histSql}</div>
                <button
                  onClick={() => {
                    setSql(histSql);
                    runQuery(histSql);
                  }}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] rounded transition-colors shrink-0"
                >
                  Yeniden Çalıştır
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
