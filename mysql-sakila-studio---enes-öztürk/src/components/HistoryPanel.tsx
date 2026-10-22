import React from 'react';
import { History, Play, Copy, Check, Terminal, Trash2 } from 'lucide-react';

export interface HistoryItem {
  id: string;
  sql: string;
  timestamp: string;
  success: boolean;
  rowCount: number;
  executionTimeMs: number;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onRerun: (sql: string) => void;
  onClearHistory: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onRerun,
  onClearHistory,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, sql: string) => {
    navigator.clipboard.writeText(sql);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-1">
              <span>Sorgu Geçmişi & Oturum Kayıtları</span>
              <span aria-hidden="true">·</span>
              <span>MySQL Client Audit</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Çalıştırılan SQL Sorguları ({history.length})
            </h1>
          </div>

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-800/80 text-xs font-medium text-slate-400 hover:text-rose-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Geçmişi Temizle</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <History className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <h3 className="text-sm font-medium text-slate-300">Henüz sorgu geçmişi bulunmuyor</h3>
            <p className="text-xs text-slate-400 mt-1">
              Çalıştırdığınız tüm SELECT, WHERE ve DDL sorguları burada listelenecektir.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map(item => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className={`w-2 h-2 rounded-full ${item.success ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    <span className="text-slate-300">{item.timestamp}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-sky-300">{item.rowCount} satır</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.executionTimeMs} ms</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.id, item.sql)}
                      className="cursor-pointer p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                      title="SQL Kopyala"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => onRerun(item.sql)}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-semibold transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Tekrar Çalıştır</span>
                    </button>
                  </div>
                </div>

                <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-sky-200 overflow-x-auto">
                  <code>{item.sql}</code>
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
