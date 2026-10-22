// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

export type FractalType = 'mandelbox' | 'mandelbulb' | 'hybrid';

export interface FractalParams {
  scale: number;             // Mandelbox scale factor (e.g. -2.0 to 3.5)
  iterations: number;        // Raymarching iteration step count
  minRadius2: number;        // Mandelbox sphere fold min radius squared
  fixedRadius2: number;      // Mandelbox sphere fold fixed radius squared
  foldingLimit: number;      // Box fold boundary limit
  power: number;             // Mandelbulb power exponent (e.g. 8.0)
  juliaOffset: [number, number, number]; // Julia perturbation vector
  morphSpeed: number;        // Real-time dimensional perturbation speed
  slicePlane: number;        // Dynamic slicing plane position
  roomDensity: number;       // Procedural staircase and room extrusion density
}

export interface InfiltratorState {
  x: number;
  y: number;
  z: number;
  depth: number;             // Current fractal depth factor (e.g. 1.0 to 128.0)
  energy: number;            // Sovereign Spire energy (0 - 100)
  maxEnergy: number;
  breachMultiplier: number;  // Multiplier for hacking & fracturing
  quantumFragments: number;  // Collected quantum glitch fragments
  level: number;
  sovereignCrests: number;
}

export interface MindCoreState {
  integrity: number;         // 0 to 100%
  shieldStrength: number;    // 0 to 100%
  cohesionFactor: number;    // Real-time spatial stability percentage
  phaseAngle: number;        // Hyper-dimensional rotation
  activeAlert: string | null;
  overdriveActive: boolean;
  overdriveTimeLeft: number; // In seconds
}

export interface EnemyProjectile {
  id: string;
  type: 'data_wipe_pulse' | 'glitch_drone' | 'executor_probe';
  origin: [number, number, number];
  position: [number, number, number];
  velocity: [number, number, number];
  damage: number;
  atomicSignature: string;
  frequency: number;
  intercepted: boolean;
  rewrittenAs?: 'turret' | 'room' | 'battery';
}

export interface DefensiveTurret {
  id: string;
  position: [number, number, number];
  range: number;
  lastFired: number;
  kills: number;
}

export interface RecursiveTrapState {
  active: boolean;
  loopDepth: number;         // e.g. 1, 2, 3...
  targetSeedReal: number;
  targetSeedImag: number;
  currentSeedReal: number;
  currentSeedImag: number;
  resonanceThreshold: number;
  resolved: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  architect: string;
  depthReached: number;
  timeSeconds: number;
  hashSalt: string;
  verified: boolean;
  date: string;
}
