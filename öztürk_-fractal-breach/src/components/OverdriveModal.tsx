// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Crosshair, Box, BatteryCharging, Zap, X, Terminal } from 'lucide-react';
import { EnemyProjectile } from '../types/engine';
import { soundEngine } from '../audio/ozturkSoundEngine';

interface OverdriveModalProps {
  projectile: EnemyProjectile;
  onClose: () => void;
  onConfirmRewrite: (projectileId: string, rewriteType: 'turret' | 'room' | 'battery') => void;
}

export const OverdriveModal: React.FC<OverdriveModalProps> = ({
  projectile,
  onClose,
  onConfirmRewrite,
}) => {
  const [selectedOption, setSelectedOption] = useState<'turret' | 'room' | 'battery'>('turret');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleRewrite = (type: 'turret' | 'room' | 'battery') => {
    setIsSynthesizing(true);
    soundEngine.triggerRewriteSuccess();
    setTimeout(() => {
      onConfirmRewrite(projectile.id, type);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-[#03060c] border border-cyan-400/60 rounded-xl p-5 sm:p-7 shadow-[0_0_50px_rgba(6,182,212,0.35)] overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-cyan-500/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-400/40 text-cyan-300">
              <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif font-black text-sm sm:text-base text-cyan-200 uppercase tracking-wider">
                Atomic Geometry Code Rewrite
              </h2>
              <p className="text-[11px] font-mono text-cyan-500">
                ENES ÖZTÜRK VECTOR MANIFOLD TRANSFORMATION MATRIX
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

        {/* Atomic Geometry Wireframe & Telemetry */}
        <div className="mb-6 p-4 rounded-lg bg-slate-950/80 border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Wireframe Preview Graphic */}
          <div className="relative h-28 flex items-center justify-center rounded border border-cyan-500/20 bg-cyan-950/20 overflow-hidden">
            <div className="absolute inset-0 bg-grid-cyan-500/[0.05] bg-[size:12px_12px]" />
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border border-cyan-400/60 rotate-45 flex items-center justify-center"
            >
              <div className="w-8 h-8 border border-amber-400/70 -rotate-45" />
            </motion.div>
            <span className="absolute bottom-1 right-2 font-mono text-[9px] text-cyan-400/70">
              SIGNATURE: {projectile.atomicSignature}
            </span>
          </div>

          {/* Atomic Mathematical State */}
          <div className="text-[11px] font-mono space-y-1.5 text-slate-400">
            <div className="flex justify-between">
              <span>Target:</span>
              <span className="text-cyan-300 font-semibold uppercase">{projectile.type.replace(/_/g, ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span>Vector Frequency:</span>
              <span className="text-amber-300 font-semibold tabular-nums">{projectile.frequency.toFixed(2)} THz</span>
            </div>
            <div className="flex justify-between">
              <span>Kinetic Damage:</span>
              <span className="text-red-400 font-semibold tabular-nums">-{projectile.damage} HP</span>
            </div>
            <div className="flex justify-between">
              <span>Vector Coord:</span>
              <span className="text-slate-300 tabular-nums">
                [{projectile.position.map((v) => v.toFixed(1)).join(', ')}]
              </span>
            </div>
          </div>
        </div>

        {/* 3 Rewrite Transformation Options */}
        <div className="space-y-3 mb-6">
          {/* Option A: Sovereign Flak Turret */}
          <button
            onClick={() => setSelectedOption('turret')}
            className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
              selectedOption === 'turret'
                ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="p-2 rounded bg-amber-500/10 border border-amber-400/30 text-amber-300 shrink-0 mt-0.5">
              <Crosshair className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs uppercase text-amber-300">
                  Defensive Sovereign Flak Turret
                </span>
                <span className="text-[10px] font-mono text-amber-400/80">FORMULA: ∇Φ × v₀</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Converts projectile kinetic trajectory into an autonomous defensive turret that intercepts incoming threats.
              </p>
            </div>
          </button>

          {/* Option B: Massive Room Manifold */}
          <button
            onClick={() => setSelectedOption('room')}
            className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
              selectedOption === 'room'
                ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 shrink-0 mt-0.5">
              <Box className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs uppercase text-cyan-300">
                  Extrude Structural Room Manifold
                </span>
                <span className="text-[10px] font-mono text-cyan-400/80">FORMULA: M³ = ∂Ω ∩ f(x)</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Extrudes an architectural chamber around the vector point, creating structural physical armor around the Mind-Core.
              </p>
            </div>
          </button>

          {/* Option C: Quantum Resonance Battery */}
          <button
            onClick={() => setSelectedOption('battery')}
            className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
              selectedOption === 'battery'
                ? 'bg-purple-500/15 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="p-2 rounded bg-purple-500/10 border border-purple-400/30 text-purple-300 shrink-0 mt-0.5">
              <BatteryCharging className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs uppercase text-purple-300">
                  Synthesize Quantum Resonance Battery
                </span>
                <span className="text-[10px] font-mono text-purple-400/80">FORMULA: ℏω₀ ∑|ψ|²</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Dissolves the corporate code payload to instantly replenish +20% Mind-Core Stability and +35 Spire Energy.
              </p>
            </div>
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={() => handleRewrite(selectedOption)}
          disabled={isSynthesizing}
          className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 via-amber-400 to-amber-300 text-slate-950 font-serif font-black text-xs uppercase tracking-wider rounded-lg shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] cursor-pointer active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {isSynthesizing ? 'Executing Mathematical Vector Rewrite...' : 'Execute Sovereign Array Rewrite'}
        </button>
      </motion.div>
    </div>
  );
};
