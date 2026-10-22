// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React from 'react';
import { ZoomIn, Scissors, Shuffle, Minimize2, Box, Sparkles, AlertCircle } from 'lucide-react';
import { FractalType } from '../types/engine';

interface BottomCommandDockProps {
  fractalType: FractalType;
  onChangeFractalType: (type: FractalType) => void;
  onExecuteZoom: () => void;
  onExecuteFracture: () => void;
  onExecuteMutate: () => void;
  onExecuteCollapse: () => void;
  onOpenRecursiveTrap: () => void;
  activeView: 'matrix' | 'recursive_trap';
  onSwitchView: (view: 'matrix' | 'recursive_trap') => void;
  infiltratorEnergy: number;
}

export const BottomCommandDock: React.FC<BottomCommandDockProps> = ({
  fractalType,
  onChangeFractalType,
  onExecuteZoom,
  onExecuteFracture,
  onExecuteMutate,
  onExecuteCollapse,
  onOpenRecursiveTrap,
  activeView,
  onSwitchView,
  infiltratorEnergy,
}) => {
  return (
    <footer className="w-full bg-[#030509]/95 backdrop-blur-md border-t border-amber-500/20 px-3 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs select-none z-30">
      {/* Left: View & Fractal Equation Selector */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
        {/* View Switcher: Matrix vs Recursive Trap Chamber */}
        <div className="flex items-center p-1 bg-slate-900/90 rounded-lg border border-slate-800">
          <button
            onClick={() => onSwitchView('matrix')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeView === 'matrix'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Physical Matrix
          </button>
          <button
            onClick={() => onSwitchView('recursive_trap')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'recursive_trap'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Mandelbrot Trap</span>
          </button>
        </div>

        {/* Equation Selector */}
        <div className="flex items-center gap-1">
          {(['mandelbox', 'mandelbulb', 'hybrid'] as FractalType[]).map((type) => (
            <button
              key={type}
              onClick={() => onChangeFractalType(type)}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase rounded border transition-colors cursor-pointer ${
                fractalType === type
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                  : 'border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {type === 'hybrid' ? 'Öztürk Spires' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Center & Right: 4 Core Sovereign Systemic Override Execution Modules */}
      <div className="grid grid-cols-4 gap-2 w-full sm:w-auto">
        {/* Module 1: ZOOM */}
        <button
          onClick={onExecuteZoom}
          title="Deep dive through wall textures into sub-castles"
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 active:scale-95 transition-all cursor-pointer shadow-sm group"
        >
          <ZoomIn className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="font-serif font-bold text-[11px] tracking-wider uppercase">
            Zoom
          </span>
        </button>

        {/* Module 2: FRACTURE */}
        <button
          onClick={onExecuteFracture}
          title="Shatter local mathematical matrix to create corridors & gather fragments"
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-purple-500/30 text-purple-300 active:scale-95 transition-all cursor-pointer shadow-sm group"
        >
          <Scissors className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          <span className="font-serif font-bold text-[11px] tracking-wider uppercase">
            Fracture
          </span>
        </button>

        {/* Module 3: MUTATE */}
        <button
          onClick={onExecuteMutate}
          title="Perturb Julia constants and fractal power"
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-amber-300 active:scale-95 transition-all cursor-pointer shadow-sm group"
        >
          <Shuffle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="font-serif font-bold text-[11px] tracking-wider uppercase">
            Mutate
          </span>
        </button>

        {/* Module 4: COLLAPSE */}
        <button
          onClick={onExecuteCollapse}
          title="Synthesize dimensional room manifold to shield the Mind-Core"
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-amber-300 active:scale-95 transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)] group"
        >
          <Minimize2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="font-serif font-bold text-[11px] tracking-wider uppercase">
            Collapse
          </span>
        </button>
      </div>
    </footer>
  );
};
