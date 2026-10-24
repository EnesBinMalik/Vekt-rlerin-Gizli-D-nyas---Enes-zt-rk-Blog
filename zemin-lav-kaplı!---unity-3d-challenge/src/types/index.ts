export type ObjectType =
  | 'cube'
  | 'sphere'
  | 'cylinder'
  | 'ramp'
  | 'quarterPipe'
  | 'trampoline'
  | 'booster'
  | 'spinner'
  | 'finishRing'
  | 'checkpoint';

export type MaterialTheme =
  | 'unity_orange'
  | 'cyber_blue'
  | 'dark_metal'
  | 'gold_luxury'
  | 'sci_fi_grid'
  | 'wood_plank'
  | 'neon_green'
  | 'magma_rock';

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface GameObjectConfig {
  id: string;
  name: string;
  type: ObjectType;
  position: Vector3D;
  rotation: Vector3D; // degrees
  scale: Vector3D;
  color: string;
  materialTheme: MaterialTheme;
  isKinematic: boolean; // if true, static or animated (doesn't fall)
  bounciness: number; // 0 (flat) to 1.5 (super bounce)
  friction: number; // 0 (slippery ice) to 1 (high friction)
  speed?: number; // for spinning obstacles (rotational speed rad/s)
  boostPower?: number; // for booster pads
}

export interface BallState {
  position: Vector3D;
  velocity: Vector3D;
  angularVelocity: Vector3D;
  radius: number;
  mass: number;
  isGrounded: boolean;
  isInLava: boolean;
  isFinished: boolean;
  checkpointId: string | null;
}

export interface LevelData {
  id: string;
  title: string;
  author: string;
  signature: string;
  description: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor' | 'Uzman';
  objects: GameObjectConfig[];
  ballStartPos: Vector3D;
  parTime: number; // seconds
}

export interface CommunitySubmission {
  id: string;
  title: string;
  author: string;
  date: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor' | 'Uzman';
  description: string;
  likes: number;
  bestTime?: number;
  objectsCount: number;
  verified: boolean;
  levelData: LevelData;
}
