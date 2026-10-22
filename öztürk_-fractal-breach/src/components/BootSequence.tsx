// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../audio/ozturkSoundEngine';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<'fractal_sweep' | 'emblem_reveal' | 'ready'>('fractal_sweep');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animId: number;
    let startTime = performance.now();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const render = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      setProgress(Math.min(100, Math.floor((elapsed / 4.5) * 100)));

      // Silent abstract Mandelbrot camera sweep
      ctx.fillStyle = '#05070a';
      ctx.fillRect(0, 0, width, height);

      const zoom = Math.exp(elapsed * 1.6);
      const centerX = -0.743643887037158704752191506114774;
      const centerY = 0.131825904205311970493132056385139;

      const lines = 120;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < lines; i++) {
        const angle = (i / lines) * Math.PI * 2 + elapsed * 0.4;
        const radius = (Math.sin(elapsed * 2.0 + i * 0.1) * 0.4 + 0.6) * (Math.min(width, height) * 0.42);

        const x = width / 2 + Math.cos(angle) * radius;
        const y = height / 2 + Math.sin(angle) * radius;

        // Neon cyan and neon gold ray traces
        const isGold = i % 3 === 0;
        ctx.strokeStyle = isGold
          ? `rgba(255, 204, 51, ${0.15 + 0.25 * Math.sin(elapsed * 3 + i)})`
          : `rgba(0, 240, 255, ${0.12 + 0.2 * Math.cos(elapsed * 2 + i)})`;

        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Sub-spire geometry
        ctx.beginPath();
        ctx.arc(x, y, 2.5 + Math.sin(elapsed * 4 + i) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isGold ? '#f59e0b' : '#06b6d4';
        ctx.fill();
      }

      // Procedural Mandelbrot wireframe contour
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(elapsed * 0.15);
      const rStep = 32;
      for (let ring = 1; ring <= 6; ring++) {
        ctx.beginPath();
        for (let a = 0; a <= rStep; a++) {
          const th = (a / rStep) * Math.PI * 2;
          const r = ring * 35 * (1 + 0.15 * Math.sin(th * 5 + elapsed * 3));
          const px = Math.cos(th) * r;
          const py = Math.sin(th) * r;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(217, 119, 6, ${0.25 + ring * 0.08})`;
        ctx.stroke();
      }
      ctx.restore();

      if (elapsed > 2.2 && phase === 'fractal_sweep') {
        setPhase('emblem_reveal');
      }
      if (elapsed > 4.2 && phase !== 'ready') {
        setPhase('ready');
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase]);

  const handleStart = async () => {
    await soundEngine.resume();
    soundEngine.triggerTrapResolved();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030508] text-slate-100 overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />

      {/* Radial vignette scrim */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#030508]/60 to-[#030508] pointer-events-none" />

      <AnimatePresence>
        {phase !== 'fractal_sweep' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center max-w-xl px-6 text-center"
          >
            {/* The Sovereign Seal */}
            <div className="relative mb-6 flex items-center justify-center w-28 h-28">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-amber-400/40 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border border-cyan-400/30"
              />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.55)]">
                <span className="font-serif font-black text-2xl text-slate-950 tracking-widest">Ö</span>
              </div>
            </div>

            {/* Sovereign Title */}
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              ÖZTÜRK: FRACTAL BREACH
            </h1>

            {/* Rigorous Handcrafted Directive Attribution */}
            <div className="py-2.5 px-5 mb-5 rounded-lg border border-amber-400/30 bg-amber-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.2)]">
              <p className="font-serif text-xs sm:text-sm tracking-wider uppercase font-semibold text-amber-300">
                An Absolute Handcrafted Visual Masterpiece Conceived and Directed by Enes Öztürk
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mb-8">
              Real-time GPU Mandelbox/Mandelbulb raymarching matrix. Manipulate topological equations, shatter dimensional limits, and safeguard the Sovereign Mind-Core.
            </p>

            {/* Launch CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-lg shadow-[0_0_30px_rgba(245,158,11,0.45)] hover:shadow-[0_0_45px_rgba(245,158,11,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase"
              >
                Enter Sovereign Matrix
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Bottom Watermark */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none text-[11px] font-mono text-slate-500 tracking-tight">
        EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK · © 2026 ALL RIGHTS RESERVED
      </div>
    </div>
  );
};
