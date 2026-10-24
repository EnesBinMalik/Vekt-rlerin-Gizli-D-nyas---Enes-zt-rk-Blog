import React from 'react';
import { Volume2, VolumeX, BarChart2, HelpCircle, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  highScore: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenStats: () => void;
  onOpenAbout: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  highScore,
  soundEnabled,
  onToggleSound,
  onOpenStats,
  onOpenAbout,
  onGoHome,
}) => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => {
            soundManager.playClick();
            onGoHome();
          }}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1 -ml-1 transition"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-lg group-hover:scale-105 transition-transform">
            ?
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                TRIVIA
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                12s
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium leading-none">
              Enes Öztürk İmzalı
            </div>
          </div>
        </button>

        {/* High Score Widget & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* High Score Badge */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span className="text-slate-400 hidden sm:inline">En Yüksek:</span>
            <span className="font-mono-numbers font-bold text-amber-300">
              {highScore.toLocaleString('tr-TR')}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleSound();
            }}
            title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
            className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Ses Ayarı"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Stats Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenStats();
            }}
            title="İstatistikler ve Geçmiş"
            className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="İstatistikler"
          >
            <BarChart2 className="w-4 h-4 text-sky-400" />
          </button>

          {/* About / Rules */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAbout();
            }}
            title="Kurallar & Hakkında"
            className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Kurallar ve Hakkında"
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
