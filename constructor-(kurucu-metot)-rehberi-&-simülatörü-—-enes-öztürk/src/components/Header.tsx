import React from 'react';
import { Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onQuickSimulate: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onQuickSimulate,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('theory');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:text-cyan-300 transition-colors"
        >
          <span className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </span>
          <span>ConstructorLab</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('theory')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'theory'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ders Notları
          </button>
          <button
            onClick={() => onSelectTab('memory')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'memory'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bellek Simülatörü
          </button>
          <button
            onClick={() => onSelectTab('overload')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'overload'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Aşırı Yükleme (Overload)
          </button>
          <button
            onClick={() => onSelectTab('pitfalls')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'pitfalls'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3 Altın Kural & Tuzaklar
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'quiz'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Kendini Sına
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onQuickSimulate}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-500/20 active:scale-95"
          >
            Bellek Simülasyonunu Başlat
          </button>
        </div>
      </div>
    </header>
  );
};
