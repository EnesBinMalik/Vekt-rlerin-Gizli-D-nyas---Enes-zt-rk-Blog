import React from 'react';
import {
  Terminal,
  Layers,
  Columns,
  Code2,
  Users,
  Plus,
  RotateCcw,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export type ViewMode = 'SPLIT' | 'TERMINAL' | 'KANBAN';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onOpenAddModal: () => void;
  onOpenTeamModal: () => void;
  onOpenCodeModal: () => void;
  onReset: () => void;
  totalCards: number;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onOpenAddModal,
  onOpenTeamModal,
  onOpenCodeModal,
  onReset,
  totalCards,
}) => {
  return (
    <header className="bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 rounded-xl shadow-lg shadow-emerald-500/10 text-slate-950 font-black">
            <Terminal className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight">
                Console ToDo Uygulaması
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Enes Öztürk İmzasıyla
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              3 Kolonlu (TODO - IN PROGRESS - DONE) Nesne Yönelimli C# Mimari Simülasyonu
            </p>
          </div>
        </div>

        {/* View Switcher & Action Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Buttons */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('SPLIT')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                viewMode === 'SPLIT'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Konsol ve Kanban Panosu Yanyana"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bölünmüş</span>
            </button>
            <button
              onClick={() => setViewMode('TERMINAL')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                viewMode === 'TERMINAL'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tam Ekran C# Konsol Ekranı"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Konsol</span>
            </button>
            <button
              onClick={() => setViewMode('KANBAN')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                viewMode === 'KANBAN'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tam Ekran Görsel Kanban Pano"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Pano</span>
            </button>
          </div>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          {/* C# Source Code Button */}
          <button
            onClick={onOpenCodeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 hover:text-purple-100 rounded-xl text-xs font-semibold border border-purple-800/50 shadow-sm transition"
            title="C# Kaynak Kodunu Görüntüle (.cs)"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">C# Kodu</span>
          </button>

          {/* Team Members Button */}
          <button
            onClick={onOpenTeamModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 hover:text-indigo-100 rounded-xl text-xs font-semibold border border-indigo-800/50 shadow-sm transition"
            title="Takım Üyeleri Dictionary Koleksiyonu"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Takım</span>
          </button>

          {/* Quick Add Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Kart Ekle</span>
          </button>
        </div>
      </div>
    </header>
  );
};
