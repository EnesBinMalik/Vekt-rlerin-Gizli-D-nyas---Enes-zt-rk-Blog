// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE } from '../shaders/fractalRaymarcher';
import {
  FractalParams,
  FractalType,
  InfiltratorState,
  MindCoreState,
  EnemyProjectile,
  DefensiveTurret,
} from '../types/engine';
import { soundEngine } from '../audio/ozturkSoundEngine';
import { Crosshair, ShieldAlert, Zap, Maximize2 } from 'lucide-react';

interface FractalViewportProps {
  fractalParams: FractalParams;
  fractalType: FractalType;
  infiltrator: InfiltratorState;
  mindCore: MindCoreState;
  projectiles: EnemyProjectile[];
  turrets: DefensiveTurret[];
  onSelectProjectileForRewrite: (projectile: EnemyProjectile) => void;
  onTriggerOverdrive: () => void;
  onUpdateDepth: (newDepth: number, deltaVelocity: number) => void;
  onFpsUpdate: (fps: number) => void;
}

export const FractalViewport: React.FC<FractalViewportProps> = ({
  fractalParams,
  fractalType,
  infiltrator,
  mindCore,
  projectiles,
  turrets,
  onSelectProjectileForRewrite,
  onTriggerOverdrive,
  onUpdateDepth,
  onFpsUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformLocationsRef = useRef<Record<string, WebGLUniformLocation>>({});

  // Interactive Camera state
  const cameraState = useRef({
    distance: 3.2,
    yaw: 0.78,
    pitch: 0.35,
    target: [0, 0, 0] as [number, number, number],
    zoom: 1.0,
    velocity: 0.0,
  });

  // Touch and drag tracking
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const touchStartDist = useRef<number | null>(null);
  const lastTapTime = useRef<number>(0);

  // Crosshair / Hovered projectile
  const [hoveredProjId, setHoveredProjId] = useState<string | null>(null);

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.warn('WebGL 2.0 not supported, attempting experimental webgl.');
      return;
    }
    glRef.current = gl;

    // Compile Shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);
    programRef.current = program;

    // Setup full-screen quad
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Cache Uniform Locations
    const uniforms = [
      'u_resolution',
      'u_time',
      'u_cameraPos',
      'u_cameraTarget',
      'u_zoom',
      'u_fractalScale',
      'u_foldingLimit',
      'u_minRadius2',
      'u_fixedRadius2',
      'u_power',
      'u_julia',
      'u_fractalType',
      'u_slicePlane',
      'u_roomDensity',
      'u_overdrive',
      'u_infiltratorPos',
      'u_mindCoreStability',
    ];

    uniforms.forEach((u) => {
      const loc = gl.getUniformLocation(program, u);
      if (loc) uniformLocationsRef.current[u] = loc;
    });

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Main Render Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // FPS tracking
      frameCount++;
      if (time - lastFpsTime >= 500) {
        const measuredFps = Math.round((frameCount * 1000) / (time - lastFpsTime));
        onFpsUpdate(measuredFps);
        frameCount = 0;
        lastFpsTime = time;
      }

      const gl = glRef.current;
      const prog = programRef.current;
      const u = uniformLocationsRef.current;
      const canvas = canvasRef.current;

      if (gl && prog && canvas) {
        gl.useProgram(prog);

        // Compute camera orbit coordinates
        const cam = cameraState.current;
        const cy = Math.cos(cam.pitch);
        const sy = Math.sin(cam.pitch);
        const cx = Math.cos(cam.yaw);
        const sx = Math.sin(cam.yaw);

        const camX = cam.target[0] + cam.distance * cy * sx;
        const camY = cam.target[1] + cam.distance * sy;
        const camZ = cam.target[2] + cam.distance * cy * cx;

        gl.uniform2f(u.u_resolution, canvas.width, canvas.height);
        gl.uniform1f(u.u_time, time * 0.001);
        gl.uniform3f(u.u_cameraPos, camX, camY, camZ);
        gl.uniform3f(u.u_cameraTarget, cam.target[0], cam.target[1], cam.target[2]);
        gl.uniform1f(u.u_zoom, cam.zoom);

        gl.uniform1f(u.u_fractalScale, fractalParams.scale);
        gl.uniform1f(u.u_foldingLimit, fractalParams.foldingLimit);
        gl.uniform1f(u.u_minRadius2, fractalParams.minRadius2);
        gl.uniform1f(u.u_fixedRadius2, fractalParams.fixedRadius2);
        gl.uniform1f(u.u_power, fractalParams.power);
        gl.uniform3fv(u.u_julia, fractalParams.juliaOffset);

        const typeInt = fractalType === 'mandelbox' ? 0 : fractalType === 'mandelbulb' ? 1 : 2;
        gl.uniform1i(u.u_fractalType, typeInt);
        gl.uniform1f(u.u_slicePlane, fractalParams.slicePlane);
        gl.uniform1f(u.u_roomDensity, fractalParams.roomDensity);

        // Smooth overdrive transition
        const targetOverdrive = mindCore.overdriveActive ? 1.0 : 0.0;
        gl.uniform1f(u.u_overdrive, targetOverdrive);

        gl.uniform3f(u.u_infiltratorPos, infiltrator.x, infiltrator.y, infiltrator.z);
        gl.uniform1f(u.u_mindCoreStability, mindCore.integrity);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [fractalParams, fractalType, mindCore.integrity, mindCore.overdriveActive, infiltrator, onFpsUpdate]);

  // Handle Zoom Input (Mouse Wheel & Pinch)
  const handleZoom = useCallback(
    (deltaZoom: number) => {
      const cam = cameraState.current;
      const prevZoom = cam.zoom;
      // Exponential scaling for infinite room penetration
      cam.zoom = Math.max(0.2, Math.min(64.0, cam.zoom * (1 + deltaZoom)));
      cam.distance = Math.max(0.4, Math.min(8.0, cam.distance * (1 - deltaZoom * 0.6)));

      const velocity = Math.abs(cam.zoom - prevZoom);
      cam.velocity = velocity;

      // Update active fractal depth
      const newDepth = cam.zoom * (1 + Math.abs(fractalParams.scale) * 2);
      onUpdateDepth(newDepth, velocity);
      soundEngine.updateMetrics(newDepth, velocity);
    },
    [fractalParams.scale, onUpdateDepth]
  );

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0018;
    handleZoom(delta);
  };

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    const cam = cameraState.current;
    cam.yaw -= dx * 0.006;
    cam.pitch = Math.max(-1.45, Math.min(1.45, cam.pitch + dy * 0.006));
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  // Touch gesture handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      // Double tap detection
      const now = performance.now();
      if (now - lastTapTime.current < 300) {
        onTriggerOverdrive();
      }
      lastTapTime.current = now;
    } else if (e.touches.length === 2) {
      isDragging.current = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      touchStartDist.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging.current) {
      const dx = e.touches[0].clientX - lastMousePos.current.x;
      const dy = e.touches[0].clientY - lastMousePos.current.y;
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      const cam = cameraState.current;
      cam.yaw -= dx * 0.008;
      cam.pitch = Math.max(-1.45, Math.min(1.45, cam.pitch + dy * 0.008));
    } else if (e.touches.length === 2 && touchStartDist.current !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const delta = (dist - touchStartDist.current) * 0.008;
      handleZoom(delta);
      touchStartDist.current = dist;
    }
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    touchStartDist.current = null;
  };

  // Helper to project 3D coordinate to screen 2D position for HUD projectile overlays
  const projectToScreen = (p: [number, number, number]) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: -100, y: -100, visible: false };

    const cam = cameraState.current;
    const cy = Math.cos(cam.pitch);
    const sy = Math.sin(cam.pitch);
    const cx = Math.cos(cam.yaw);
    const sx = Math.sin(cam.yaw);

    const camX = cam.target[0] + cam.distance * cy * sx;
    const camY = cam.target[1] + cam.distance * sy;
    const camZ = cam.target[2] + cam.distance * cy * cx;

    const dx = p[0] - camX;
    const dy = p[1] - camY;
    const dz = p[2] - camZ;

    // View direction
    const vx = cam.target[0] - camX;
    const vy = cam.target[1] - camY;
    const vz = cam.target[2] - camZ;
    const dot = dx * vx + dy * vy + dz * vz;

    if (dot <= 0) return { x: -100, y: -100, visible: false };

    // Approximation of camera projection
    const screenWidth = canvas.clientWidth;
    const screenHeight = canvas.clientHeight;
    const fov = 1.6 * cam.zoom;

    // Right and Up vectors
    const rX = -Math.sin(cam.yaw);
    const rZ = Math.cos(cam.yaw);
    const uX = -Math.sin(cam.pitch) * Math.cos(cam.yaw);
    const uY = Math.cos(cam.pitch);
    const uZ = -Math.sin(cam.pitch) * Math.sin(cam.yaw);

    const dotRight = dx * rX + dz * rZ;
    const dotUp = dx * uX + dy * uY + dz * uZ;
    const distForward = Math.sqrt(dot);

    const x = screenWidth / 2 + (dotRight / distForward) * screenWidth * fov * 0.5;
    const y = screenHeight / 2 - (dotUp / distForward) * screenHeight * fov * 0.5;

    const visible = x >= 0 && x <= screenWidth && y >= 0 && y <= screenHeight;
    return { x, y, visible };
  };

  return (
    <div
      className="relative w-full h-full flex-1 select-none overflow-hidden bg-[#020408]"
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onDoubleClick={onTriggerOverdrive}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Overdrive Mode Banner (when active) */}
      {mindCore.overdriveActive && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
          <div className="px-5 py-2 rounded-lg bg-cyan-950/90 border border-cyan-400 text-cyan-300 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center gap-3">
            <Zap className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span className="font-serif font-black tracking-widest text-xs uppercase">
              THE ÖZTÜRK CORE OVERDRIVE ACTIVE
            </span>
            <span className="font-mono font-bold text-amber-300 text-sm tabular-nums">
              {mindCore.overdriveTimeLeft.toFixed(1)}s
            </span>
          </div>
          <span className="text-[11px] text-cyan-400/80 mt-1.5 font-mono">
            SELECT INCOMING CORPORATE PROJECTILE TO REWRITE ATOMIC GEOMETRY
          </span>
        </div>
      )}

      {/* 3D In-World Interactive Projectiles Overlay */}
      {projectiles.map((proj) => {
        if (proj.intercepted) return null;
        const screenPos = projectToScreen(proj.position);
        if (!screenPos.visible) return null;

        const isHovered = hoveredProjId === proj.id;

        return (
          <div
            key={proj.id}
            style={{
              left: `${screenPos.x}px`,
              top: `${screenPos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (mindCore.overdriveActive) {
                onSelectProjectileForRewrite(proj);
              }
            }}
            onMouseEnter={() => setHoveredProjId(proj.id)}
            onMouseLeave={() => setHoveredProjId(null)}
            className={`absolute z-20 cursor-pointer group transition-transform ${
              mindCore.overdriveActive ? 'scale-125 animate-pulse' : 'scale-100'
            }`}
          >
            {/* Targeted Reticle */}
            <div
              className={`relative flex items-center justify-center w-8 h-8 rounded-full border ${
                proj.type === 'data_wipe_pulse'
                  ? 'border-red-500 bg-red-950/40 text-red-400'
                  : 'border-purple-400 bg-purple-950/40 text-purple-300'
              } ${mindCore.overdriveActive ? 'border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.8)]' : ''}`}
            >
              <Crosshair className="w-4 h-4" />
            </div>

            {/* Label in Overdrive Mode */}
            {mindCore.overdriveActive && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-black/80 border border-cyan-400/60 whitespace-nowrap text-[10px] font-mono text-cyan-300 pointer-events-none shadow-md">
                REWRITE: {proj.type.replace(/_/g, ' ')}
              </div>
            )}
          </div>
        );
      })}

      {/* Deployed Sovereign Flak Turrets Indicator */}
      {turrets.map((turret) => {
        const screenPos = projectToScreen(turret.position);
        if (!screenPos.visible) return null;
        return (
          <div
            key={turret.id}
            style={{
              left: `${screenPos.x}px`,
              top: `${screenPos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute z-10 pointer-events-none flex flex-col items-center"
          >
            <div className="w-5 h-5 rounded-sm rotate-45 border border-amber-400 bg-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.8)] flex items-center justify-center">
              <span className="text-[9px] font-mono font-bold text-amber-200 -rotate-45">T</span>
            </div>
          </div>
        );
      })}

      {/* Quiet HUD Viewport Indicators (Anti-slop compliant) */}
      <div className="absolute bottom-3 left-4 z-10 pointer-events-none flex items-center gap-3 text-[11px] font-mono text-slate-400">
        <span className="text-cyan-400">Pinch/Scroll to Penentrate Corridors</span>
        <span aria-hidden="true" className="text-slate-700">·</span>
        <span>Drag to Orbit</span>
        <span aria-hidden="true" className="text-slate-700">·</span>
        <span className="text-amber-400">Double Tap: Overdrive</span>
      </div>

      {/* Floating Overdrive Activation Quick Trigger for Desktop/Mobile */}
      <div className="absolute bottom-3 right-4 z-10">
        <button
          onClick={onTriggerOverdrive}
          disabled={mindCore.overdriveActive}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-serif text-xs uppercase font-bold tracking-wider transition-all cursor-pointer shadow-lg ${
            mindCore.overdriveActive
              ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200'
              : 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 active:scale-95'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Core Overdrive</span>
        </button>
      </div>
    </div>
  );
};
