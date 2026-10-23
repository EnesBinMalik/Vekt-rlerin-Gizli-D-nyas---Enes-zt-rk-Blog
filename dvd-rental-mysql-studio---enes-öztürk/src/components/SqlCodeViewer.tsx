import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface SqlCodeViewerProps {
  code: string;
  title?: string;
  onRun?: () => void;
  isRunning?: boolean;
}

export const SqlCodeViewer: React.FC<SqlCodeViewerProps> = ({
  code,
  title = 'MySQL Query',
  onRun,
  isRunning = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basit ve şık MySQL sözdizimi renklendirmesi
  const highlightSql = (sql: string) => {
    const keywords = [
      'SELECT',
      'FROM',
      'WHERE',
      'GROUP BY',
      'HAVING',
      'ORDER BY',
      'LIMIT',
      'JOIN',
      'INNER JOIN',
      'LEFT JOIN',
      'ON',
      'AS',
      'DESC',
      'ASC',
      'COUNT',
      'SUM',
      'AVG',
      'MIN',
      'MAX',
      'ROUND',
      'CASE',
      'WHEN',
      'THEN',
      'ELSE',
      'END',
      'AND',
      'OR',
    ];

    const lines = sql.split('\n');

    return lines.map((line, lineIdx) => {
      // Yorum satırı kontrolü
      if (line.trim().startsWith('--')) {
        return (
          <div key={lineIdx} className="text-slate-500 italic">
            {line}
          </div>
        );
      }

      // Kelimeleri renklendir
      const parts = line.split(/(\b(?:SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|JOIN|INNER JOIN|LEFT JOIN|ON|AS|DESC|ASC|COUNT|SUM|AVG|ROUND|CASE|WHEN|THEN|ELSE|END|AND|OR)\b|'[^']*'|\d+\.?\d*)/gi);

      return (
        <div key={lineIdx} className="leading-relaxed">
          {parts.map((part, pIdx) => {
            const upper = part.toUpperCase();
            if (keywords.includes(upper)) {
              if (['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'ROUND'].includes(upper)) {
                return (
                  <span key={pIdx} className="text-purple-400 font-semibold">
                    {part}
                  </span>
                );
              }
              return (
                <span key={pIdx} className="text-cyan-400 font-bold">
                  {part}
                </span>
              );
            } else if (part.startsWith("'") && part.endsWith("'")) {
              return (
                <span key={pIdx} className="text-amber-300">
                  {part}
                </span>
              );
            } else if (/^\d+\.?\d*$/.test(part)) {
              return (
                <span key={pIdx} className="text-emerald-400">
                  {part}
                </span>
              );
            }
            return <span key={pIdx} className="text-slate-200">{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
      {/* Başlık & Butonlar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-mono">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>{title}</span>
          <span className="text-[10px] text-slate-500">mysql 8.0</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
            title="Sorguyu Kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Kopyala</span>
              </>
            )}
          </button>

          {onRun && (
            <button
              onClick={onRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-sm transition disabled:opacity-50"
            >
              <span>{isRunning ? 'Çalışıyor...' : 'Çalıştır ▶'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Kod Alanı */}
      <div className="p-4 font-mono text-xs overflow-x-auto bg-slate-950/90 text-slate-200">
        {highlightSql(code)}
      </div>
    </div>
  );
};
