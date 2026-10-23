import React from 'react';
import { Database, RotateCcw, Download, Sparkles } from 'lucide-react';

export type TabType = 'table' | 'updates' | 'deletes' | 'console' | 'sql-export' | 'schema';

interface TopBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onResetDatabase: () => void;
  onDownloadSql: () => void;
  employeeCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  onResetDatabase,
  onDownloadSql,
  employeeCount
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 h-16">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-white whitespace-nowrap">
              MySQL Studio · <span className="text-cyan-400 font-mono">test.employee</span>
            </div>
            <div className="text-xs text-slate-400">
              Geliştirici: <span className="text-slate-300 font-medium">Enes Öztürk</span>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('table')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'table'
                ? 'border-cyan-400 text-white'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            Tablo ({employeeCount} Kayıt)
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'updates'
                ? 'border-cyan-400 text-white'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            5x UPDATE İşlemi
          </button>
          <button
            onClick={() => setActiveTab('deletes')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'deletes'
                ? 'border-cyan-400 text-white'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            5x DELETE İşlemi
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'console'
                ? 'border-cyan-400 text-white'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            SQL Konsolu
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'schema'
                ? 'border-cyan-400 text-white'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            Tablo Şeması
          </button>
          <button
            onClick={() => setActiveTab('sql-export')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'sql-export'
                ? 'border-cyan-400 text-white'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            Tam .sql Dosyası
          </button>
        </nav>

        {/* Zone 3: Primary CTA action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onResetDatabase}
            title="Verileri Mockaroo ilk 50 kaydına sıfırla"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded-md hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Verileri Sıfırla (50)</span>
          </button>
          <button
            onClick={onDownloadSql}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.sql İndir</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 text-xs">
        {[
          { id: 'table', label: `Tablo (${employeeCount})` },
          { id: 'updates', label: '5x UPDATE' },
          { id: 'deletes', label: '5x DELETE' },
          { id: 'console', label: 'SQL Konsolu' },
          { id: 'schema', label: 'Şema' },
          { id: 'sql-export', label: '.sql Dosyası' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-3 py-1 rounded whitespace-nowrap text-xs font-medium ${
              activeTab === tab.id
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
