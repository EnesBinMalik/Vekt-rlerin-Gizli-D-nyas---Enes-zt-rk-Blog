import React, { useState } from 'react';
import { Copy, Check, Play, Terminal } from 'lucide-react';

interface SqlHighlighterProps {
  code: string;
  onRun?: () => void;
  isRunning?: boolean;
  title?: string;
}

export const SqlHighlighter: React.FC<SqlHighlighterProps> = ({
  code,
  onRun,
  isRunning = false,
  title
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple and safe syntax highlighting for SQL keywords, strings, and comments
  const highlightSql = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Check if full line comment
      const trimmed = line.trim();
      if (trimmed.startsWith('--') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
        return (
          <div key={idx} className="table-row">
            <span className="table-cell select-none pr-4 text-right text-xs text-slate-600 font-mono tabular-nums">
              {idx + 1}
            </span>
            <span className="table-cell text-slate-500 italic font-mono whitespace-pre">
              {line}
            </span>
          </div>
        );
      }

      // Tokenize tokens for basic colorizing
      const words = line.split(/(\s+|[(),;]|\b)/);
      const highlightedWords = words.map((word, wIdx) => {
        const upper = word.toUpperCase();
        const keywords = [
          'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'GROUP', 'BY', 'ORDER',
          'ASC', 'DESC', 'COUNT', 'AVG', 'MAX', 'MIN', 'SUM', 'JOIN', 'INNER',
          'LEFT', 'RIGHT', 'AS', 'WITH', 'ROUND', 'LIMIT', 'IN', 'HAVING'
        ];
        const tables = ['film', 'customer', 'payment', 'rental', 'OrtalamaSure'];

        if (keywords.includes(upper)) {
          return (
            <span key={wIdx} className="text-cyan-400 font-semibold">
              {word}
            </span>
          );
        }
        if (tables.includes(word)) {
          return (
            <span key={wIdx} className="text-amber-300 font-medium">
              {word}
            </span>
          );
        }
        if (/^\d+(\.\d+)?$/.test(word)) {
          return (
            <span key={wIdx} className="text-purple-300">
              {word}
            </span>
          );
        }
        if (word.startsWith("'") || word.endsWith("'")) {
          return (
            <span key={wIdx} className="text-emerald-400">
              {word}
            </span>
          );
        }
        return <span key={wIdx} className="text-slate-200">{word}</span>;
      });

      return (
        <div key={idx} className="table-row">
          <span className="table-cell select-none pr-4 text-right text-xs text-slate-600 font-mono tabular-nums">
            {idx + 1}
          </span>
          <span className="table-cell font-mono whitespace-pre text-sm">
            {highlightedWords}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono font-medium text-slate-300">{title || 'MySQL Query (8.x)'}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500 font-mono">utf8mb4</span>
        </div>
        <div className="flex items-center gap-2">
          {onRun && (
            <button
              onClick={onRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 rounded-md hover:bg-emerald-900/60 transition-colors cursor-pointer"
              title="Sorguyu dvdrental veritabanında çalıştır"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
              <span>{isRunning ? 'Çalışıyor...' : 'Çalıştır (Run)'}</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
            title="SQL kodunu panoya kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto text-sm leading-relaxed max-h-[380px] overflow-y-auto">
        <div className="table w-full">
          {highlightSql(code)}
        </div>
      </div>
    </div>
  );
};
