// ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU. © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.

/**
 * @file App.tsx
 * @author Enes Öztürk
 * @description "Öztürk: Sovereign Matrix" Ana Uygulama Düzenleyicisi.
 * Kriptografik Fizik Simülasyonu, Taktik Savaş RPG'si, ZKP Doğrulama ve Overdrive.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CinematicIntro } from './components/CinematicIntro';
import { TacticalHud } from './components/TacticalHud';
import { MatrixViewport } from './components/MatrixViewport';
import { BottomDock } from './components/BottomDock';
import { TechnicalSpecsModal } from './components/TechnicalSpecsModal';
import { SovereignMatrixEngine } from './matrix3d/MatrixScene';
import { 
  calculateSovereignStateHash, 
  generateZkpProof, 
  ZkpProof 
} from './crypto/sovereignMath';
import { sovereignAudio } from './audio/synthAudio';
import { AlertTriangle, RotateCcw, ShieldAlert, Award } from 'lucide-react';

export default function App() {
  const [showCinematic, setShowCinematic] = useState<boolean>(true);
  const [coherence, setCoherence] = useState<number>(100);
  const [exploitsCompiled, setExploitsCompiled] = useState<number>(0);
  const [integrityLog, setIntegrityLog] = useState<string>('ENES ÖZTÜRK MERKEZİ ANA BİLGİSAYAR ÇEVRİMİÇİ • GÜVENLİK PROTOKOLÜ V4 AKTİF');
  const [isOverdriveActive, setIsOverdriveActive] = useState<boolean>(false);
  const [overdriveTimeLeft, setOverdriveTimeLeft] = useState<number>(0);
  const [selectedNodesCount, setSelectedNodesCount] = useState<number>(0);
  const [activeClearance, setActiveClearance] = useState<number>(1);
  const [currentQuadrant, setCurrentQuadrant] = useState<number>(1);
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [stateHash, setStateHash] = useState<string>('0x7F4A-SOV-EO26');

  const engineRef = useRef<SovereignMatrixEngine | null>(null);

  // Periodically compute anti-cheat distributed lock-step state hash
  useEffect(() => {
    const interval = setInterval(() => {
      const hash = calculateSovereignStateHash(coherence, exploitsCompiled, selectedNodesCount, Date.now());
      setStateHash(hash);
      sovereignAudio.updateDroneCoherence(coherence / 100);
    }, 1500);

    return () => clearInterval(interval);
  }, [coherence, exploitsCompiled, selectedNodesCount]);

  const handleCoherenceDrain = useCallback((amount: number) => {
    setCoherence(prev => {
      const next = Math.max(0, prev - amount);
      if (next === 0 && prev > 0) {
        setIntegrityLog('KRİTİK UYARI: GERÇEKLİK MATRİSİ ÇÖKTÜ! TÜM OTURUMLAR SONLANDIRILDI.');
      }
      return next;
    });
  }, []);

  const handleExploitCompiled = useCallback(() => {
    setExploitsCompiled(prev => prev + 1);
  }, []);

  const handleLogUpdate = useCallback((log: string) => {
    setIntegrityLog(log);
  }, []);

  // Action: AUTHENTICATE
  const handleAuthenticate = useCallback(() => {
    if (!engineRef.current || selectedNodesCount === 0) return;
    const proof = generateZkpProof(selectedNodesCount * 42, activeClearance);
    engineRef.current.executeAuthenticate(proof);
    setCoherence(prev => Math.min(100, prev + 5));
    setActiveClearance(prev => Math.min(4, prev + 1));
  }, [selectedNodesCount, activeClearance]);

  // Action: DECOUPLE
  const handleDecouple = useCallback(() => {
    if (!engineRef.current) return;
    engineRef.current.selectedNodeChain = [];
    setSelectedNodesCount(0);
    sovereignAudio.playKeyClick();
    setIntegrityLog('BAĞLANTI AYRILDI: SEÇİLİ DÜĞÜM ZİNCİRİ SIFIRLANDI');
  }, []);

  // Action: ENCRYPT
  const handleEncrypt = useCallback(() => {
    sovereignAudio.playKeyClick();
    sovereignAudio.playZkpSuccess();
    setCoherence(prev => Math.min(100, prev + 12));
    setIntegrityLog('ÖZTÜRK EGEMEN MÜHRÜ UYGULANDI: BELLEK DÜZEYİNDE ŞİFRELEME GÜÇLENDİRİLDİ (+12% UYUM)');
  }, []);

  // Action: SHIFT
  const handleShift = useCallback(() => {
    if (!engineRef.current) return;
    const nextQuad = (currentQuadrant % 4) + 1;
    setCurrentQuadrant(nextQuad);
    engineRef.current.shiftPerspective(nextQuad);
    setIntegrityLog(`MATRİS BAKIŞ AÇISI KAYDIRILDI: KADRAN ${nextQuad}`);
  }, [currentQuadrant]);

  // Action: OVERDRIVE
  const handleTriggerOverdrive = useCallback(() => {
    if (!engineRef.current || isOverdriveActive) return;
    engineRef.current.triggerOverdrive();
    setIsOverdriveActive(true);
    setOverdriveTimeLeft(10.0);
    setIntegrityLog('ÖZTÜRK EGEMEN OVERDRIVE AKTİF: 10 SANİYE İÇİNDE DÜŞMAN YÜKLERİNİ KESİN!');
  }, [isOverdriveActive]);

  const handleToggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);
    sovereignAudio.setMuted(next);
  }, [isMuted]);

  // Reboot Core Simulation
  const handleRebootCore = useCallback(() => {
    setCoherence(100);
    setExploitsCompiled(0);
    setActiveClearance(1);
    setSelectedNodesCount(0);
    setIntegrityLog('ÖZTÜRK EGEMEN MERKEZİ ÇEKİRDEK YENİDEN BAŞLATILDI • TÜM ALT SİSTEMLER NOMİNAL');
    if (engineRef.current) {
      engineRef.current.initDefaultMatrixNodes();
      engineRef.current.initDefaultWalls();
      engineRef.current.initDefaultDaemons();
      engineRef.current.selectedNodeChain = [];
      engineRef.current.shieldDrones = [];
    }
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020408] text-slate-100 flex flex-col select-none">
      {/* 1. Cinematic Opening Intro (can be replayed or skipped) */}
      {showCinematic && (
        <CinematicIntro onComplete={() => setShowCinematic(false)} />
      )}

      {/* 2. Top 8% Tactical Crypto HUD */}
      <TacticalHud
        coherencePercentage={coherence}
        exploitsCompiled={exploitsCompiled}
        integrityLog={integrityLog}
        isOverdriveActive={isOverdriveActive}
        overdriveTimeLeft={overdriveTimeLeft}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onTriggerOverdrive={handleTriggerOverdrive}
      />

      {/* 3. Center 77% Unobstructed 3D Physical Data Viewport */}
      <main className="flex-1 w-full h-full relative">
        <MatrixViewport
          onCoherenceDrain={handleCoherenceDrain}
          onExploitCompiled={handleExploitCompiled}
          onLogUpdate={handleLogUpdate}
          isOverdriveActive={isOverdriveActive}
          setIsOverdriveActive={setIsOverdriveActive}
          setOverdriveTimeLeft={setOverdriveTimeLeft}
          setEngineRef={(eng) => {
            engineRef.current = eng;
          }}
          selectedNodesCount={selectedNodesCount}
          setSelectedNodesCount={setSelectedNodesCount}
        />

        {/* Double Tap Overdrive Hint on Viewport (subtle) */}
        {!isOverdriveActive && (
          <div className="absolute top-20 right-4 pointer-events-none hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-amber-400/60 bg-black/40 px-2 py-1 rounded border border-amber-500/20">
            <span>ÇİFT DOKUN = OVERDRIVE</span>
          </div>
        )}
      </main>

      {/* 4. Bottom 15% Ergonomic Execution Modules & Zen Dock */}
      <BottomDock
        selectedCount={selectedNodesCount}
        activeClearance={activeClearance}
        onAuthenticate={handleAuthenticate}
        onDecouple={handleDecouple}
        onEncrypt={handleEncrypt}
        onShift={handleShift}
        onTriggerOverdrive={handleTriggerOverdrive}
        isOverdriveActive={isOverdriveActive}
      />

      {/* 5. Reality Matrix Collapse Modal (If Coherence = 0%) */}
      {coherence === 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="max-w-md w-full bg-[#090306] border-2 border-red-600 rounded-xl p-6 text-center shadow-[0_0_40px_rgba(255,0,0,0.4)]">
            <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="font-orbitron font-extrabold text-xl text-red-400 mb-2">
              GERÇEKLİK MATRİSİ ÇÖKTÜ
            </h2>
            <p className="text-xs font-mono text-slate-300 leading-relaxed mb-6">
              Öztürk Egemen Merkezi Ana Bilgisayar bütünlüğü %0 seviyesine geriledi.
              Kurumsal şifre çözme alt programları güvenlik duvarını aştı.
            </p>
            <div className="text-[10px] font-mono text-amber-400/80 mb-6 p-2 bg-black/60 rounded border border-amber-500/30">
              // ENES ÖZTÜRK YÖNETİMİNDE ACİL KURTARMA PROTOKOLÜ HAZIR
            </div>
            <button
              onClick={handleRebootCore}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 text-white font-orbitron font-bold text-xs uppercase tracking-wider rounded shadow-[0_0_15px_rgba(255,100,50,0.6)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Sovereign Çekirdeği Yeniden Başlat
            </button>
          </div>
        </div>
      )}

      {/* 6. Comprehensive Technical Systems Specs & Source Vault Modal */}
      <TechnicalSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        currentStateHash={stateHash}
      />
    </div>
  );
}
