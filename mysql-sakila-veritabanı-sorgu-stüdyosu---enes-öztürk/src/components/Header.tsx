import React from 'react';
import { Database, FileCode, CheckCircle2, Award, Download } from 'lucide-react';
import { AUTHOR_INFO } from '../data/sakilaDatabase';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenReport: () => void;
  onDownloadAllSql: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onOpenReport,
  onDownloadAllSql
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-[#0d1117] border-b border-[#30363d] sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark with database emblem */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#00758F]/20 border border-[#00758F]/50 flex items-center justify-center text-[#00758F] font-bold">
          <Database className="w-4 h-4 text-[#00758F]" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
            MySQL Sakila Studio
          </span>
          <span className="text-[11px] text-slate-400 font-mono tracking-tight">
            sakila_db · MySQL 8.4
          </span>
        </div>
      </div>

      {/* Zone 2: Clean single-line navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
        <button
          onClick={() => setActiveView('query-1')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            activeView === 'query-1' ? 'text-[#38bdf8] font-semibold border-b-2 border-[#38bdf8]' : ''
          }`}
        >
          1. Soru (En Uzun 5 Film)
        </button>
        <button
          onClick={() => setActiveView('query-2')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            activeView === 'query-2' ? 'text-[#38bdf8] font-semibold border-b-2 border-[#38bdf8]' : ''
          }`}
        >
          2. Soru (2. Beş Film)
        </button>
        <button
          onClick={() => setActiveView('query-3')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            activeView === 'query-3' ? 'text-[#38bdf8] font-semibold border-b-2 border-[#38bdf8]' : ''
          }`}
        >
          3. Soru (Müşteriler)
        </button>
        <button
          onClick={() => setActiveView('tables')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            activeView === 'tables' ? 'text-[#38bdf8] font-semibold border-b-2 border-[#38bdf8]' : ''
          }`}
        >
          Tablo Gezgini
        </button>
      </nav>

      {/* Zone 3: 1 primary action + Signature Lockup */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161b22] border border-[#30363d] text-xs">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">İmza:</span>
          <span className="font-semibold text-white tracking-wide">{AUTHOR_INFO.name}</span>
        </div>

        <button
          onClick={onOpenReport}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-lg transition-colors whitespace-nowrap"
        >
          <FileCode className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Çözüm Özeti</span>
        </button>

        <button
          onClick={onDownloadAllSql}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#00758F] hover:bg-[#008ca8] rounded-lg shadow-sm transition-colors whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span>.SQL İndir</span>
        </button>
      </div>
    </header>
  );
};
