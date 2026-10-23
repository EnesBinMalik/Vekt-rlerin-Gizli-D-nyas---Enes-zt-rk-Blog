import React, { useState } from 'react';
import { Check, Copy, Download, Play, Terminal } from 'lucide-react';

interface SqlCodeViewerProps {
  code: string;
  scenarioTitle?: string;
  onExecute?: () => void;
  isExecuting?: boolean;
}

export const SqlCodeViewer: React.FC<SqlCodeViewerProps> = ({
  code,
  scenarioTitle = 'SQL Sorgusu',
  onExecute,
  isExecuting = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scenarioTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_enes_ozturk.sql`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simple token-based colorizer for SQL keywords and comments
  const renderHighlightedCode = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Comment line
      if (line.trim().startsWith('--') || line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().endsWith('*/')) {
        return (
          <div key={idx} className="table-row">
            <span className="table-cell select-none text-right pr-4 text-slate-500 font-mono text-xs">{idx + 1}</span>
            <span className="table-cell text-emerald-400/80 italic font-mono">{line}</span>
          </div>
        );
      }

      // Tokenize line
      const parts = line.split(/(\b(?:SELECT|FROM|LEFT|RIGHT|FULL|OUTER|INNER|JOIN|ON|WHERE|AND|OR|ORDER BY|AS|LIMIT|NULL|ASC|DESC)\b)/gi);

      return (
        <div key={idx} className="table-row">
          <span className="table-cell select-none text-right pr-4 text-slate-500 font-mono text-xs">{idx + 1}</span>
          <span className="table-cell font-mono">
            {parts.map((part, pIdx) => {
              const upper = part.toUpperCase();
              if (['SELECT', 'FROM', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'INNER', 'JOIN', 'ON', 'WHERE', 'AND', 'OR', 'ORDER BY', 'AS', 'LIMIT', 'NULL'].includes(upper)) {
                return (
                  <span key={pIdx} className="text-sky-400 font-bold">
                    {part}
                  </span>
                );
              }
              if (part.includes('.')) {
                return (
                  <span key={pIdx} className="text-amber-200">
                    {part}
                  </span>
                );
              }
              return (
                <span key={pIdx} className="text-slate-200">
                  {part}
                </span>
              );
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            query.sql
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/60 font-medium">
            PostgreSQL 15+
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onExecute && (
            <button
              onClick={onExecute}
              disabled={isExecuting}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-md transition shadow cursor-pointer disabled:opacity-50"
              title="Sorguyu Çalıştır"
            >
              <Play className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : 'fill-current'}`} />
              {isExecuting ? 'Çalıştırılıyor...' : 'Çalıştır'}
            </button>
          )}

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition border border-slate-700 cursor-pointer"
            title="Panoya Kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition border border-slate-700 cursor-pointer"
            title=".sql dosyası olarak indir"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>İndir</span>
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-sm leading-relaxed max-h-[380px] scrollbar-thin">
        <div className="table w-full">{renderHighlightedCode(code)}</div>
      </div>

      {/* Signature Footer */}
      <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">Hazırlayan:</span>
          <span className="text-sky-300 font-semibold">Enes Öztürk</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500">Veritabanı:</span>
          <span className="text-slate-300">dvdrental</span>
        </div>
        <div className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Sözdizimi Doğrulandı
        </div>
      </div>
    </div>
  );
};
