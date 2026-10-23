import React, { useState, useEffect } from 'react';
import { Play, Copy, Check, RotateCcw, Sparkles, Terminal, Code } from 'lucide-react';
import { QueryPreset } from '../types/database';

interface QueryEditorProps {
  currentPreset?: QueryPreset;
  sqlQuery: string;
  setSqlQuery: (query: string) => void;
  onExecute: () => void;
  onReset: () => void;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({
  currentPreset,
  sqlQuery,
  setSqlQuery,
  onExecute,
  onReset
}) => {
  const [copied, setCopied] = useState(false);
  const [useAlternative, setUseAlternative] = useState(false);

  useEffect(() => {
    setUseAlternative(false);
  }, [currentPreset?.id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleAlternative = () => {
    if (!currentPreset?.mysqlAlternative) return;
    if (!useAlternative) {
      setSqlQuery(currentPreset.mysqlAlternative);
      setUseAlternative(true);
    } else {
      setSqlQuery(currentPreset.sqlQuery);
      setUseAlternative(false);
    }
  };

  // Basic SQL Syntax Highlighting renderer
  const renderHighlightedSql = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      // Tokenize by spaces and symbols
      const tokens = line.split(/(\s+|[,;()='"])/);
      return (
        <div key={lineIdx} className="leading-6">
          <span className="inline-block w-8 text-right pr-4 text-slate-600 select-none font-mono text-xs">
            {lineIdx + 1}
          </span>
          {tokens.map((token, tokenIdx) => {
            const upper = token.toUpperCase();
            if (['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'LIMIT', 'OFFSET', 'LIKE', 'AND', 'OR', 'DESC', 'ASC', 'IN', 'IS', 'NOT', 'NULL', 'USE'].includes(upper)) {
              return (
                <span key={tokenIdx} className="text-[#38bdf8] font-bold">
                  {token}
                </span>
              );
            }
            if (['film', 'customer', 'store_id', 'title', 'length', 'last_name', 'first_name', 'email', 'film_id', 'rating', 'rental_rate', 'replacement_cost', 'active'].includes(token.toLowerCase())) {
              return (
                <span key={tokenIdx} className="text-[#a5d6ff]">
                  {token}
                </span>
              );
            }
            if (/^['"][^'"]*['"]$/.test(token) || token.startsWith("'") || token.startsWith('"')) {
              return (
                <span key={tokenIdx} className="text-[#7ee787]">
                  {token}
                </span>
              );
            }
            if (/^\d+$/.test(token)) {
              return (
                <span key={tokenIdx} className="text-[#f2cc60]">
                  {token}
                </span>
              );
            }
            if (token.startsWith('--')) {
              return (
                <span key={tokenIdx} className="text-slate-500 italic">
                  {token}
                </span>
              );
            }
            return <span key={tokenIdx} className="text-slate-300">{token}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Question / Prompt Banner */}
      {currentPreset && (
        <div className="p-4 bg-[#1a222e] border-b border-[#30363d]">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
              <h2 className="text-sm font-bold text-white tracking-tight">
                {currentPreset.title}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/30 px-2 py-0.5 rounded">
              MySQL 8.4 Uyumlu
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
            <span className="text-slate-400 font-semibold block mb-0.5">Soru Metni:</span>
            "{currentPreset.userPrompt}"
          </p>
        </div>
      )}

      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1117] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-mono font-medium text-slate-300">
            query_editor.sql
          </span>
          <span className="text-xs text-slate-400 font-mono">· sakila_db</span>
        </div>

        <div className="flex items-center gap-2">
          {currentPreset?.mysqlAlternative && (
            <button
              onClick={handleToggleAlternative}
              className={`text-xs px-2.5 py-1 rounded font-mono transition-colors border ${
                useAlternative
                  ? 'bg-amber-950/50 text-amber-300 border-amber-700/60'
                  : 'bg-[#21262d] text-slate-300 border-[#30363d] hover:bg-[#30363d]'
              }`}
              title="MySQL özel sözdizimi alternatifi (örn: LIMIT 5, 5)"
            >
              {useAlternative ? 'Standart SQL Göster' : 'MySQL Sözdizimi (LIMIT 5, 5)'}
            </button>
          )}

          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs px-2.5 py-1 text-slate-400 hover:text-white bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded transition-colors"
            title="Sorguyu ilk haline döndür"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sıfırla</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs px-2.5 py-1 text-slate-300 hover:text-white bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded transition-colors"
            title="Panoya Kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={onExecute}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md shadow-sm transition-all active:scale-95"
            title="Sorguyu Çalıştır (Ctrl+Enter)"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Çalıştır</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative font-mono text-xs bg-[#0d1117] min-h-[140px] p-3 overflow-x-auto">
        {/* Rendered Syntax Highlighted view */}
        <div className="pointer-events-none select-none font-mono">
          {renderHighlightedSql(sqlQuery)}
        </div>

        {/* Real Editable Textarea on top */}
        <textarea
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
              e.preventDefault();
              onExecute();
            }
          }}
          className="absolute inset-0 w-full h-full p-3 font-mono text-xs text-transparent caret-white bg-transparent resize-none focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/40 selection:bg-[#38bdf8]/30 overflow-x-auto whitespace-pre"
          spellCheck={false}
          autoCapitalize="none"
        />
      </div>

      {/* Editor Keyboard Shortcut Hint */}
      <div className="px-4 py-1.5 bg-[#161b22] border-t border-[#30363d] flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>İpucu: Sorguyu düzenleyebilir veya doğrudan çalıştırabilirsiniz.</span>
        <span className="hidden sm:inline text-slate-400">Kısayol: Ctrl + Enter</span>
      </div>
    </div>
  );
};
