import React, { useRef, useState, useEffect } from 'react';
import { Play, Copy, Check, RotateCcw, Sparkles } from 'lucide-react';

interface SqlEditorProps {
  query: string;
  setQuery: (q: string) => void;
  onExecute: () => void;
  isExecuting?: boolean;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({
  query,
  setQuery,
  onExecute,
  isExecuting = false
}) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = query.split('\n');

  // Handle Ctrl+Enter or Cmd+Enter to execute
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        onExecute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExecute]);

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    // Clean SQL formatting
    let formatted = query
      .replace(/\s+/g, ' ')
      .replace(/\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT|LEFT JOIN|INNER JOIN|JOIN)\b/gi, (m) => `\n${m.toUpperCase()}`)
      .trim();
    // Indent sub-clauses
    formatted = formatted
      .split('\n')
      .map((line) => {
        const l = line.trim();
        if (/^(AND|OR)\b/i.test(l)) {
          return `  ${l}`;
        }
        return l;
      })
      .join('\n');
    setQuery(formatted + ';');
  };

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      target.value = value.substring(0, start) + '  ' + value.substring(end);
      target.selectionStart = target.selectionEnd = start + 2;
      setQuery(target.value);
    }
  };

  return (
    <div className="flex flex-col bg-[#0e1420] border border-slate-800/80 rounded-lg overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#141b2b] border-b border-slate-800/80 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">MySQL Sorgu Düzenleyici</span>
          <span className="text-slate-500 font-mono">·</span>
          <span className="text-slate-400 font-mono">Ctrl + Enter ile çalıştır</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFormat}
            className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Sorguyu düzgün biçimlendir"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Formatla</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            title="SQL kodunu panoya kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={() => setQuery('')}
            className="px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded transition-colors cursor-pointer"
            title="Düzenleyiciyi temizle"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          <button
            onClick={onExecute}
            disabled={isExecuting}
            className="ml-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-semibold rounded transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Çalıştır</span>
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="relative flex min-h-[160px] max-h-[300px] overflow-auto font-mono text-sm">
        {/* Line Numbers */}
        <div className="select-none py-3 px-3.5 bg-[#0a0f18] text-slate-600 text-right font-mono text-xs border-r border-slate-800/80 leading-6 min-w-[40px]">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleTabKey}
          spellCheck={false}
          className="w-full flex-1 p-3 bg-transparent text-emerald-300 font-mono text-sm leading-6 outline-none resize-none border-none selection:bg-emerald-950 selection:text-emerald-200"
          placeholder="-- MySQL sorgunuzu buraya yazın veya yukarıdaki ödev butonlarından birine tıklayın...&#10;SELECT * FROM country WHERE country LIKE 'A%a' ORDER BY country;"
        />
      </div>

      {/* Quick Snippets Bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0c121e] border-t border-slate-800/80 text-xs overflow-x-auto">
        <span className="text-slate-500 shrink-0 mr-1">Hızlı İfadeler:</span>
        {[
          { label: "SELECT *", snippet: "SELECT * FROM film LIMIT 20;" },
          { label: "WHERE LIKE 'A%a'", snippet: "SELECT country FROM country WHERE country LIKE 'A%a' ORDER BY country;" },
          { label: "WHERE LIKE '_____%n'", snippet: "SELECT country FROM country WHERE country LIKE '_____%n' ORDER BY country;" },
          { label: "LOWER() LIKE '%t%t%t%t%'", snippet: "SELECT title FROM film WHERE LOWER(title) LIKE '%t%t%t%t%' ORDER BY title;" },
          { label: "title LIKE 'C%' AND length > 90", snippet: "SELECT * FROM film WHERE title LIKE 'C%' AND length > 90 AND rental_rate = 2.99 ORDER BY title;" },
          { label: "COUNT(*)", snippet: "SELECT COUNT(*) FROM country;" }
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => setQuery(item.snippet)}
            className="px-2 py-0.5 bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white rounded border border-slate-700/50 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
