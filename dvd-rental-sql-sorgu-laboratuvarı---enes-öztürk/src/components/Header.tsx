import React from 'react';
import { Database, FileText, CheckCircle2, Award } from 'lucide-react';

interface HeaderProps {
  onOpenReport: () => void;
  onOpenDatabase: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReport,
  onOpenDatabase,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Database className="w-5 h-5" />
          </div>
          <button 
            onClick={() => onNavigate('scenarios')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-base font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
              DVD Rental SQL Laboratuvarı
            </span>
          </button>
        </div>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400 shrink-0">
          <button
            onClick={() => onNavigate('scenarios')}
            className={`cursor-pointer transition-colors whitespace-nowrap hover:text-white ${
              activeSection === 'scenarios' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Sorgu Senaryoları
          </button>
          <button
            onClick={onOpenDatabase}
            className="cursor-pointer transition-colors whitespace-nowrap hover:text-white"
          >
            Veri Tabloları (200 + 599)
          </button>
          <button
            onClick={() => onNavigate('venn')}
            className={`cursor-pointer transition-colors whitespace-nowrap hover:text-white ${
              activeSection === 'venn' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Küme Teorisi & Venn
          </button>
          <button
            onClick={() => onNavigate('theory')}
            className={`cursor-pointer transition-colors whitespace-nowrap hover:text-white ${
              activeSection === 'theory' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            MySQL Farkları
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReport}
            className="cursor-pointer px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-sm shadow-amber-500/10"
          >
            <FileText className="w-3.5 h-3.5 text-slate-900" />
            <span>Enes Öztürk Ödev Raporu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
