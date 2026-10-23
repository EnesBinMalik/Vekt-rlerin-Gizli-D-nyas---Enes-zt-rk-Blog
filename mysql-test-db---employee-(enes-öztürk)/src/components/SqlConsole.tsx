import React, { useState } from 'react';
import { QueryResult, ExecutionLog } from '../types/database';
import { Terminal, Play, RotateCcw, Clock, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';

interface SqlConsoleProps {
  onExecute: (sql: string) => QueryResult;
  history: ExecutionLog[];
  onClearHistory: () => void;
}

const TEMPLATE_QUERIES = [
  { label: 'Tümünü Listele (LIMIT 15)', sql: 'SELECT * FROM employee ORDER BY id ASC LIMIT 15;' },
  { label: 'Çalışan Sayısı', sql: 'SELECT COUNT(*) AS toplam_calisan_sayisi FROM employee;' },
  { label: 'Tabloyu İncele (DESCRIBE)', sql: 'DESCRIBE employee;' },
  { label: 'Tabloları Göster (SHOW TABLES)', sql: 'SHOW TABLES;' },
  { label: '1990 Sonrası Doğanlar', sql: "SELECT * FROM employee WHERE birthday > '1990-01-01' ORDER BY birthday ASC;" },
  { label: 'Mockmail Uzantılılar', sql: "SELECT * FROM employee WHERE email LIKE '%@mockmail.com';" }
];

export const SqlConsole: React.FC<SqlConsoleProps> = ({
  onExecute,
  history,
  onClearHistory
}) => {
  const [query, setQuery] = useState('SELECT * FROM employee ORDER BY id ASC LIMIT 10;');
  const [latestResult, setLatestResult] = useState<QueryResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    if (!query.trim()) return;
    const res = onExecute(query);
    setLatestResult(res);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
    }
  };

  const handleCopyResult = () => {
    if (!latestResult) return;
    navigator.clipboard.writeText(JSON.stringify(latestResult.data || latestResult.message, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Console Input Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">
                MySQL İnteraktif Konsol (test.employee)
              </h2>
              <p className="text-xs text-slate-400">
                SELECT, UPDATE, DELETE, INSERT, DESCRIBE ve SHOW sorgularını doğrudan çalıştırabilirsiniz.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuery('')}
              className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded transition-colors"
            >
              Temizle
            </button>
            <button
              onClick={handleRun}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Çalıştır (Ctrl+Enter)</span>
            </button>
          </div>
        </div>

        {/* Quick Query Shortcuts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 shrink-0 font-medium mr-1">Hızlı Sorgular:</span>
          {TEMPLATE_QUERIES.map((tpl, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(tpl.sql);
                const res = onExecute(tpl.sql);
                setLatestResult(res);
              }}
              className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-colors"
            >
              {tpl.label}
            </button>
          ))}
        </div>

        {/* Query Editor Box */}
        <div className="relative">
          <textarea
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="SQL sorgunuzu yazın... (örn: SELECT * FROM employee WHERE id = 1;)"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500 leading-relaxed resize-y"
          />
        </div>
      </div>

      {/* Execution Results View */}
      {latestResult && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              {latestResult.success ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Sorgu Başarılı</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Sorgu Hatası</span>
                </div>
              )}
              <span className="text-xs text-slate-500 font-mono">
                · {latestResult.executionTimeMs} ms · {latestResult.timestamp}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">
                {latestResult.message}
              </span>
              {latestResult.data && (
                <button
                  onClick={handleCopyResult}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Kopyalandı' : 'JSON Kopyala'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Table */}
          {latestResult.data && latestResult.data.length > 0 ? (
            <div className="overflow-x-auto border border-slate-800 rounded bg-slate-950">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase">
                    {(latestResult.headers || Object.keys(latestResult.data[0])).map((header) => (
                      <th key={header} className="py-2.5 px-3">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {latestResult.data.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/60">
                      {(latestResult.headers || Object.keys(latestResult.data![0])).map((col) => (
                        <td key={col} className="py-2 px-3 text-slate-200">
                          {String((row as Record<string, unknown>)[col] ?? 'NULL')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : latestResult.success ? (
            <div className="p-4 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300 font-mono">
              mysql&gt; {latestResult.executedSql}
              <div className="text-emerald-400 mt-1 font-sans">
                {latestResult.message}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-rose-950/20 rounded border border-rose-900/40 text-xs text-rose-300 font-mono">
              mysql&gt; {latestResult.executedSql}
              <div className="mt-1 font-sans text-rose-400">
                {latestResult.message}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Query History Log */}
      {history.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Sorgu Geçmişi ({history.length})</span>
            </div>
            <button
              onClick={onClearHistory}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Geçmişi Temizle
            </button>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {history.slice(0, 10).map((log) => (
              <div
                key={log.id}
                onClick={() => setQuery(log.sql)}
                className="group p-2 rounded bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between text-xs cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 overflow-hidden mr-2">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${log.status === 'success' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  <code className="text-cyan-300 truncate font-mono text-xs">
                    {log.sql}
                  </code>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-slate-500 font-mono text-2xs">
                  <span>{log.executionTimeMs}ms</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
