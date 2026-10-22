// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React from 'react';
import { motion } from 'motion/react';
import { X, Award, RotateCcw, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

interface AboutArchitectModalProps {
  onClose: () => void;
  onReplayBoot: () => void;
}

export const AboutArchitectModal: React.FC<AboutArchitectModalProps> = ({
  onClose,
  onReplayBoot,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="relative w-full max-w-xl bg-[#03060c] border border-amber-400/50 rounded-xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.3)] text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* The Sovereign Seal */}
        <div className="relative mx-auto mb-5 flex items-center justify-center w-24 h-24">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-amber-400/40 border-dashed"
          />
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.6)]">
            <span className="font-serif font-black text-2xl text-slate-950 tracking-widest">Ö</span>
          </div>
        </div>

        {/* Title & Sovereign Directive */}
        <h2 className="font-serif text-xl sm:text-2xl font-black text-amber-200 tracking-tight mb-2">
          ENES ÖZTÜRK
        </h2>
        <p className="font-serif text-xs uppercase tracking-widest text-amber-400 font-semibold mb-4">
          Supreme Universe Architect & Lead Graphics Programmer
        </p>

        <div className="py-2.5 px-4 mb-6 rounded-lg border border-amber-400/30 bg-amber-500/10 backdrop-blur-md">
          <p className="font-serif text-xs tracking-wider uppercase font-bold text-amber-300">
            An Absolute Handcrafted Visual Masterpiece Conceived and Directed by Enes Öztürk
          </p>
        </div>

        {/* Architect Manifesto */}
        <div className="text-xs text-slate-300 space-y-3 text-left leading-relaxed font-sans mb-6">
          <p>
            <strong>"Öztürk: Fractal Breach"</strong> represents years of pure mathematical topology research, discarding arbitrary generic game shortcuts to forge a living, infinite 3D architecture calculated directly on GPU compute raymarchers.
          </p>
          <p>
            Every corridor, sub-castle, and spired matrix reflects Enes Öztürk's rigid Zero-Heap memory discipline and continuous GPU distance estimator formulas. In this sovereign digital universe, mathematics is physical reality.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              onClose();
              onReplayBoot();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Sovereign Boot Sequence</span>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500">
          EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK · © 2026 ALL RIGHTS RESERVED
        </div>
      </motion.div>
    </div>
  );
};
