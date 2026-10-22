import React from 'react';
import { Database, Play, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeView: 'editor' | 'homework' | 'schema' | 'history';
  setActiveView: (view: 'editor' | 'homework' | 'schema' | 'history') => void;
  onRunCurrentQuery: () => void;
  onOpenAboutModal: () => void;
  isExecuting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onRunCurrentQuery,
  onOpenAboutModal,
  isExecuting,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-900 border-b border-slate-800 text-slate-100 select-none">
      {/* Zone 1: Single Brand Wordmark with MySQL Sakila Studio */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
          <Database className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
            MySQL Studio <span className="text-sky-400 font-medium">Sakila</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            localhost:3306 · sakila_db
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links (Single-line whitespace-nowrap) */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => setActiveView('editor')}
          className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeView === 'editor'
              ? 'text-white border-sky-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          SQL Editörü & Konsol
        </button>
        <button
          onClick={() => setActiveView('homework')}
          className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 flex items-center gap-1.5 ${
            activeView === 'homework'
              ? 'text-white border-sky-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Ödev & Görev Çözümleri</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 bg-sky-500/20 text-sky-300 rounded border border-sky-500/30">
            3 Görev
          </span>
        </button>
        <button
          onClick={() => setActiveView('schema')}
          className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeView === 'schema'
              ? 'text-white border-sky-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Tablo Şemaları (DDL)
        </button>
        <button
          onClick={() => setActiveView('history')}
          className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeView === 'history'
              ? 'text-white border-sky-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Sorgu Geçmişi
        </button>
      </nav>

      {/* Zone 3: Primary Action & Enes Öztürk Signature Badge */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenAboutModal}
          className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-amber-300 transition-colors whitespace-nowrap shrink-0"
          title="Enes Öztürk İmzalı Proje Bilgisi"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Enes Öztürk İmzalı</span>
        </button>

        <button
          onClick={onRunCurrentQuery}
          disabled={isExecuting}
          className="cursor-pointer flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-md shadow-sm transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Sorguyu Çalıştır</span>
        </button>
      </div>
    </header>
  );
};
