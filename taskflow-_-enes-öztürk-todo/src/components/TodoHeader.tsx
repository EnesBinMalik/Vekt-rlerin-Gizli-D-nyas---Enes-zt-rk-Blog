import React from 'react';
import { CheckCircle2, Volume2, VolumeX, Sparkles, HelpCircle, Calendar } from 'lucide-react';

interface TodoHeaderProps {
  activeCount: number;
  totalCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenProjectInfo: () => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({
  activeCount,
  totalCount,
  soundEnabled,
  onToggleSound,
  onOpenProjectInfo,
}) => {
  // Format current date in Turkish
  const today = new Intl.DateTimeFormat('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  const completedCount = totalCount - activeCount;

  return (
    <header className="mb-8">
      {/* Top utility row */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span className="capitalize">{today}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-indigo-400 font-medium">Enes Öztürk</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Sesi kapat' : 'Sesi aç'}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"
            aria-label="Ses efektlerini aç/kapat"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="hidden sm:inline text-[11px]">
              {soundEnabled ? 'Ses Açık' : 'Sessiz'}
            </span>
          </button>

          <button
            onClick={onOpenProjectInfo}
            className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Ödev Detayları</span>
          </button>
        </div>
      </div>

      {/* Main title & active count showcase */}
      <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Görev Takip Sistemi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            TO DO Listesi
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Hedeflerinizi düzenleyin, tamamlayın veya basılı tutarak silin.
          </p>
        </div>

        {/* Highlighted Active Count Badge (Strict requirement: Sadece aktif kalan todoları gösterir) */}
        <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3.5 px-5 shadow-sm">
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Kalan Aktif Görev
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {completedCount} tamamlandı / {totalCount} toplam
            </div>
          </div>
          <div className="flex items-center justify-center min-w-12 h-12 px-3 rounded-xl bg-indigo-600 text-white font-mono font-bold text-2xl shadow-inner tabular-nums">
            {activeCount}
          </div>
        </div>
      </div>
    </header>
  );
};
