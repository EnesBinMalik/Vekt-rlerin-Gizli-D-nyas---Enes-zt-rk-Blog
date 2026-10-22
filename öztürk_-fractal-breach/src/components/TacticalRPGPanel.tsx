// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React from 'react';
import { motion } from 'motion/react';
import { X, Zap, Shield, Sparkles, Award, ArrowUp, Cpu } from 'lucide-react';
import { InfiltratorState } from '../types/engine';
import { soundEngine } from '../audio/ozturkSoundEngine';

interface TacticalRPGPanelProps {
  infiltrator: InfiltratorState;
  onUpgradeStat: (stat: 'breach' | 'energy' | 'shield') => void;
  onClose: () => void;
}

export const TacticalRPGPanel: React.FC<TacticalRPGPanelProps> = ({
  infiltrator,
  onUpgradeStat,
  onClose,
}) => {
  const canUpgradeBreach = infiltrator.quantumFragments >= 25;
  const canUpgradeEnergy = infiltrator.quantumFragments >= 20;
  const canUpgradeShield = infiltrator.sovereignCrests >= 2;

  const handleUpgrade = (stat: 'breach' | 'energy' | 'shield') => {
    soundEngine.triggerRewriteSuccess();
    onUpgradeStat(stat);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="relative w-full max-w-lg bg-[#03060c] border border-cyan-400/40 rounded-xl p-5 sm:p-7 shadow-[0_0_50px_rgba(6,182,212,0.25)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-cyan-500/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-cyan-200 uppercase tracking-wide">
                Neural Infiltrator Tactical Grid
              </h2>
              <p className="text-[11px] font-mono text-cyan-500">
                ENES ÖZTÜRK QUANTUM SPIRE ENHANCEMENTS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currency Strip (Zero-pill text typography) */}
        <div className="flex items-center justify-around py-3 px-4 mb-6 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400">Quantum Fragments:</span>
            <span className="font-bold text-purple-300 tabular-nums">{infiltrator.quantumFragments}</span>
          </div>
          <span className="text-slate-700" aria-hidden="true">|</span>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Sovereign Crests:</span>
            <span className="font-bold text-amber-300 tabular-nums">{infiltrator.sovereignCrests}</span>
          </div>
        </div>

        {/* Tactical Upgrades */}
        <div className="space-y-3.5 mb-6">
          {/* Upgrade 1: Breach Multiplier */}
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="font-serif font-bold text-xs uppercase text-slate-200">
                  Breach Multiplier
                </span>
                <span className="text-[11px] font-mono text-cyan-300 tabular-nums">
                  {infiltrator.breachMultiplier.toFixed(2)}x
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Increases damage to corporate data waves and harvest yield.
              </p>
            </div>
            <button
              onClick={() => handleUpgrade('breach')}
              disabled={!canUpgradeBreach}
              className={`px-3 py-2 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                canUpgradeBreach
                  ? 'bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 cursor-pointer'
                  : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>25 Frag</span>
            </button>
          </div>

          {/* Upgrade 2: Spire Max Energy */}
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="font-serif font-bold text-xs uppercase text-slate-200">
                  Spire Max Energy
                </span>
                <span className="text-[11px] font-mono text-purple-300 tabular-nums">
                  {infiltrator.maxEnergy} EP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Permits frequent matrix fractures and emergency room manifold synthesis.
              </p>
            </div>
            <button
              onClick={() => handleUpgrade('energy')}
              disabled={!canUpgradeEnergy}
              className={`px-3 py-2 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                canUpgradeEnergy
                  ? 'bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-200 cursor-pointer'
                  : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>20 Frag</span>
            </button>
          </div>

          {/* Upgrade 3: Sovereign Core Shield */}
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="font-serif font-bold text-xs uppercase text-slate-200">
                  Mind-Core Harmonic Shield
                </span>
                <span className="text-[11px] font-mono text-amber-300 tabular-nums">
                  Lvl {infiltrator.level}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Fortifies crystalline integrity against direct Data Wipe hits.
              </p>
            </div>
            <button
              onClick={() => handleUpgrade('shield')}
              disabled={!canUpgradeShield}
              className={`px-3 py-2 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                canUpgradeShield
                  ? 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 cursor-pointer'
                  : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>2 Crests</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-[11px] font-mono text-slate-500">
            // EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
