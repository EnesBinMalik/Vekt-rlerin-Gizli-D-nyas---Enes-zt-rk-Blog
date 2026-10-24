import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  Share2,
  Volume2,
  VolumeX,
  Layers,
  Gamepad2,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { LevelData } from '../types';
import { soundManager } from '../audio/soundManager';

interface UnityTopNavProps {
  levels: LevelData[];
  currentLevelId: string;
  onSelectLevel: (levelId: string) => void;
  isPlayMode: boolean;
  onTogglePlayMode: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
  onReset: () => void;
  onOpenGuide: () => void;
  onOpenSubmit: () => void;
  onOpenCommunity: () => void;
  onOpenCertificate: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const UnityTopNav: React.FC<UnityTopNavProps> = ({
  levels,
  currentLevelId,
  onSelectLevel,
  isPlayMode,
  onTogglePlayMode,
  isPaused,
  onTogglePause,
  onReset,
  onOpenGuide,
  onOpenSubmit,
  onOpenCommunity,
  onOpenCertificate,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="relative z-30 flex flex-wrap items-center justify-between px-3 py-2 bg-zinc-900/95 border-b border-zinc-800 text-zinc-200 select-none backdrop-blur-md">
      {/* Left: Branding & Enes Öztürk Signature Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700/80 shadow-xs">
          <div className="w-6 h-6 rounded bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center font-bold text-black text-xs">
            U
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs tracking-tight text-white">Zemin Lav Kaplı!</span>
              <span className="text-[10px] bg-red-950 text-red-300 border border-red-800/80 px-1.5 py-0.2 rounded font-mono uppercase tracking-wider">
                Unity 3D
              </span>
            </div>
          </div>
        </div>

        {/* Creator Signature Seal */}
        <div
          onClick={onOpenCertificate}
          className="cursor-pointer group flex items-center gap-1.5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/20 hover:from-amber-500/20 hover:to-orange-500/30 border border-amber-500/40 px-2.5 py-1 rounded-md transition-all shadow-xs"
          title="Enes Öztürk onaylı Unity projesi - Sertifikayı görüntüle"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-medium text-amber-200 flex items-center gap-1">
            İmzalı: <strong className="text-amber-300 font-semibold underline decoration-amber-500/40">Enes Öztürk</strong>
          </span>
          <CheckCircle2 className="w-3 h-3 text-amber-400 ml-0.5" />
        </div>

        {/* Level Preset Selector */}
        <div className="hidden lg:flex items-center gap-1.5 bg-zinc-800/80 px-2 py-1 rounded border border-zinc-700/60 text-xs">
          <FolderOpen className="w-3.5 h-3.5 text-zinc-400" />
          <select
            value={currentLevelId}
            onChange={(e) => onSelectLevel(e.target.value)}
            className="bg-transparent text-zinc-200 text-xs outline-none cursor-pointer pr-2 font-medium"
          >
            {levels.map((lvl) => (
              <option key={lvl.id} value={lvl.id} className="bg-zinc-900 text-zinc-100">
                {lvl.title} ({lvl.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center: Unity Play / Pause / Step Controls */}
      <div className="flex items-center gap-1 bg-zinc-950/80 p-1 rounded-lg border border-zinc-800 shadow-inner my-1 sm:my-0">
        <button
          onClick={onTogglePlayMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            isPlayMode
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 hover:bg-emerald-500'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
          }`}
          title={isPlayMode ? 'Düzenleme Moduna Dön (Scene View)' : 'Oyunu Başlat (Game View)'}
        >
          {isPlayMode ? (
            <>
              <Layers className="w-3.5 h-3.5" />
              <span>🛠️ Sahne Görünümü</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>▶ Oyunu Başlat</span>
            </>
          )}
        </button>

        {isPlayMode && (
          <button
            onClick={onTogglePause}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              isPaused ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
            title={isPaused ? 'Devam Et' : 'Duraklat'}
          >
            <Pause className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          onClick={onReset}
          className="p-1.5 rounded-md text-xs bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
          title="Topu ve Sahneyi Sıfırla (R)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Challenge Navigation & Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onOpenGuide}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded border border-zinc-700 transition-colors"
          title="Unity Challenge Rehberi (Aşama 1-2-3)"
        >
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Rehber</span>
        </button>

        <button
          onClick={onOpenCommunity}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded border border-zinc-700 transition-colors"
          title="Topluluk Galerisi & Gönderilenler"
        >
          <Share2 className="w-3.5 h-3.5 text-violet-400" />
          <span className="hidden md:inline">Topluluk</span>
        </button>

        <button
          onClick={onOpenSubmit}
          className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold rounded shadow-sm transition-all"
          title="Aşama 3: Ödevini Gönder"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Ödevi Gönder</span>
        </button>

        <button
          onClick={onToggleMute}
          className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded border border-zinc-700 transition-colors ml-1"
          title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>
    </header>
  );
};
