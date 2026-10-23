import React from 'react';
import { Database, Code2, Layers, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scenarios' | 'playground' | 'schema' | 'guide';
  setActiveTab: (tab: 'scenarios' | 'playground' | 'schema' | 'guide') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      {/* Üst Bar: Enes Öztürk İmzası ve Proje Başlığı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Başlık */}
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 text-white font-bold">
              <Database className="w-6 h-6" />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-black text-slate-950 ring-2 ring-slate-950">
                SQL
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                  DVD Rental MySQL Studio
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                  v8.0 MySQL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                4 Temel SQL Senaryosu, Canlı Sorgu Motoru ve Analiz Paneli
              </p>
            </div>
          </div>

          {/* Enes Öztürk İmza Rozeti (Öne Çıkan Geliştirici İmzası) */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-750 shadow-inner">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm">
                EÖ
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-200">
                    Enes Öztürk
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-amber-400/90 font-medium">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>İmzalı Özel Proje</span>
                </div>
              </div>
            </div>

            {/* Hızlı Veritabanı İstatistikleri */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 border-l border-slate-800 pl-3">
              <span className="inline-flex items-center gap-1">
                <strong className="text-slate-200">1,000</strong> Film
              </span>
              <span className="text-slate-700">•</span>
              <span className="inline-flex items-center gap-1">
                <strong className="text-slate-200">599</strong> Müşteri
              </span>
              <span className="text-slate-700">•</span>
              <span className="inline-flex items-center gap-1">
                <strong className="text-slate-200">600</strong> Şehir
              </span>
            </div>
          </div>
        </div>

        {/* Sekmeler (Tabs) */}
        <div className="flex items-center gap-1.5 mt-4 pt-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'scenarios'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>4 Senaryo & Sonuçlar</span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'playground'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>MySQL Çalışma Konsolu</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'schema'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Veri Tabanı Şeması & Tablolar</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'guide'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>SQL & MySQL Rehberi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
