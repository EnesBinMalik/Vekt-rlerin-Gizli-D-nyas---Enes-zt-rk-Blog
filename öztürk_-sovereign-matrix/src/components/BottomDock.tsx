// ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU. © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.

/**
 * @file BottomDock.tsx
 * @author Enes Öztürk
 * @description Alt %15 ergonomik tek elle başparmak yönetimli komut yürütme modülleri:
 * AUTHENTICATE, DECOUPLE, ENCRYPT, SHIFT, Öztürk Egemen Mührü ve Zen Modu Gizleme.
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Unlink, 
  Lock, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ShieldAlert,
  Terminal
} from 'lucide-react';

interface BottomDockProps {
  selectedCount: number;
  activeClearance: number;
  onAuthenticate: () => void;
  onDecouple: () => void;
  onEncrypt: () => void;
  onShift: () => void;
  onTriggerOverdrive: () => void;
  isOverdriveActive: boolean;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  selectedCount,
  activeClearance,
  onAuthenticate,
  onDecouple,
  onEncrypt,
  onShift,
  onTriggerOverdrive,
  isOverdriveActive,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-20 transition-all duration-300 w-[94vw] max-w-[940px] pointer-events-auto select-none ${
        isCollapsed ? 'bottom-[-65px]' : 'bottom-3 sm:bottom-4'
      }`}
    >
      {/* Collapse / Expand Toggle Tab */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="px-4 py-1 rounded-t-lg bg-[#060a17]/95 border-t border-x border-amber-500/40 text-amber-300 hover:text-amber-200 text-[11px] font-mono flex items-center gap-1.5 cursor-pointer shadow-[0_-4px_12px_rgba(0,0,0,0.6)] backdrop-blur-sm"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
              <span>KONTROLLERİ GÖSTER</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
              <span>GİZLE (ZEN MODU)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Dock Container */}
      <div className="bg-[#050813]/95 border border-amber-500/40 rounded-xl p-2.5 sm:p-3 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 items-center">
          {/* Module 1: AUTHENTICATE (Doğrula) */}
          <button
            onClick={onAuthenticate}
            disabled={selectedCount === 0}
            className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all cursor-pointer ${
              selectedCount > 0
                ? 'bg-cyan-950/40 border-cyan-400/80 text-cyan-300 hover:bg-cyan-900/50 glow-cyan active:scale-95'
                : 'bg-slate-900/40 border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-cyan-400" />
            <span className="font-orbitron font-bold text-[10px] sm:text-xs tracking-wider">
              AUTHENTICATE
            </span>
            <span className="text-[8px] font-mono text-cyan-400/70 hidden xs:inline">
              ZKP DOĞRULA ({selectedCount})
            </span>
          </button>

          {/* Module 2: DECOUPLE (Bağlantı Ayır) */}
          <button
            onClick={onDecouple}
            className="flex flex-col items-center justify-center p-2 rounded-lg border border-purple-500/50 bg-purple-950/30 text-purple-300 hover:bg-purple-900/40 active:scale-95 transition-all cursor-pointer glow-purple"
          >
            <Unlink className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-purple-400" />
            <span className="font-orbitron font-bold text-[10px] sm:text-xs tracking-wider">
              DECOUPLE
            </span>
            <span className="text-[8px] font-mono text-purple-400/70 hidden xs:inline">
              AYIR & SIFIRLA
            </span>
          </button>

          {/* Module 3: ENCRYPT (Şifrele) */}
          <button
            onClick={onEncrypt}
            className="flex flex-col items-center justify-center p-2 rounded-lg border border-amber-500/60 bg-amber-950/30 text-amber-300 hover:bg-amber-900/40 active:scale-95 transition-all cursor-pointer glow-gold"
          >
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-amber-400" />
            <span className="font-orbitron font-bold text-[10px] sm:text-xs tracking-wider">
              ENCRYPT
            </span>
            <span className="text-[8px] font-mono text-amber-400/70 hidden xs:inline">
              ÖZTÜRK MÜHRÜ
            </span>
          </button>

          {/* Module 4: SHIFT (Matris Kaydır) */}
          <button
            onClick={onShift}
            className="flex flex-col items-center justify-center p-2 rounded-lg border border-teal-500/50 bg-teal-950/30 text-teal-300 hover:bg-teal-900/40 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-teal-400" />
            <span className="font-orbitron font-bold text-[10px] sm:text-xs tracking-wider">
              SHIFT
            </span>
            <span className="text-[8px] font-mono text-teal-400/70 hidden xs:inline">
              KADRAN KAYDIR
            </span>
          </button>

          {/* Module 5: OVERDRIVE (Öztürk Egemen Overdrive - Mobile & Desktop Highlight) */}
          <button
            onClick={onTriggerOverdrive}
            className={`col-span-4 sm:col-span-1 flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-0 p-2 rounded-lg border transition-all cursor-pointer ${
              isOverdriveActive
                ? 'bg-amber-500 border-amber-300 text-black font-bold animate-pulse'
                : 'bg-gradient-to-r sm:bg-gradient-to-b from-amber-600/30 to-amber-900/50 border-amber-400/80 text-amber-200 hover:brightness-125 glow-gold active:scale-95'
            }`}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-amber-300" />
            <div className="flex flex-col sm:items-center">
              <span className="font-orbitron font-extrabold text-[10px] sm:text-xs tracking-wider">
                OVERDRIVE
              </span>
              <span className="text-[8px] font-mono text-amber-300/80">
                {isOverdriveActive ? 'AKTİF (KESİN)' : 'ÇİFT DOKUN'}
              </span>
            </div>
          </button>
        </div>

        {/* Sub-dock Sovereign Watermark strip */}
        <div className="mt-2 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[9px] font-mono text-slate-500 px-1">
          <span className="truncate">
            ENES ÖZTÜRK EGEMENLİĞİ • İZİN SEVİYESİ: LVL {activeClearance}
          </span>
          <span className="text-amber-400/70 hidden xs:inline">
            // ZKP DISCRETE LOG PROOF ENGINE
          </span>
        </div>
      </div>
    </div>
  );
};
