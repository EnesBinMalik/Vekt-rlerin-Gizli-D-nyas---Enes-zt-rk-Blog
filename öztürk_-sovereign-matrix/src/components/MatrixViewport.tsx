// ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU. © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.

/**
 * @file MatrixViewport.tsx
 * @author Enes Öztürk
 * @description 3D WebGL Tuvalini izole ref içinde barındıran, çift dokunuşla Overdrive tetikleyen
 * ve Overdrive terminal arayüzünü yöneten React bileşeni.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SovereignMatrixEngine } from '../matrix3d/MatrixScene';
import { MatrixNode, WallBarrier, ShieldDrone, ZkpProof, generateZkpProof } from '../crypto/sovereignMath';
import { sovereignAudio } from '../audio/synthAudio';
import { Crosshair, Shield, Zap, Sparkles } from 'lucide-react';

interface MatrixViewportProps {
  onCoherenceDrain: (amount: number) => void;
  onExploitCompiled: () => void;
  onLogUpdate: (log: string) => void;
  isOverdriveActive: boolean;
  setIsOverdriveActive: (active: boolean) => void;
  setOverdriveTimeLeft: (time: number) => void;
  setEngineRef: (engine: SovereignMatrixEngine | null) => void;
  selectedNodesCount: number;
  setSelectedNodesCount: (count: number) => void;
}

export const MatrixViewport: React.FC<MatrixViewportProps> = ({
  onCoherenceDrain,
  onExploitCompiled,
  onLogUpdate,
  isOverdriveActive,
  setIsOverdriveActive,
  setOverdriveTimeLeft,
  setEngineRef,
  setSelectedNodesCount,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const engineRefInternal = useRef<SovereignMatrixEngine | null>(null);
  const [lastTapTime, setLastTapTime] = useState<number>(0);
  const [activeProof, setActiveProof] = useState<ZkpProof | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Sovereign 3D Matrix Engine
    const engine = new SovereignMatrixEngine(mountRef.current, {
      onNodeSelected: (node, chainCount) => {
        setSelectedNodesCount(chainCount);
        onLogUpdate(`DÜĞÜM BAĞLANDI: ${node.label} (${node.hexAddress}) • ZİNCİR: ${chainCount}`);
      },
      onZkpSuccess: (proof) => {
        setActiveProof(proof);
        setTimeout(() => setActiveProof(null), 3500);
        onLogUpdate(`ZKP DOĞRULANDI: ${proof.proofId} • HASH: ${proof.verificationHash}`);
      },
      onWallPhased: (wall) => {
        onLogUpdate(`GÜVENLİK BARIYERİ ÇÖZÜNDÜ: ${wall.id} [${wall.sectorKey}] • ÇARPIŞMA MATRİSİ SİLİNDİ`);
      },
      onDaemonDecoupled: (drone) => {
        onLogUpdate(`OTURUM ANAHTARI AYRILDI: ${drone.id} • OTOMATİK KALKAN DRONU OLUŞTURULDU (+${drone.shieldStrength})`);
      },
      onCoherenceDrain: (amount) => {
        onCoherenceDrain(amount);
      },
      onExploitCompiled: () => {
        onExploitCompiled();
      },
      onOverdriveTick: (timeLeft) => {
        setOverdriveTimeLeft(timeLeft);
        if (timeLeft <= 0) {
          setIsOverdriveActive(false);
          onLogUpdate('OVERDRIVE TAMAMLANDI: KALKAN DRONLARI MERKEZ ÇEKİRDEĞİ KORUYOR');
        }
      }
    });

    engineRefInternal.current = engine;
    setEngineRef(engine);

    // Initial audio drone trigger (on first interaction)
    const handleFirstGesture = () => {
      sovereignAudio.startMatrixDrone(1.0);
      window.removeEventListener('pointerdown', handleFirstGesture);
    };
    window.addEventListener('pointerdown', handleFirstGesture);

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      engine.dispose();
      engineRefInternal.current = null;
      setEngineRef(null);
    };
  }, []);

  // Double Tap handler on 3D Viewport to trigger Overdrive
  const handleViewportTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapTime < 350) {
      // Double tap detected!
      if (engineRefInternal.current && !isOverdriveActive) {
        engineRefInternal.current.triggerOverdrive();
        setIsOverdriveActive(true);
        onLogUpdate('ÖZTÜRK EGEMEN OVERDRIVE AKTİF: VEKTÖR ÇİZEREK OTURUM ANAHTARLARINI AYIRIN!');
      }
    }
    setLastTapTime(now);
  }, [lastTapTime, isOverdriveActive]);

  return (
    <div 
      className="relative w-full h-full overflow-hidden select-none cursor-crosshair"
      onPointerDown={handleViewportTap}
    >
      {/* Three.js Isolated Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Overdrive Mode Terminal Overlay */}
      {isOverdriveActive && (
        <div className="absolute inset-0 pointer-events-none border-4 border-amber-400/70 matrix-scanlines flex flex-col justify-between p-4 sm:p-8">
          <div className="flex items-center justify-between text-amber-300 font-mono text-xs">
            <div className="flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded border border-amber-400/50">
              <Crosshair className="w-4 h-4 text-amber-400 animate-spin" />
              <span>TERMINAL VECTOR SLICE ENGINE</span>
            </div>
            <div className="bg-black/70 px-3 py-1.5 rounded border border-amber-400/50 text-glow-gold">
              DÜŞMAN YÜKLERİN ÜZERİNDEN VEKTÖR ÇİZİN
            </div>
          </div>

          <div className="text-center font-mono text-xs text-amber-200/90 bg-black/60 py-1.5 px-4 rounded max-w-md mx-auto border border-amber-500/30">
            // PARMAĞINIZI VEYA İMLECİ SÜRÜKLEYEREK OTURUM ANAHTARLARINI AYIRIN //
          </div>
        </div>
      )}

      {/* Floating Active ZKP Proof Banner */}
      {activeProof && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-black/90 border border-amber-400 rounded-xl p-3 sm:p-4 text-xs font-mono shadow-[0_0_25px_rgba(255,200,59,0.5)] max-w-md w-[90vw]">
          <div className="flex items-center justify-between border-b border-amber-500/40 pb-1.5 mb-2">
            <span className="text-amber-300 font-bold flex items-center gap-1.5 font-orbitron">
              <Sparkles className="w-4 h-4 text-amber-400" />
              SIFIR BİLGİ KANITI (ZKP) DOĞRULANDI
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">120 FPS COMPILER</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <span className="text-slate-400 block">KANIT ID:</span>
              <span className="text-cyan-300 font-bold">{activeProof.proofId}</span>
            </div>
            <div>
              <span className="text-slate-400 block">DOĞRULAMA HASH:</span>
              <span className="text-amber-300 font-bold">{activeProof.verificationHash}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 block">TAAHHÜT R:</span>
              <span className="text-purple-300 truncate block">{activeProof.commitmentR}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
