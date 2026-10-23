// ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU. © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.

/**
 * @file TacticalHud.tsx
 * @author Enes Öztürk
 * @description En üst %8 taktik kripto HUD: Kriptografik Uyum Faktörü, Aktif Exploit sayısı,
 * Veritabanı Bütünlüğü ve resmi "Enes Öztürk Yüce Hakim Kod Rozeti".
 */

import React from 'react';
import { Shield, Cpu, Activity, Award, Volume2, VolumeX, Sparkles, BookOpen } from 'lucide-react';

interface TacticalHudProps {
  coherencePercentage: number;
  exploitsCompiled: number;
  integrityLog: string;
  isOverdriveActive: boolean;
  overdriveTimeLeft: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenSpecs: () => void;
  onTriggerOverdrive: () => void;
}

export const TacticalHud: React.FC<TacticalHudProps> = ({
  coherencePercentage,
  exploitsCompiled,
  integrityLog,
  isOverdriveActive,
  overdriveTimeLeft,
  isMuted,
  onToggleMute,
  onOpenSpecs,
  onTriggerOverdrive,
}) => {
  const isCritical = coherencePercentage < 30;

  return (
    <header className="absolute top-0 left-0 right-0 z-20 pointer-events-none select-none">
      {/* Top Bar Container - 8% Height Profile */}
      <div className="w-full bg-gradient-to-b from-[#03060e]/95 via-[#040814]/85 to-transparent px-3 sm:px-6 pt-3 pb-5 border-b border-cyan-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 pointer-events-auto">
          {/* Left: Enes Öztürk Yüce Hakim Kod Rozeti */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative group">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg border-2 border-amber-400 bg-amber-950/40 glow-gold flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-orbitron font-extrabold text-xs sm:text-sm tracking-wide text-amber-300 text-glow-gold">
                  ENES ÖZTÜRK
                </span>
                <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[9px] font-mono rounded">
                  HAKİM MÜHÜR
                </span>
              </div>
              <div className="text-[10px] font-mono text-cyan-300/80 flex items-center gap-1">
                <span>ROZET #EO-2026-SOV</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-semibold">EGEMEN ÇEKİRDEK</span>
              </div>
            </div>
          </div>

          {/* Center: Main Metrics (Uyum Faktörü & Exploit) */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Uyum Faktörü Yüzdesi */}
            <div className="flex flex-col items-center sm:items-start min-w-[90px] sm:min-w-[140px]">
              <div className="flex items-center justify-between w-full text-[10px] font-mono mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-400" />
                  UYUM FAKTÖRÜ
                </span>
                <span className={`font-bold font-mono ${isCritical ? 'text-red-400' : 'text-cyan-300'}`}>
                  %{Math.round(coherencePercentage)}
                </span>
              </div>
              {/* Progress bar without pulsating animations */}
              <div className="w-full h-1.5 sm:h-2 bg-slate-900 border border-slate-700/60 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    isCritical
                      ? 'bg-gradient-to-r from-red-600 to-red-400'
                      : 'bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 glow-cyan'
                  }`}
                  style={{ width: `${Math.max(0, Math.min(100, coherencePercentage))}%` }}
                />
              </div>
            </div>

            {/* Derlenen Exploit Sayısı */}
            <div className="hidden xs:flex flex-col items-center sm:items-start px-2 sm:px-3 py-1 bg-black/40 border border-amber-500/30 rounded">
              <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-amber-400" />
                EXPLOIT SAYISI
              </span>
              <span className="font-orbitron font-bold text-amber-300 text-xs sm:text-sm">
                {exploitsCompiled} <span className="text-[9px] font-mono text-amber-400/70">PKT</span>
              </span>
            </div>

            {/* Overdrive Status Pill if Active */}
            {isOverdriveActive && (
              <div className="px-3 py-1 rounded bg-amber-500/20 border border-amber-400 glow-gold text-amber-300 flex items-center gap-2 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>OVERDRIVE: {overdriveTimeLeft.toFixed(1)}s</span>
              </div>
            )}
          </div>

          {/* Right: Technical Docs, Overdrive Quick Trigger & Audio */}
          <div className="flex items-center gap-2">
            {!isOverdriveActive && (
              <button
                onClick={onTriggerOverdrive}
                title="Öztürk Egemen Overdrive Başlat"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 text-amber-300 font-mono text-xs cursor-pointer active:scale-95 transition-all glow-gold"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>OVERDRIVE</span>
              </button>
            )}

            <button
              onClick={onOpenSpecs}
              title="Kapsamlı Teknik Sistemler Belgesi ve HLSL/C# Kodu"
              className="p-2 sm:px-3 sm:py-1.5 rounded bg-[#0a0f20] hover:bg-[#121a36] border border-cyan-600/50 text-cyan-300 flex items-center gap-1.5 text-xs font-mono cursor-pointer transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">TEKNİK BELGE</span>
            </button>

            <button
              onClick={onToggleMute}
              title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
              className="p-2 rounded bg-[#0a0f20] hover:bg-[#121a36] border border-slate-700 text-slate-300 cursor-pointer transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* Live Integrity Log Ticker */}
        <div className="max-w-7xl mx-auto mt-2 px-1 flex items-center justify-between text-[10px] font-mono text-slate-400/90 border-t border-slate-800/40 pt-1">
          <div className="flex items-center gap-2 truncate">
            <span className="text-amber-400 font-semibold">// ANA BİLGİSAYAR GÜNLÜĞÜ:</span>
            <span className="text-cyan-300/90 truncate">{integrityLog}</span>
          </div>
          <span className="hidden sm:inline text-slate-500 font-mono">
            GPU COMPUTE SHADER 120 FPS
          </span>
        </div>
      </div>
    </header>
  );
};
