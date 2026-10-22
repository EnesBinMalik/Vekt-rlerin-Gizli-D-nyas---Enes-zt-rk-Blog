import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Play, 
  Trash2, 
  RotateCcw, 
  History, 
  Sparkles, 
  Copy, 
  Check, 
  Database, 
  HelpCircle,
  FileCode,
  CornerDownLeft
} from 'lucide-react';
import { executeQuery, ExecutionResult } from '../services/sqlEngine';
import { ResultsTable } from './ResultsTable';
import confetti from 'canvas-confetti';

interface SqlPlaygroundProps {
  initialQuery?: string;
}

const TEMPLATE_QUERIES = [
  {
    name: "Senaryo 1: Title & Description",
    query: `SELECT title, description \nFROM film \nORDER BY title ASC \nLIMIT 20;`
  },
  {
    name: "Senaryo 2: Uzunluk 60-75 Arası",
    query: `SELECT title, length, rental_rate \nFROM film \nWHERE length > 60 AND length < 75 \nORDER BY length ASC;`
  },
  {
    name: "Senaryo 3: Oran 0.99 VE Maliyet 12.99 / 28.99",
    query: `SELECT title, rental_rate, replacement_cost \nFROM film \nWHERE rental_rate = 0.99 \n  AND (replacement_cost = 12.99 OR replacement_cost = 28.99) \nORDER BY replacement_cost;`
  },
  {
    name: "Senaryo 4: Mary'nin Soyadı",
    query: `SELECT customer_id, first_name, last_name, email \nFROM customer \nWHERE first_name = 'Mary';`
  },
  {
    name: "Senaryo 5: Boyut <= 50 ve Oran != 2.99, 4.99",
    query: `SELECT title, length, rental_rate \nFROM film \nWHERE NOT (length > 50) \n  AND NOT (rental_rate = 2.99 OR rental_rate = 4.99) \nORDER BY length, rental_rate;`
  },
  {
    name: "Bonus: En Yüksek Maliyetli 10 Film",
    query: `SELECT title, length, replacement_cost, rating \nFROM film \nORDER BY replacement_cost DESC \nLIMIT 10;`
  },
  {
    name: "Bonus: Film Derecelendirme (Rating) Dağılımı",
    query: `SELECT rating, COUNT(*) AS toplam_film, AVG(length) AS ortalama_sure \nFROM film \nGROUP BY rating \nORDER BY toplam_film DESC;`
  }
];

export const SqlPlayground: React.FC<SqlPlaygroundProps> = ({ initialQuery }) => {
  const [query, setQuery] = useState(
    initialQuery || `SELECT title, description \nFROM film \nORDER BY title ASC \nLIMIT 15;`
  );
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleRun = () => {
    if (!query.trim()) return;
    const res = executeQuery(query);
    setResult(res);

    // Save to history
    setHistory((prev) => {
      const filtered = prev.filter((q) => q.trim() !== query.trim());
      return [query, ...filtered].slice(0, 10);
    });

    if (query.toLowerCase().includes('mary') && res.success && res.rowCount > 0) {
      confetti({ particleCount: 35, spread: 50 });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
    }
  };

  const insertSnippet = (snippet: string) => {
    setQuery((prev) => `${prev.trim()}\n${snippet}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-800/80 text-cyan-400 shadow">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              İnteraktif DVD Rental SQL Editörü
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                Canlı Bağlantı Aktif
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              İstediğiniz SQL sorgusunu yazıp anında çalıştırabilirsiniz. <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300 border border-slate-700">Ctrl + Enter</kbd> ile çalıştırabilirsiniz.
            </p>
          </div>
        </div>

        {/* Template Quick Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Şablonlar:</span>
          <select
            onChange={(e) => {
              if (e.target.value) {
                setQuery(e.target.value);
              }
            }}
            className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono"
            defaultValue=""
          >
            <option value="" disabled>Hazır Senaryo Seçin...</option>
            {TEMPLATE_QUERIES.map((t, idx) => (
              <option key={idx} value={t.query}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor Main Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/80 px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-red-500/80" />
            <span className="flex h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="flex h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-slate-400 text-xs">dvdrental.sql</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick SQL Helpers */}
            <div className="hidden lg:flex items-center gap-1.5 mr-2">
              <span className="text-slate-500 text-[11px]">Ekle:</span>
              <button
                onClick={() => insertSnippet('WHERE length > 60 AND length < 75')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
              >
                + WHERE
              </button>
              <button
                onClick={() => insertSnippet('ORDER BY title ASC')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
              >
                + ORDER BY
              </button>
              <button
                onClick={() => insertSnippet('LIMIT 20')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
              >
                + LIMIT
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2 py-1 text-slate-300 hover:text-white"
              title="Kopyala"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>

            <button
              onClick={() => setQuery('')}
              className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2 py-1 text-slate-400 hover:text-red-400"
              title="Temizle"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>

            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`flex items-center gap-1 rounded border px-2 py-1 ${
                  showHistory
                    ? 'bg-cyan-950 border-cyan-700 text-cyan-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
                title="Geçmiş"
              >
                <History className="h-3.5 w-3.5" />
                <span>Geçmiş ({history.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Query History Drawer */}
        {showHistory && history.length > 0 && (
          <div className="border-b border-slate-800 bg-slate-900/90 p-3 max-h-48 overflow-y-auto space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-400 font-semibold mb-1">
              <span>Son Çalıştırılan Sorgular:</span>
              <button
                onClick={() => setHistory([])}
                className="text-[10px] text-red-400 hover:underline"
              >
                Geçmişi Temizle
              </button>
            </div>
            {history.map((histQuery, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setQuery(histQuery);
                  setShowHistory(false);
                }}
                className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 hover:border-cyan-600/60 cursor-pointer group"
              >
                <code className="text-slate-300 font-mono truncate text-[11px] max-w-2xl">
                  {histQuery.replace(/\n/g, ' ')}
                </code>
                <span className="text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 font-medium">
                  Yükle →
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Text Area Code Editor */}
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={7}
            placeholder="SELECT * FROM film WHERE ...;"
            spellCheck={false}
            className="w-full bg-slate-950 p-4 font-mono text-sm text-cyan-100 placeholder-slate-600 focus:outline-none resize-y leading-relaxed selection:bg-cyan-900/60"
          />
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-900/80 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-mono text-cyan-400 font-bold">Kullanılabilir Tablolar:</span>
            <button
              onClick={() => insertSnippet('SELECT * FROM film LIMIT 10;')}
              className="font-mono text-slate-300 hover:text-cyan-300 underline"
            >
              film
            </button>
            <span>,</span>
            <button
              onClick={() => insertSnippet("SELECT * FROM customer WHERE first_name = 'Mary';")}
              className="font-mono text-slate-300 hover:text-cyan-300 underline"
            >
              customer
            </button>
            <span>,</span>
            <button
              onClick={() => insertSnippet('SELECT * FROM category;')}
              className="font-mono text-slate-300 hover:text-cyan-300 underline"
            >
              category
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-2 text-xs font-bold shadow-lg shadow-cyan-950 transition-all hover:scale-102 active:scale-98"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Sorguyu Çalıştır</span>
              <CornerDownLeft className="h-3.5 w-3.5 opacity-60 hidden sm:inline" />
            </button>
          </div>
        </div>
      </div>

      {/* Execution Results Area */}
      {result && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/80 animate-ping" />
              <h3 className="text-sm font-bold text-white font-mono">
                Sorgu Çıktısı (Execution Results)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              İşlem süresi: <strong className="text-cyan-300">{result.executionTimeMs} ms</strong> | Satır sayısı: <strong className="text-cyan-300">{result.rowCount}</strong>
            </span>
          </div>

          {result.success ? (
            <ResultsTable
              columns={result.columns}
              rows={result.rows}
              executionTimeMs={result.executionTimeMs}
              maxInitialRows={10}
              title="Son Çalıştırılan Sorgu"
            />
          ) : (
            <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-5 text-red-200">
              <div className="flex items-center gap-2 text-sm font-bold text-red-400 mb-1">
                <span>SQL Sözdizimi veya Çalışma Zamanı Hatası</span>
              </div>
              <p className="font-mono text-xs text-red-300 bg-red-950/80 p-3 rounded-lg border border-red-900/60 mt-2">
                {result.error}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                İpucu: Tablo adlarının (<code>film</code>, <code>customer</code>) ve sütun adlarının doğru yazıldığından emin olunuz.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
