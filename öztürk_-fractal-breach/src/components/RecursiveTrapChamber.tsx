// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, Key, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { soundEngine } from '../audio/ozturkSoundEngine';

interface RecursiveTrapChamberProps {
  onResolveTrap: (crests: number, fragments: number) => void;
  onExit: () => void;
}

export const RecursiveTrapChamber: React.FC<RecursiveTrapChamberProps> = ({
  onResolveTrap,
  onExit,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Puzzle State
  const [depthLayer, setDepthLayer] = useState(1);
  const [targetReal] = useState(-0.70176);
  const [targetImag] = useState(-0.3842);
  const [sliderReal, setSliderReal] = useState(-0.75);
  const [sliderImag, setSliderImag] = useState(-0.25);
  const [isResolved, setIsResolved] = useState(false);

  // Compute Resonance alignment percentage
  const dist = Math.hypot(sliderReal - targetReal, sliderImag - targetImag);
  const resonance = Math.max(0, Math.min(100, (1 - dist / 0.35) * 100));

  // Render 2D Fractal Julia / Mandelbrot Topology Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 360);
    const height = (canvas.height = 360);
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    const maxIter = 40 + depthLayer * 15;
    const cr = sliderReal;
    const ci = sliderImag;

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        let zx = 1.5 * (px - width / 2) / (0.5 * width);
        let zy = (py - height / 2) / (0.5 * height);

        let i = maxIter;
        while (zx * zx + zy * zy < 4 && i > 0) {
          const tmp = zx * zx - zy * zy + cr;
          zy = 2.0 * zx * zy + ci;
          zx = tmp;
          i--;
        }

        const pIndex = (py * width + px) * 4;
        if (i === 0) {
          // Inside set: Obsidian cyber-gothic
          data[pIndex] = 4;
          data[pIndex + 1] = 6;
          data[pIndex + 2] = 10;
          data[pIndex + 3] = 255;
        } else {
          // Edge gradient: Neon-cyan to gold based on resonance
          const factor = (maxIter - i) / maxIter;
          const isGold = resonance > 85;
          data[pIndex] = isGold ? Math.floor(245 * factor) : Math.floor(6 * factor);
          data[pIndex + 1] = isGold ? Math.floor(158 * factor) : Math.floor(182 * factor);
          data[pIndex + 2] = isGold ? Math.floor(11 * factor) : Math.floor(212 * factor);
          data[pIndex + 3] = 255;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [sliderReal, sliderImag, depthLayer, resonance]);

  const handleStepForward = () => {
    // Walking forward without solving causes the player to shrink into a deeper identical clone!
    if (resonance < 92) {
      soundEngine.triggerFracturePulse();
      setDepthLayer((prev) => prev + 1);
    } else {
      handleBreakLoop();
    }
  };

  const handleBreakLoop = () => {
    if (isResolved) return;
    setIsResolved(true);
    soundEngine.triggerTrapResolved();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#06b6d4', '#a855f7'],
    });
    setTimeout(() => {
      onResolveTrap(3, 45);
    }, 1200);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#020509] select-none overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#040810] border border-purple-500/30 rounded-xl p-5 sm:p-7 shadow-[0_0_40px_rgba(168,85,247,0.18)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400 animate-spin-slow" />
            <div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-purple-200 uppercase tracking-wide">
                Infinite Recursive Mandelbrot Chamber
              </h2>
              <p className="text-[11px] font-mono text-purple-400">
                ENES ÖZTÜRK ROOT SEED TOPOLOGICAL LOOP DECODER
              </p>
            </div>
          </div>
          <button
            onClick={onExit}
            className="px-3 py-1.5 text-xs font-mono rounded bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
          >
            Exit Chamber
          </button>
        </div>

        {/* Status Alert */}
        <div className="mb-5 p-3 rounded-lg bg-purple-950/30 border border-purple-500/30 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-purple-300">
            <AlertTriangle className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              Recursive Loop Depth: <strong className="text-amber-300 font-bold">k = {depthLayer}</strong> (Microscopic Clone)
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            zₙ₊₁ = zₙ² + c
          </span>
        </div>

        {/* Main Chamber Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-6">
          {/* Canvas Viewport */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-lg border border-purple-500/40 overflow-hidden shadow-inner bg-black">
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
              {/* Overlay Crosshair */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-8 h-8 border border-white/20 rounded-full" />
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-2">
              Julia Parameter Field: c = {sliderReal.toFixed(4)} + {sliderImag.toFixed(4)}i
            </span>
          </div>

          {/* Reasoning & Parameter Tuning */}
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Walking through this corridor causes infinite microscopic recursive loops. Adjust the root seed eigenvalues to harmonize the topological field and break the recursion.
            </p>

            {/* Slider 1: Real Component */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Root Seed Re(c):</span>
                <span className="text-cyan-300 tabular-nums font-semibold">{sliderReal.toFixed(4)}</span>
              </div>
              <input
                type="range"
                min="-1.2"
                max="0.0"
                step="0.005"
                value={sliderReal}
                onChange={(e) => setSliderReal(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Slider 2: Imaginary Component */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Root Seed Im(c):</span>
                <span className="text-purple-300 tabular-nums font-semibold">{sliderImag.toFixed(4)}</span>
              </div>
              <input
                type="range"
                min="-0.8"
                max="0.2"
                step="0.005"
                value={sliderImag}
                onChange={(e) => setSliderImag(parseFloat(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            {/* Resonance Gauge */}
            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-400">Harmonic Resonance:</span>
                <span
                  className={`font-bold tabular-nums ${
                    resonance >= 92 ? 'text-amber-300' : 'text-slate-300'
                  }`}
                >
                  {resonance.toFixed(1)}% {resonance >= 92 ? '· ALIGNED' : ''}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-150 ${
                    resonance >= 92
                      ? 'bg-gradient-to-r from-cyan-400 via-amber-400 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                      : 'bg-purple-600'
                  }`}
                  style={{ width: `${resonance}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Walk Forward */}
          <button
            onClick={handleStepForward}
            disabled={isResolved}
            className="w-full sm:flex-1 py-3 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-serif text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <span>Walk Forward into Corridor</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Break Infinite Loop (Available when resonance is aligned) */}
          <button
            onClick={handleBreakLoop}
            disabled={resonance < 92 || isResolved}
            className={`w-full sm:flex-1 py-3 px-4 rounded-lg font-serif font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              resonance >= 92 && !isResolved
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.6)] cursor-pointer hover:scale-102 active:scale-98'
                : 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>{isResolved ? 'Loop Shattered!' : 'Break Recursive Loop'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
