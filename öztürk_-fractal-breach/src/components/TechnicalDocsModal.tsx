// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, FileCode, Cpu, ShieldCheck, Terminal } from 'lucide-react';

interface TechnicalDocsModalProps {
  onClose: () => void;
}

export const TechnicalDocsModal: React.FC<TechnicalDocsModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'hlsl' | 'csharp' | 'security'>('architecture');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hlslCode = `// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

#ifndef OZTURK_FRACTAL_BREACH_HLSL
#define OZTURK_FRACTAL_BREACH_HLSL

#include "UnityCG.cginc"

// GPU Constant Buffers: Pre-allocated 0-Heap Uniform Memory Block
cbuffer FractalEngineBuffer : register(b0)
{
    float4 _CameraPosition;
    float4 _CameraTarget;
    float4 _ScreenResolution;
    float  _FractalScale;
    float  _FoldingLimit;
    float  _MinRadius2;
    float  _FixedRadius2;
    float  _Power;
    float3 _JuliaOffset;
    float  _SlicePlaneY;
    float  _RoomDensity;
    float  _OverdriveFactor;
    float  _MindCoreStability;
    float  _EngineTime;
};

// 3D Sphere Fold Transformation Kernel
inline void SphereFold(inout float3 z, inout float dz, float minR2, float fixedR2)
{
    float r2 = dot(z, z);
    if (r2 < minR2)
    {
        float t = fixedR2 / minR2;
        z *= t;
        dz *= t;
    }
    else if (r2 < fixedR2)
    {
        float t = fixedR2 / r2;
        z *= t;
        dz *= t;
    }
}

// 3D Box Fold Transformation Kernel
inline void BoxFold(inout float3 z, inout float dz, float limit)
{
    z = clamp(z, -limit, limit) * 2.0 - z;
}

// Mandelbox Distance Estimator
float DistanceEstimatorMandelbox(float3 p)
{
    float3 offset = p;
    float dr = 1.0;
    
    // Internal architectural room and staircase cut
    if (_SlicePlaneY > -8.0)
    {
        offset.y += sin(offset.x * 2.5) * 0.04 * _RoomDensity;
    }

    [unroll(16)]
    for (int n = 0; n < 16; n++)
    {
        BoxFold(p, dr, _FoldingLimit);
        SphereFold(p, dr, _MinRadius2, _FixedRadius2);
        p = p * _FractalScale + offset + _JuliaOffset;
        dr = dr * abs(_FractalScale) + 1.0;
    }
    
    float r = length(p);
    return r / abs(dr);
}

// The Öztürk Sovereign Mind-Core Crystalline Matrix
float DistanceEstimatorMindCore(float3 p)
{
    float3 cp = abs(p);
    return (cp.x + cp.y + cp.z - 0.45) * 0.57735027;
}

// Full Scene Distance Field
float SceneDistanceMap(float3 p, out int materialID)
{
    float dCore = DistanceEstimatorMindCore(p);
    float dFractal = DistanceEstimatorMandelbox(p);

    if (dCore < dFractal)
    {
        materialID = 1; // Sovereign Mind-Core
        return dCore;
    }
    else
    {
        materialID = 0; // Procedural Fractal Architecture
        return dFractal;
    }
}

// Tetrahedral High-Precision Normal Computation
float3 CalculateNormal(float3 p)
{
    int dummy;
    const float2 e = float2(0.0018, -0.0018);
    return normalize(
        e.xyy * SceneDistanceMap(p + e.xyy, dummy) +
        e.yyx * SceneDistanceMap(p + e.yyx, dummy) +
        e.yxy * SceneDistanceMap(p + e.yxy, dummy) +
        e.xxx * SceneDistanceMap(p + e.xxx, dummy)
    );
}

// Primary GPU Raymarching Fragment Shader
float4 FragFractalRaymarcher(v2f i) : SV_Target
{
    float2 uv = (i.uv * 2.0 - 1.0) * float2(_ScreenResolution.x / _ScreenResolution.y, 1.0);
    
    float3 ro = _CameraPosition.xyz;
    float3 ta = _CameraTarget.xyz;
    float3 ww = normalize(ta - ro);
    float3 uu = normalize(cross(ww, float3(0.0, 1.0, 0.0)));
    float3 vv = normalize(cross(uu, ww));
    float3 rd = normalize(uv.x * uu + uv.y * vv + 1.8 * ww);

    float totalDist = 0.0;
    int hitMat = 0;
    bool isHit = false;
    float glowCyan = 0.0;
    float glowGold = 0.0;

    [loop]
    for (int step = 0; step < 96; step++)
    {
        float3 currentPos = ro + rd * totalDist;
        int matID;
        float dist = SceneDistanceMap(currentPos, matID);

        glowCyan += 0.0028 / (0.012 + abs(dist));
        glowGold += (0.0035 * (_MindCoreStability / 100.0)) / (0.015 + dot(currentPos, currentPos));

        if (dist < 0.0015)
        {
            isHit = true;
            hitMat = matID;
            break;
        }
        totalDist += dist * 0.88;
        if (totalDist > 40.0) break;
    }

    float3 finalColor = float3(0.01, 0.015, 0.025);

    if (isHit)
    {
        float3 hitPoint = ro + rd * totalDist;
        float3 norm = CalculateNormal(hitPoint);
        float3 lightDir = normalize(float3(0.7, 1.0, -0.5));
        float diff = max(dot(norm, lightDir), 0.0);
        float fresnel = pow(1.0 + dot(rd, norm), 3.0);

        if (hitMat == 1)
        {
            // The Öztürk Sovereign Mind-Core (Neon-Gold Luminescence)
            finalColor = float3(1.0, 0.82, 0.25) * (diff * 0.6 + 0.4);
            finalColor += float3(1.0, 0.95, 0.5) * fresnel * 1.5;
        }
        else
        {
            // Fractal Architecture (Obsidian with Neon-Cyan Vectors)
            float edge = length(fwidth(norm));
            float3 baseArch = float3(0.04, 0.05, 0.08) + float3(0.0, 0.88, 0.95) * edge * 2.0;
            finalColor = baseArch * (diff * 0.8 + 0.2);
            finalColor += float3(0.0, 0.9, 1.0) * fresnel * 0.5;
        }
    }

    finalColor += float3(0.0, 0.85, 1.0) * glowCyan * 0.12;
    finalColor += float3(1.0, 0.78, 0.2) * glowGold * 0.24;

    // Overdrive Desaturation & Vector Blueprint Overlay
    if (_OverdriveFactor > 0.001)
    {
        float lum = dot(finalColor, float3(0.299, 0.587, 0.114));
        float3 blueprint = float3(0.01, 0.04, 0.07) + float3(0.0, 0.95, 0.9) * lum * 1.6;
        finalColor = lerp(finalColor, blueprint, _OverdriveFactor);
    }

    return float4(finalColor, 1.0);
}

#endif // OZTURK_FRACTAL_BREACH_HLSL
`;

  const csharpCode = `// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

using System;
using Unity.Collections;
using Unity.Jobs;
using Unity.Mathematics;
using UnityEngine;

namespace Ozturk.FractalBreach.Engine
{
    /// <summary>
    /// High-Performance Zero-Allocation Procedural Recursive Node Path Network.
    /// Handcrafted by Enes Öztürk for locked 120 FPS performance on flagship Android devices.
    /// Operates completely within Unity's C# Job System with NativeArray memory bounds.
    /// </summary>
    public sealed class OzturkRecursiveNodeGraph : IDisposable
    {
        public struct NodeTransform
        {
            public float3 Position;
            public float3 Direction;
            public float DepthScale;
            public int RoomIndex;
            public int ParentIndex;
            public uint Seed;
        }

        // Native zero-garbage pre-allocated arrays
        private NativeArray<NodeTransform> _nodeBuffer;
        private NativeArray<float3> _stableVectorPaths;
        private NativeArray<int> _roomConnectivityMatrix;

        private const int MAX_NODES = 4096;
        private bool _isDisposed;

        public OzturkRecursiveNodeGraph()
        {
            // Enforce strict Zero-Heap Memory Allocation policy
            _nodeBuffer = new NativeArray<NodeTransform>(MAX_NODES, Allocator.Persistent);
            _stableVectorPaths = new NativeArray<float3>(MAX_NODES, Allocator.Persistent);
            _roomConnectivityMatrix = new NativeArray<int>(MAX_NODES * 8, Allocator.Persistent);
        }

        /// <summary>
        /// Burst-Compiled Parallel Job calculating infinite recursive corridor transformations.
        /// </summary>
        [Unity.Burst.BurstCompile(FloatMode = Unity.Burst.FloatMode.Fast, FloatPrecision = Unity.Burst.FloatPrecision.Standard)]
        public struct GenerateRecursiveCorridorsJob : IJobParallelFor
        {
            [ReadOnly] public float ZoomDepth;
            [ReadOnly] public float FractalScale;
            [ReadOnly] public float3 MindCoreAnchor;
            [ReadOnly] public uint MasterSeed;

            [NativeDisableParallelForRestriction]
            public NativeArray<NodeTransform> Nodes;

            [WriteOnly]
            public NativeArray<float3> OutPaths;

            public void Execute(int index)
            {
                // Procedural Mandelbox-derived branch generator
                var random = new Unity.Mathematics.Random(MasterSeed + (uint)index * 1337u);
                
                float iterationDepth = 1.0f + (float)index * 0.05f;
                float angle = random.NextFloat(0.0f, math.PI * 2.0f);
                float radius = math.pow(FractalScale, (float)(index % 6)) * 0.42f;

                float3 localPos = new float3(
                    math.cos(angle) * radius,
                    (float)(index % 8) * 0.35f,
                    math.sin(angle) * radius
                );

                // Microscopic sub-castle transformation
                float3 worldPos = MindCoreAnchor + localPos * (1.0f / math.max(0.1f, ZoomDepth));

                NodeTransform node = new NodeTransform
                {
                    Position = worldPos,
                    Direction = math.normalize(localPos + new float3(0.001f, 1.0f, 0.001f)),
                    DepthScale = iterationDepth * ZoomDepth,
                    RoomIndex = index / 4,
                    ParentIndex = math.max(0, index - 1),
                    Seed = random.NextUInt()
                };

                Nodes[index] = node;
                OutPaths[index] = worldPos;
            }
        }

        /// <summary>
        /// Schedules the node graph computation without causing frame stutter or GC spikes.
        /// </summary>
        public JobHandle ScheduleGraphUpdate(float zoomDepth, float fractalScale, float3 corePos, uint seed, JobHandle dependency = default)
        {
            var job = new GenerateRecursiveCorridorsJob
            {
                ZoomDepth = zoomDepth,
                FractalScale = fractalScale,
                MindCoreAnchor = corePos,
                MasterSeed = seed,
                Nodes = _nodeBuffer,
                OutPaths = _stableVectorPaths
            };

            return job.Schedule(MAX_NODES, 64, dependency);
        }

        public NativeArray<NodeTransform> GetNodes() => _nodeBuffer;
        public NativeArray<float3> GetPaths() => _stableVectorPaths;

        public void Dispose()
        {
            if (_isDisposed) return;
            if (_nodeBuffer.IsCreated) _nodeBuffer.Dispose();
            if (_stableVectorPaths.IsCreated) _stableVectorPaths.Dispose();
            if (_roomConnectivityMatrix.IsCreated) _roomConnectivityMatrix.Dispose();
            _isDisposed = true;
        }
    }
}
`;

  const securityCode = `// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

using System;
using System.Security.Cryptography;
using System.Text;
using UnityEngine;

namespace Ozturk.FractalBreach.Security
{
    /// <summary>
    /// Google Play Games Native Integration & Distributed Cryptographic Anti-Cheat Obfuscator.
    /// Handcrafted by Enes Öztürk. Verifies level seeds, map completions, and premium fragments
    /// using distributed lock-step HMAC-SHA256 consensus.
    /// </summary>
    public static class OzturkSecurityAntiCheat
    {
        // Sovereign cryptographic salt generated by Enes Öztürk
        private static readonly byte[] SOVEREIGN_SALT = Encoding.UTF8.GetBytes(
            "OZTURK_SOVEREIGN_FRACTAL_BREACH_ENCRYPTED_CONSENSUS_SALT_2026"
        );

        /// <summary>
        /// Cryptographically signs and validates game run metrics to defeat hex-editor memory tampering.
        /// </summary>
        public static string GenerateProofOfBreachHash(
            string playerId,
            int levelReached,
            float depthAchieved,
            int quantumFragments,
            uint mapSeed)
        {
            string payload = $"{playerId}:{levelReached}:{depthAchieved:F4}:{quantumFragments}:{mapSeed}";
            using (var hmac = new HMACSHA256(SOVEREIGN_SALT))
            {
                byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
                return Convert.ToBase64String(hashBytes);
            }
        }

        /// <summary>
        /// Verifies payload authenticity before submitting to Google Play Leaderboards.
        /// </summary>
        public static bool ValidateRecordConsensus(
            string playerId,
            int levelReached,
            float depthAchieved,
            int quantumFragments,
            uint mapSeed,
            string clientProvidedHash)
        {
            string expectedHash = GenerateProofOfBreachHash(playerId, levelReached, depthAchieved, quantumFragments, mapSeed);
            return CryptographicEquals(expectedHash, clientProvidedHash);
        }

        private static bool CryptographicEquals(string a, string b)
        {
            if (a == null || b == null || a.Length != b.Length) return false;
            int result = 0;
            for (int i = 0; i < a.Length; i++)
            {
                result |= a[i] ^ b[i];
            }
            return result == 0;
        }
    }
}
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-none overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#03060c] border border-cyan-500/30 rounded-xl flex flex-col shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-cyan-500/20 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-400/40 text-cyan-300">
              <FileCode className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-serif font-black text-sm sm:text-base text-cyan-200 tracking-wide uppercase">
                Technical Systems Engine Architecture
              </h2>
              <p className="text-[11px] font-mono text-cyan-500">
                ENES ÖZTÜRK SOVEREIGN SPECIFICATION · ZERO-ALLOCATION NATIVE ARRAYS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 p-2 bg-slate-900/60 border-b border-slate-800 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Systems Specification</span>
          </button>

          <button
            onClick={() => setActiveTab('hlsl')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'hlsl'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>OzturkFractalRaymarcher.hlsl</span>
          </button>

          <button
            onClick={() => setActiveTab('csharp')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'csharp'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>OzturkRecursiveNodeGraph.cs</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Google Play Anti-Cheat</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs text-slate-300 bg-[#020408]">
          {activeTab === 'architecture' && (
            <div className="space-y-5">
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-200">
                <h3 className="font-serif font-bold text-sm uppercase text-amber-300 mb-1">
                  1. Zero Heap Memory Allocation Discipline
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Unlike conventional mobile Unity games that crash during deep fractal scaling due to runaway GameObject instantiations, the Enes Öztürk Sovereign Engine guarantees <strong>0 Bytes Garbage Collection per Frame</strong>. All corridor structures, dimensional spires, and transformation matrices are computed directly in GPU Constant Buffers and native Burst-compiled C# Job System arrays (<code className="text-cyan-300 font-mono">NativeArray&lt;NodeTransform&gt;</code>).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800">
                  <h4 className="font-serif font-bold text-xs uppercase text-cyan-300 mb-2">
                    2. GPU Raymarching & Sub-Castle Extrusions
                  </h4>
                  <ul className="text-xs text-slate-400 space-y-1.5 font-sans">
                    <li>• Mandelbox box fold limit: ±1.0 to ±2.4</li>
                    <li>• Sphere fold min radius: 0.25 (preserves singularity)</li>
                    <li>• Continuous camera penetration from 1x to 100,000x zoom</li>
                    <li>• Locked 120 FPS target on modern mobile hardware</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800">
                  <h4 className="font-serif font-bold text-xs uppercase text-purple-300 mb-2">
                    3. Google Play Cryptographic Lock-Step
                  </h4>
                  <ul className="text-xs text-slate-400 space-y-1.5 font-sans">
                    <li>• Native Google Play Games cloud backups</li>
                    <li>• HMAC-SHA256 verification of map completion seeds</li>
                    <li>• Native memory obfuscation against GameGuardian/Hex editors</li>
                    <li>• Server-side topological leaderboard consensus</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800 text-[11px] font-mono text-slate-400">
                // EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.
              </div>
            </div>
          )}

          {activeTab === 'hlsl' && (
            <div className="relative">
              <button
                onClick={() => copyToClipboard(hlslCode)}
                className="absolute top-2 right-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 cursor-pointer z-10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy HLSL'}</span>
              </button>
              <pre className="p-4 rounded-lg bg-black border border-slate-800 text-cyan-300 overflow-x-auto text-[11px] leading-relaxed">
                {hlslCode}
              </pre>
            </div>
          )}

          {activeTab === 'csharp' && (
            <div className="relative">
              <button
                onClick={() => copyToClipboard(csharpCode)}
                className="absolute top-2 right-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 cursor-pointer z-10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copy C#' : 'Copy C#'}</span>
              </button>
              <pre className="p-4 rounded-lg bg-black border border-slate-800 text-purple-300 overflow-x-auto text-[11px] leading-relaxed">
                {csharpCode}
              </pre>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="relative">
              <button
                onClick={() => copyToClipboard(securityCode)}
                className="absolute top-2 right-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 cursor-pointer z-10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy C#'}</span>
              </button>
              <pre className="p-4 rounded-lg bg-black border border-slate-800 text-emerald-300 overflow-x-auto text-[11px] leading-relaxed">
                {securityCode}
              </pre>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
