import React from 'react';
import { Database, Film, ShieldCheck, Terminal, BookOpen, Layers, Award, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scenarios' | 'playground' | 'schema' | 'guide' | 'quiz';
  setActiveTab: (tab: 'scenarios' | 'playground' | 'schema' | 'guide' | 'quiz') => void;
  onRunAllScenarios: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunAllScenarios
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-xl">
      {/* Top Banner with Author Signature & Stats */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Author Badge */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-700/50 px-3 py-1 text-cyan-200 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Hazırlayan & İmza: </span>
              <strong className="text-white font-semibold tracking-wide">Enes Öztürk</strong>
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="hidden sm:flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>DB: <strong className="text-slate-200">PostgreSQL dvdrental</strong></span>
            <span>•</span>
            <span>Senaryolar: <strong className="text-emerald-400">5 / 5 Çözüldü</strong></span>
            <span>•</span>
            <span>Motor: <strong className="text-cyan-300">Canlı SQL Çalıştırıcı</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* App Title and Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white shadow-lg shadow-cyan-950">
            <Film className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-white tracking-tight">
                DVD Rental <span className="text-cyan-400">SQL Master</span>
              </h1>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                v2.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sorgu Senaryoları & İnteraktif Veri Tabanı Çözüm Paneli
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <nav className="flex items-center gap-1.5 overflow-x-auto p-1 rounded-xl bg-slate-900 border border-slate-800/80 text-xs font-medium">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              activeTab === 'scenarios'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>5 Senaryo</span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              activeTab === 'playground'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>SQL Terminali</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              activeTab === 'schema'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            <span>Şema & Tablolar</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              activeTab === 'guide'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Püf Noktaları</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              activeTab === 'quiz'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span>Quiz Testi</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
