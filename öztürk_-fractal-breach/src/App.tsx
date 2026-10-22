// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BootSequence } from './components/BootSequence';
import { MentalChronometerHUD } from './components/MentalChronometerHUD';
import { FractalViewport } from './components/FractalViewport';
import { BottomCommandDock } from './components/BottomCommandDock';
import { OverdriveModal } from './components/OverdriveModal';
import { RecursiveTrapChamber } from './components/RecursiveTrapChamber';
import { TechnicalDocsModal } from './components/TechnicalDocsModal';
import { TacticalRPGPanel } from './components/TacticalRPGPanel';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AboutArchitectModal } from './components/AboutArchitectModal';
import {
  FractalParams,
  FractalType,
  InfiltratorState,
  MindCoreState,
  EnemyProjectile,
  DefensiveTurret,
} from './types/engine';
import { soundEngine } from './audio/ozturkSoundEngine';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export default function App() {
  // Boot Sequence State
  const [showBoot, setShowBoot] = useState(true);

  // Active View: Physical 3D Matrix vs Recursive Mandelbrot Chamber
  const [activeView, setActiveView] = useState<'matrix' | 'recursive_trap'>('matrix');

  // Modals
  const [isTechDocsOpen, setIsTechDocsOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isTacticalRPGOpen, setIsTacticalRPGOpen] = useState(false);
  const [isAboutArchitectOpen, setIsAboutArchitectOpen] = useState(false);
  const [selectedProjectile, setSelectedProjectile] = useState<EnemyProjectile | null>(null);

  // Sound state
  const [isMuted, setIsMuted] = useState(false);
  const [measuredFps, setMeasuredFps] = useState(120);

  // 3D Fractal Parameters
  const [fractalType, setFractalType] = useState<FractalType>('mandelbox');
  const [fractalParams, setFractalParams] = useState<FractalParams>({
    scale: -2.1,
    iterations: 16,
    minRadius2: 0.25,
    fixedRadius2: 1.0,
    foldingLimit: 1.0,
    power: 8.0,
    juliaOffset: [0.0, 0.0, 0.0],
    morphSpeed: 0.5,
    slicePlane: -10.0, // Hidden until Collapse / Slicing command
    roomDensity: 1.0,
  });

  // Neural Infiltrator State
  const [infiltrator, setInfiltrator] = useState<InfiltratorState>({
    x: 0,
    y: 0,
    z: 2.5,
    depth: 1.0,
    energy: 100,
    maxEnergy: 100,
    breachMultiplier: 1.25,
    quantumFragments: 60,
    level: 1,
    sovereignCrests: 4,
  });

  // Peak Depth for Leaderboard
  const [peakDepth, setPeakDepth] = useState(1.0);

  // The Öztürk Sovereign Mind-Core State
  const [mindCore, setMindCore] = useState<MindCoreState>({
    integrity: 100,
    shieldStrength: 100,
    cohesionFactor: 99.4,
    phaseAngle: 0,
    activeAlert: null,
    overdriveActive: false,
    overdriveTimeLeft: 0,
  });

  // Corporate Defense Projectiles & Defensive Turrets
  const [projectiles, setProjectiles] = useState<EnemyProjectile[]>([]);
  const [turrets, setTurrets] = useState<DefensiveTurret[]>([]);

  // Sound toggle handler
  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Overdrive Trigger
  const handleTriggerOverdrive = () => {
    if (mindCore.overdriveActive) return;
    soundEngine.triggerOverdrive();
    setMindCore((prev) => ({
      ...prev,
      overdriveActive: true,
      overdriveTimeLeft: 10.0,
    }));
  };

  // Countdown timer for Overdrive
  useEffect(() => {
    if (!mindCore.overdriveActive) return;
    const interval = setInterval(() => {
      setMindCore((prev) => {
        if (prev.overdriveTimeLeft <= 0.1) {
          return {
            ...prev,
            overdriveActive: false,
            overdriveTimeLeft: 0,
          };
        }
        return {
          ...prev,
          overdriveTimeLeft: prev.overdriveTimeLeft - 0.1,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [mindCore.overdriveActive]);

  // Procedural Corporate Wave Spawner & Projectile Simulation
  useEffect(() => {
    if (showBoot || mindCore.integrity <= 0) return;

    const projectileInterval = setInterval(() => {
      // Spawn incoming corporate data wipe pulse or glitch drone
      if (projectiles.length < 5) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 3.5 + Math.random() * 1.5;
        const height = (Math.random() - 0.5) * 1.8;

        const startX = Math.cos(angle) * dist;
        const startY = height;
        const startZ = Math.sin(angle) * dist;

        // Velocity towards Mind-Core (0,0,0)
        const speed = 0.015;
        const dirX = -startX / dist;
        const dirY = -startY / dist;
        const dirZ = -startZ / dist;

        const types: Array<'data_wipe_pulse' | 'glitch_drone' | 'executor_probe'> = [
          'data_wipe_pulse',
          'glitch_drone',
          'executor_probe',
        ];
        const selectedType = types[Math.floor(Math.random() * types.length)];

        const newProj: EnemyProjectile = {
          id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          type: selectedType,
          origin: [startX, startY, startZ],
          position: [startX, startY, startZ],
          velocity: [dirX * speed, dirY * speed, dirZ * speed],
          damage: selectedType === 'data_wipe_pulse' ? 12 : 8,
          atomicSignature: `0x${Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase()}`,
          frequency: 440 + Math.random() * 880,
          intercepted: false,
        };

        setProjectiles((prev) => [...prev, newProj]);
      }
    }, 3800);

    // Physics tick
    const physicsInterval = setInterval(() => {
      setProjectiles((prev) => {
        const remaining: EnemyProjectile[] = [];

        prev.forEach((p) => {
          if (p.intercepted) return;

          // Turret auto-defense interception
          let destroyedByTurret = false;
          turrets.forEach((turret) => {
            const d = Math.hypot(
              p.position[0] - turret.position[0],
              p.position[1] - turret.position[1],
              p.position[2] - turret.position[2]
            );
            if (d < turret.range) {
              destroyedByTurret = true;
              soundEngine.triggerFracturePulse();
            }
          });

          if (destroyedByTurret) {
            setInfiltrator((inf) => ({
              ...inf,
              quantumFragments: inf.quantumFragments + 5,
            }));
            return;
          }

          // Advance position
          const nextPos: [number, number, number] = [
            p.position[0] + p.velocity[0],
            p.position[1] + p.velocity[1],
            p.position[2] + p.velocity[2],
          ];

          // Check distance to Mind-Core at (0, 0, 0)
          const distToCore = Math.hypot(nextPos[0], nextPos[1], nextPos[2]);
          if (distToCore < 0.45) {
            // Impact!
            soundEngine.triggerCoreDamage();
            setMindCore((core) => {
              const newIntegrity = Math.max(0, core.integrity - p.damage);
              return {
                ...core,
                integrity: newIntegrity,
                cohesionFactor: Math.max(10, core.cohesionFactor - 4.5),
              };
            });
          } else {
            remaining.push({ ...p, position: nextPos });
          }
        });

        return remaining;
      });
    }, 50);

    return () => {
      clearInterval(projectileInterval);
      clearInterval(physicsInterval);
    };
  }, [showBoot, projectiles.length, turrets, mindCore.integrity]);

  // Handle Depth update from viewport zoom
  const handleUpdateDepth = useCallback((newDepth: number, deltaVelocity: number) => {
    setInfiltrator((prev) => ({
      ...prev,
      depth: newDepth,
    }));
    setPeakDepth((prev) => Math.max(prev, newDepth));
  }, []);

  // Systemic Override Actions
  const handleExecuteZoom = () => {
    soundEngine.triggerFracturePulse();
    setInfiltrator((prev) => {
      const nextDepth = prev.depth * 2.2;
      setPeakDepth((p) => Math.max(p, nextDepth));
      return { ...prev, depth: nextDepth };
    });
    setFractalParams((prev) => ({
      ...prev,
      scale: prev.scale < 0 ? prev.scale - 0.15 : prev.scale + 0.15,
    }));
  };

  const handleExecuteFracture = () => {
    soundEngine.triggerFracturePulse();
    setInfiltrator((prev) => ({
      ...prev,
      quantumFragments: prev.quantumFragments + Math.floor(8 * prev.breachMultiplier),
      energy: Math.max(0, prev.energy - 15),
    }));
    // Perturb local fractal scale and folding limit
    setFractalParams((prev) => ({
      ...prev,
      foldingLimit: Math.max(0.6, Math.min(2.2, prev.foldingLimit + (Math.random() - 0.5) * 0.4)),
    }));
  };

  const handleExecuteMutate = () => {
    soundEngine.triggerFracturePulse();
    const newJulia: [number, number, number] = [
      (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 0.4,
    ];
    setFractalParams((prev) => ({
      ...prev,
      juliaOffset: newJulia,
      power: 6.0 + Math.random() * 4.0,
    }));
  };

  const handleExecuteCollapse = () => {
    soundEngine.triggerRewriteSuccess();
    // Synthesize dimensional room manifold: cuts slice plane and reinforces Core
    setFractalParams((prev) => ({
      ...prev,
      slicePlane: prev.slicePlane < -4.0 ? 0.35 : -10.0,
      roomDensity: prev.roomDensity * 1.5,
    }));
    setMindCore((prev) => ({
      ...prev,
      integrity: Math.min(100, prev.integrity + 15),
      cohesionFactor: Math.min(100, prev.cohesionFactor + 6),
    }));
  };

  // Rewrite Projectile Confirmation in Overdrive Mode
  const handleConfirmRewrite = (projId: string, rewriteType: 'turret' | 'room' | 'battery') => {
    const target = projectiles.find((p) => p.id === projId);
    if (!target) return;

    setProjectiles((prev) => prev.filter((p) => p.id !== projId));
    setSelectedProjectile(null);

    if (rewriteType === 'turret') {
      const newTurret: DefensiveTurret = {
        id: `turret_${Date.now()}`,
        position: target.position,
        range: 1.8,
        lastFired: Date.now(),
        kills: 0,
      };
      setTurrets((prev) => [...prev, newTurret]);
    } else if (rewriteType === 'room') {
      setFractalParams((prev) => ({
        ...prev,
        slicePlane: 0.15,
        roomDensity: prev.roomDensity + 0.8,
      }));
      setMindCore((prev) => ({
        ...prev,
        cohesionFactor: Math.min(100, prev.cohesionFactor + 12),
      }));
    } else if (rewriteType === 'battery') {
      setMindCore((prev) => ({
        ...prev,
        integrity: Math.min(100, prev.integrity + 25),
      }));
      setInfiltrator((prev) => ({
        ...prev,
        energy: Math.min(prev.maxEnergy, prev.energy + 35),
      }));
    }
  };

  // Upgrades
  const handleUpgradeStat = (stat: 'breach' | 'energy' | 'shield') => {
    if (stat === 'breach' && infiltrator.quantumFragments >= 25) {
      setInfiltrator((prev) => ({
        ...prev,
        quantumFragments: prev.quantumFragments - 25,
        breachMultiplier: prev.breachMultiplier + 0.35,
        level: prev.level + 1,
      }));
    } else if (stat === 'energy' && infiltrator.quantumFragments >= 20) {
      setInfiltrator((prev) => ({
        ...prev,
        quantumFragments: prev.quantumFragments - 20,
        maxEnergy: prev.maxEnergy + 25,
        energy: prev.maxEnergy + 25,
        level: prev.level + 1,
      }));
    } else if (stat === 'shield' && infiltrator.sovereignCrests >= 2) {
      setInfiltrator((prev) => ({
        ...prev,
        sovereignCrests: prev.sovereignCrests - 2,
        level: prev.level + 1,
      }));
      setMindCore((prev) => ({
        ...prev,
        integrity: 100,
        cohesionFactor: 100,
      }));
    }
  };

  // Recursive Trap Resolution
  const handleResolveTrap = (crests: number, fragments: number) => {
    setInfiltrator((prev) => ({
      ...prev,
      sovereignCrests: prev.sovereignCrests + crests,
      quantumFragments: prev.quantumFragments + fragments,
    }));
    setActiveView('matrix');
  };

  // Reset Run if Reality Collapses
  const handleRestoreCore = () => {
    soundEngine.triggerTrapResolved();
    setMindCore({
      integrity: 100,
      shieldStrength: 100,
      cohesionFactor: 99.4,
      phaseAngle: 0,
      activeAlert: null,
      overdriveActive: false,
      overdriveTimeLeft: 0,
    });
    setProjectiles([]);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-[#020408] text-slate-100 overflow-hidden font-sans select-none">
      {/* 1. Initial Sovereign Boot Sequence */}
      {showBoot && (
        <BootSequence
          onComplete={() => {
            setShowBoot(false);
          }}
        />
      )}

      {/* 2. Top 8%: Mental Chronometer HUD */}
      <MentalChronometerHUD
        mindCore={mindCore}
        infiltrator={infiltrator}
        fps={measuredFps}
        onOpenArchitectBadge={() => setIsAboutArchitectOpen(true)}
        onOpenTechDocs={() => setIsTechDocsOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenTacticalRPG={() => setIsTacticalRPGOpen(true)}
        onToggleSound={handleToggleSound}
        isMuted={isMuted}
      />

      {/* 3. Center 77%: 3D Viewport or Mandelbrot Trap Chamber */}
      <main className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
        {activeView === 'matrix' ? (
          <FractalViewport
            fractalParams={fractalParams}
            fractalType={fractalType}
            infiltrator={infiltrator}
            mindCore={mindCore}
            projectiles={projectiles}
            turrets={turrets}
            onSelectProjectileForRewrite={(proj) => setSelectedProjectile(proj)}
            onTriggerOverdrive={handleTriggerOverdrive}
            onUpdateDepth={handleUpdateDepth}
            onFpsUpdate={setMeasuredFps}
          />
        ) : (
          <RecursiveTrapChamber
            onResolveTrap={handleResolveTrap}
            onExit={() => setActiveView('matrix')}
          />
        )}

        {/* Reality Matrix Collapse Screen (Game Over) */}
        {mindCore.integrity <= 0 && (
          <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-3 animate-bounce" />
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-red-400 mb-2 uppercase tracking-wide">
              The Sovereign Mind-Core Has Collapsed
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
              Corporate data wipe breached the hyper-dimensional crystalline matrix. Re-anchor the reality matrix using Enes Öztürk's master seed.
            </p>
            <button
              onClick={handleRestoreCore}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore Core via Öztürk Sovereign Seed</span>
            </button>
          </div>
        )}
      </main>

      {/* 4. Bottom 15%: Systemic Override Execution Modules */}
      <BottomCommandDock
        fractalType={fractalType}
        onChangeFractalType={setFractalType}
        onExecuteZoom={handleExecuteZoom}
        onExecuteFracture={handleExecuteFracture}
        onExecuteMutate={handleExecuteMutate}
        onExecuteCollapse={handleExecuteCollapse}
        onOpenRecursiveTrap={() => setActiveView('recursive_trap')}
        activeView={activeView}
        onSwitchView={setActiveView}
        infiltratorEnergy={infiltrator.energy}
      />

      {/* 5. Modals */}
      {selectedProjectile && (
        <OverdriveModal
          projectile={selectedProjectile}
          onClose={() => setSelectedProjectile(null)}
          onConfirmRewrite={handleConfirmRewrite}
        />
      )}

      {isTechDocsOpen && (
        <TechnicalDocsModal onClose={() => setIsTechDocsOpen(false)} />
      )}

      {isLeaderboardOpen && (
        <LeaderboardModal
          onClose={() => setIsLeaderboardOpen(false)}
          userBestDepth={peakDepth}
        />
      )}

      {isTacticalRPGOpen && (
        <TacticalRPGPanel
          infiltrator={infiltrator}
          onUpgradeStat={handleUpgradeStat}
          onClose={() => setIsTacticalRPGOpen(false)}
        />
      )}

      {isAboutArchitectOpen && (
        <AboutArchitectModal
          onClose={() => setIsAboutArchitectOpen(false)}
          onReplayBoot={() => setShowBoot(true)}
        />
      )}
    </div>
  );
}
