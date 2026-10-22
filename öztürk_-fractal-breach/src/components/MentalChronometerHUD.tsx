// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React from 'react';
import { Volume2, VolumeX, Shield, Activity, Award, FileCode, Zap, Trophy } from 'lucide-react';
import { MindCoreState, InfiltratorState } from '../types/engine';
import { soundEngine } from '../audio/ozturkSoundEngine';

interface MentalChronometerHUDProps {
  mindCore: MindCoreState;
  infiltrator: InfiltratorState;
  fps: number;
  onOpenArchitectBadge: () => void;
  onOpenTechDocs: () => void;
  onOpenLeaderboard: () => void;
  onOpenTacticalRPG: () => void;
  onToggleSound: () => void;
  isMuted: boolean;
}

export const MentalChronometerHUD: React.FC<MentalChronometerHUDProps> = ({
  mindCore,
  infiltrator,
  fps,
  onOpenArchitectBadge,
  onOpenTechDocs,
  onOpenLeaderboard,
  onOpenTacticalRPG,
  onToggleSound,
  isMuted,
}) => {
  const isAlarm = mindCore.integrity < 35;

  return (
    <header className="w-full bg-[#04060a]/90 backdrop-blur-md border-b border-amber-500/20 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-6 text-xs select-none z-30 transition-colors">
      {/* Left Zone: Spatial Cohesion & Real-time Metrics */}
      <div className="flex items-center gap-3 sm:gap-5 min-w-0">
        {/* Architect Badge Button */}
        <button
          onClick={onOpenArchitectBadge}
          title="Inspect Enes Öztürk Sovereign Universe Architect Seal"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 transition-all cursor-pointer group shrink-0"
        >
          <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="font-serif font-bold text-[11px] sm:text-xs tracking-wider uppercase hidden md:inline">
            Enes Öztürk Architect
          </span>
          <span className="font-serif font-bold text-[11px] md:hidden">
            ÖZTÜRK
          </span>
        </button>

        {/* Spatial Cohesion Factor */}
        <div className="flex items-baseline gap-1.5 text-slate-400 whitespace-nowrap">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500">Cohesion</span>
          <span className="font-mono tabular-nums font-semibold text-cyan-300 text-xs sm:text-sm">
            {mindCore.cohesionFactor.toFixed(1)}%
          </span>
        </div>

        <span className="text-slate-700 hidden sm:inline" aria-hidden="true">/</span>

        {/* Active Fractal Depth */}
        <div className="flex items-baseline gap-1.5 text-slate-400 whitespace-nowrap">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500">Depth</span>
          <span className="font-mono tabular-nums font-semibold text-amber-300 text-xs sm:text-sm">
            {infiltrator.depth >= 1000 ? `${(infiltrator.depth / 1000).toFixed(1)}k` : infiltrator.depth.toFixed(1)}x
          </span>
        </div>

        <span className="text-slate-700 hidden lg:inline" aria-hidden="true">/</span>

        {/* FPS Counter (Flagship 120 FPS Benchmark) */}
        <div className="hidden lg:flex items-baseline gap-1.5 text-slate-400 whitespace-nowrap">
          <span className="text-[10px] uppercase tracking-wider text-slate-500">GPU</span>
          <span className="font-mono tabular-nums text-emerald-400 text-xs">
            {fps} FPS
          </span>
        </div>
      </div>

      {/* Center Zone: The Öztürk Sovereign Mind-Core Stability Bar */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-2 flex flex-col justify-center">
        <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1 font-mono">
          <div className="flex items-center gap-1.5">
            <Activity className={`w-3.5 h-3.5 ${isAlarm ? 'text-red-400 animate-pulse' : 'text-amber-400'}`} />
            <span className="text-slate-300 font-semibold tracking-wide">MIND-CORE STABILITY</span>
          </div>
          <span className={`font-semibold tabular-nums ${isAlarm ? 'text-red-400' : 'text-amber-300'}`}>
            {mindCore.integrity.toFixed(0)}%
          </span>
        </div>
        <div className="w-full h-1.5 sm:h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isAlarm
                ? 'bg-gradient-to-r from-red-600 to-amber-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                : 'bg-gradient-to-r from-cyan-400 via-amber-400 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
            }`}
            style={{ width: `${Math.max(0, Math.min(100, mindCore.integrity))}%` }}
          />
        </div>
      </div>

      {/* Right Zone: Tactical Actions, Leaderboard, Tech Docs, Sound Toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Tactical RPG Panel Trigger */}
        <button
          onClick={onOpenTacticalRPG}
          title="Open Tactical RPG Infiltrator Grid"
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-[11px] hidden sm:inline tabular-nums">
            LVL {infiltrator.level}
          </span>
        </button>

        {/* Global Topological Speedrun Leaderboard */}
        <button
          onClick={onOpenLeaderboard}
          title="Global Topological Speedrun Leaderboards"
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-[11px] hidden md:inline">Topological Ranks</span>
        </button>

        {/* Technical Systems & HLSL/C# Source Engine */}
        <button
          onClick={onOpenTechDocs}
          title="Inspect Enes Öztürk HLSL Shader & C# Architecture Document"
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <FileCode className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-[11px] hidden md:inline">HLSL / C# Code</span>
        </button>

        {/* Spatial Audio Synthesizer Toggle */}
        <button
          onClick={onToggleSound}
          title={isMuted ? 'Unmute Spatial Synthesizer' : 'Mute Spatial Synthesizer'}
          className={`p-1.5 rounded border transition-colors cursor-pointer ${
            isMuted
              ? 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
              : 'bg-amber-500/15 border-amber-400/40 text-amber-300 hover:bg-amber-500/25'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
