import React from 'react';
import { Database, Download, FileCode, Sparkles, BookOpen, Layers } from 'lucide-react';
import { FULL_SQL_SCRIPT_CONTENT } from '../data/scenarios';

interface HeaderProps {
  activeTab: 'scenarios' | 'schema' | 'playground' | 'theory';
  setActiveTab: (tab: 'scenarios' | 'schema' | 'playground' | 'theory') => void;
  onOpenFullScript: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenFullScript }) => {
  const handleDownloadAll = () => {
    const blob = new Blob([FULL_SQL_SCRIPT_CONTENT], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dvdrental_join_sorgulari_enes_ozturk.sql`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Main Title */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-sky-950 ring-1 ring-sky-400/30 flex-shrink-0">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  dvdrental <span className="text-sky-400">SQL JOIN</span> Çözümleri
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                  PostgreSQL
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>city & country (LEFT) • customer & payment (RIGHT) • customer & rental (FULL)</span>
              </p>
            </div>
          </div>

          {/* Author Badge & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Prominent Enes Öztürk Signature Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-950/70 via-slate-800 to-indigo-950/70 border border-sky-500/40 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                  Hazırlayan & İmza
                </div>
                <div className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-white">
                  Enes Öztürk
                </div>
              </div>
            </div>

            {/* View Full Script Modal Button */}
            <button
              onClick={onOpenFullScript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-sky-400" />
              <span>Tam SQL Dosyası</span>
            </button>

            {/* Direct Download .sql */}
            <button
              onClick={handleDownloadAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-md shadow-sky-900/30 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>.sql İndir</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto border-t border-slate-800/80 pt-1 -mb-px scrollbar-none">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'scenarios'
                ? 'border-sky-400 text-sky-400 font-semibold bg-sky-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            3 Senaryo & Sonuçlar
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'playground'
                ? 'border-sky-400 text-sky-400 font-semibold bg-sky-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Database className="w-4 h-4" />
            İnteraktif JOIN Laboratuvarı
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'schema'
                ? 'border-sky-400 text-sky-400 font-semibold bg-sky-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            dvdrental Tablo Şemaları (5 Tablo)
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'theory'
                ? 'border-sky-400 text-sky-400 font-semibold bg-sky-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            JOIN Rehberi & Karşılaştırma
          </button>
        </div>
      </div>
    </header>
  );
};
