import React from 'react';
import { Database, Play, BookOpen, Layers, Sparkles, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: 'editor' | 'assignments' | 'tables' | 'simulator';
  setActiveTab: (tab: 'editor' | 'assignments' | 'tables' | 'simulator') => void;
  onExecute: () => void;
  isExecuting?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onExecute,
  isExecuting = false
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-[#0e1420] border-b border-slate-800/80 sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Database className="w-4 h-4" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold tracking-tight text-white whitespace-nowrap">
            Enes Öztürk MySQL Studio
          </span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            sakila_db
          </span>
        </div>
      </div>

      {/* Zone 2: Concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('assignments')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'assignments' ? 'text-emerald-400 font-semibold' : 'hover:text-white text-slate-400'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ödev Çözümleri (4 Görev)</span>
        </button>

        <button
          onClick={() => setActiveTab('editor')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'editor' ? 'text-emerald-400 font-semibold' : 'hover:text-white text-slate-400'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>SQL Stüdyosu</span>
        </button>

        <button
          onClick={() => setActiveTab('tables')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'tables' ? 'text-emerald-400 font-semibold' : 'hover:text-white text-slate-400'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Tablo Şemaları</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'simulator' ? 'text-emerald-400 font-semibold' : 'hover:text-white text-slate-400'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>LIKE Laboratuvarı</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onExecute}
          disabled={isExecuting}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-98 rounded-md transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          title="Sorguyu Yürüt (Ctrl + Enter)"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isExecuting ? 'Yürütülüyor...' : 'Sorguyu Çalıştır'}</span>
        </button>
      </div>
    </header>
  );
};
