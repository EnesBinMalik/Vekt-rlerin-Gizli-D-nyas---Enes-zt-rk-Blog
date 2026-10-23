// ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU. © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.

/**
 * @file CinematicIntro.tsx
 * @author Enes Öztürk
 * @description Sessiz bir kameranın parlayan onaltılık bellek boşalmasını takip ettiği
 * ve vektörleri yapısal olarak şifreleyerek lazerle oyulmuş neon-altın amblemi ortaya çıkardığı açılış sekansı.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { generateMemoryDumpRow } from '../crypto/sovereignMath';
import { Shield, Sparkles, Terminal, ChevronRight, Lock } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'dump' | 'encrypting' | 'emblem' | 'ready'>('dump');
  const [streamOffset, setStreamOffset] = useState<number>(0);

  // Generate memory dump rows
  const memoryRows = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => generateMemoryDumpRow(streamOffset + i));
  }, [streamOffset]);

  useEffect(() => {
    // 1. Memory dump streaming stage
    const interval = setInterval(() => {
      setStreamOffset(prev => prev + 1);
    }, 90);

    // Timeline transition
    const t1 = setTimeout(() => {
      setPhase('encrypting');
    }, 2800);

    const t2 = setTimeout(() => {
      setPhase('emblem');
    }, 4500);

    const t3 = setTimeout(() => {
      setPhase('ready');
    }, 5800);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#020408] text-white flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Subtle Matrix Scanlines */}
      <div className="absolute inset-0 matrix-scanlines opacity-40 pointer-events-none" />

      {/* Hexadecimal Memory Dump Cascade */}
      <div 
        className={`absolute inset-0 flex flex-col justify-center items-center font-mono text-[11px] md:text-xs leading-relaxed text-cyan-400/50 transition-all duration-1000 ${
          phase === 'encrypting' ? 'scale-90 opacity-25 blur-xs filter' : 
          phase === 'emblem' || phase === 'ready' ? 'opacity-10 scale-75 blur-sm' : 'opacity-80 scale-100'
        }`}
      >
        <div className="max-w-4xl px-4 w-full space-y-1">
          <div className="text-amber-400 font-semibold mb-2 flex items-center justify-between border-b border-cyan-800/40 pb-1">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              // SOVEREIGN MEMORY VECTOR TRAVERSAL :: 0x7F4A0000_DUMP
            </span>
            <span className="text-xs text-amber-300/80 font-mono">STATUS: STRUCTURAL_ENCRYPT_PIPELINE</span>
          </div>
          {memoryRows.map((row, idx) => (
            <div key={idx} className="flex items-center justify-between font-mono tracking-tight hover:text-cyan-200">
              <span className="text-amber-500/70 font-mono w-28">{row.address}</span>
              <span className="text-cyan-300/80 tracking-wider flex-1 px-4">{row.hexData}</span>
              <span className="text-purple-400/70 hidden sm:inline-block w-28 font-mono">{row.ascii}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vector Encrypting Inward Pulse */}
      {phase === 'encrypting' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-72 h-72 border-2 border-amber-400/80 rounded-full animate-ping opacity-60 glow-gold" />
          <div className="absolute font-mono text-xs tracking-widest text-amber-300 uppercase">
            // STRUCTURAL VECTOR ENCRYPTION ENGAGED //
          </div>
        </div>
      )}

      {/* Laser-Engraved Neon-Gold Sovereign Emblem */}
      {(phase === 'emblem' || phase === 'ready') && (
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center animate-fade-in flex flex-col items-center">
          {/* Laser Cut Crest */}
          <div className="relative mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-amber-400 bg-amber-950/20 glow-gold flex items-center justify-center relative overflow-hidden backdrop-blur-xs">
              {/* Laser Sweep Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-300/30 to-transparent animate-pulse" />
              <Shield className="w-12 h-12 sm:w-14 sm:h-14 text-amber-400 drop-shadow-[0_0_12px_rgba(255,200,59,0.8)]" />
              <div className="absolute bottom-1.5 font-mono text-[9px] font-bold text-amber-300 tracking-wider">
                EO • 2026
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]" />
          </div>

          {/* Golden Subtitle Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-amber-500/40 bg-amber-950/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            ÖZTÜRK: SOVEREIGN MATRIX
          </div>

          {/* Masterpiece Sacred Inscription */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-orbitron tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 text-glow-gold mb-3 leading-snug">
            Enes Öztürk tarafından tasarlanıp yönetilen mutlak bir el yapımı kriptografik başyapıt
          </h1>

          <p className="text-xs sm:text-sm text-cyan-200/80 font-mono tracking-wide max-w-lg mb-6 leading-relaxed">
            Sıfır Bilgi Kanıtı (ZKP) Donanım Düzeyinde Canlı Veri Bükme Mimarisi.
            Kuantum Dolanıklı Matris Manipülasyonu ve Taktik Savaş RPG Simülasyonu.
          </p>

          {/* Strict Ownership Watermark Banner */}
          <div className="text-[10px] text-amber-400/90 font-mono px-3 py-1.5 border border-amber-500/20 bg-black/60 rounded mb-8 max-w-md">
            // ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU.
            <br />
            © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.
          </div>

          {/* Interactive Enter Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black font-orbitron font-bold text-sm tracking-wider uppercase rounded shadow-[0_0_20px_rgba(255,200,59,0.6)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-black" />
              Sovereign Matrise Gir
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onComplete}
              className="text-xs font-mono text-cyan-400/70 hover:text-cyan-300 underline underline-offset-4 cursor-pointer py-2"
            >
              [ İntroyu Atla ]
            </button>
          </div>
        </div>
      )}

      {/* Skip Button in Top Right */}
      {phase !== 'ready' && (
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 text-xs font-mono text-amber-400/60 hover:text-amber-300 px-3 py-1.5 border border-amber-400/20 rounded bg-black/40 cursor-pointer"
        >
          ATLA [ESC]
        </button>
      )}
    </div>
  );
};
