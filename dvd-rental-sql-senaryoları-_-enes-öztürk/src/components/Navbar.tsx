import React from 'react';
import { Database, FileText, Code2, Film, Layers, CheckCircle } from 'lucide-react';
import { AUTHOR_INFO } from '../data/dvdrentalData';

interface NavbarProps {
  activeTab: 'scenarios' | 'editor' | 'database' | 'schema';
  setActiveTab: (tab: 'scenarios' | 'editor' | 'database' | 'schema') => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenReport }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('scenarios'); }} className="text-base font-bold tracking-tight text-white hover:text-blue-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2">
              <span>DVD Rental SQL</span>
              <span className="text-slate-500 font-normal">/</span>
              <span className="text-slate-400 font-medium text-xs hidden sm:inline">{AUTHOR_INFO.name}</span>
            </a>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Single-line text links) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'scenarios'
                ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Sorgu Senaryoları</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>İnteraktif SQL</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'database'
                ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Film className="w-4 h-4 text-purple-400" />
            <span>film Tablosu (1.000)</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeTab === 'schema'
                ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Database className="w-4 h-4 text-amber-400" />
            <span>Şema & Tipler</span>
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReport}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm shadow-blue-500/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>İmzalı Rapor ({AUTHOR_INFO.name})</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="md:hidden border-t border-slate-800 bg-slate-950 px-3 py-2 flex items-center justify-between gap-1 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap ${activeTab === 'scenarios' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
        >
          Senaryolar
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap ${activeTab === 'editor' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
        >
          SQL Editörü
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap ${activeTab === 'database' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
        >
          Film Tablosu
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap ${activeTab === 'schema' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
        >
          Şema
        </button>
      </div>
    </header>
  );
};
