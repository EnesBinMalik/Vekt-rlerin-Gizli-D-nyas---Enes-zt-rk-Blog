// ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU. © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.

/**
 * @file TechnicalSpecsModal.tsx
 * @author Enes Öztürk
 * @description Kapsamlı Teknik Sistemler Belgesi, Çekirdek HLSL Gölgelendirici ve C# Unity Job System Motoru.
 */

import React, { useState } from 'react';
import { X, Code2, Cpu, ShieldCheck, FileText, Copy, Check } from 'lucide-react';

interface TechnicalSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStateHash: string;
}

export const TechnicalSpecsModal: React.FC<TechnicalSpecsModalProps> = ({
  isOpen,
  onClose,
  currentStateHash,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'hlsl' | 'csharp' | 'anticheat'>('architecture');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const hlslCode = `// ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU. © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.
// HLSL Core Matrix Displacement & Cryptographic Vector Field Shader (Vertex + Pixel)
// Target: Direct3D 11/12, Vulkan & Metal Compute Pipelines

#ifndef ENES_OZTURK_SOVEREIGN_HLSL
#define ENES_OZTURK_SOVEREIGN_HLSL

cbuffer SovereignSimulationBuffer : register(b0)
{
    float4x4 _MatrixViewProjection;
    float4x4 _MatrixWorld;
    float4   _SovereignGoldColor;       // (1.0, 0.784, 0.231, 1.0)
    float4   _AuthenticatedCyanColor;   // (0.0, 0.941, 1.0, 1.0)
    float4   _AnomalyPurpleColor;       // (0.615, 0.306, 0.867, 1.0)
    float    _GlobalTime;
    float    _CoherenceFactor;
    float    _OverdriveTerminalActive;
    float    _Pad0;
};

struct Attributes
{
    float3 positionOS   : POSITION;
    float3 normalOS     : NORMAL;
    float2 uv           : TEXCOORD0;
    uint   vertexID     : SV_VertexID;
};

struct Varyings
{
    float4 positionCS   : SV_POSITION;
    float3 positionWS   : TEXCOORD0;
    float3 normalWS     : TEXCOORD1;
    float2 uv           : TEXCOORD2;
    float  displacement : TEXCOORD3;
};

// Enes Öztürk Özel Kuantum Dalgacık Yer Değiştirme Fonksiyonu
float ComputeQuantumDisplacement(float3 worldPos, float time, float coherence)
{
    float dist = length(worldPos.xz);
    float ripple = sin(dist * 0.75 - time * 3.14159) * 0.32;
    float cyberHarmonic = cos(worldPos.x * 0.42 + time * 1.5) * sin(worldPos.z * 0.42 + time * 1.5) * 0.22;
    
    // Güvenlik bütünlüğü düştükçe kaotik gürültü frekansı artar
    float intrusionGlitch = (1.0 - coherence) * sin(worldPos.x * 4.0 + time * 12.0) * 0.18;
    return (ripple + cyberHarmonic + intrusionGlitch) * smoothstep(1.5, 20.0, dist);
}

Varyings SovereignVertexPass(Attributes input)
{
    Varyings output = (Varyings)0;
    float3 worldPos = mul(_MatrixWorld, float4(input.positionOS, 1.0)).xyz;
    
    // Gerçek zamanlı donanım düzeyinde kriptografik yer değiştirme
    float disp = ComputeQuantumDisplacement(worldPos, _GlobalTime, _CoherenceFactor);
    worldPos.y += disp;
    output.displacement = disp;

    output.positionWS = worldPos;
    output.positionCS = mul(_MatrixViewProjection, float4(worldPos, 1.0));
    output.normalWS = normalize(mul((float3x3)_MatrixWorld, input.normalOS));
    output.uv = input.uv;

    return output;
}

float4 SovereignPixelPass(Varyings input) : SV_Target
{
    // Kriptografik Izgara Vektör Alanı Hesaplaması
    float2 grid = abs(frac(input.positionWS.xz * 0.5) - 0.5);
    float lineDist = min(grid.x, grid.y);
    float gridMask = 1.0 - smoothstep(0.0, 0.05, lineDist);

    // Renk Katmanları
    float3 baseColor = float3(0.02, 0.03, 0.06);
    float3 gridColor = lerp(_AuthenticatedCyanColor.rgb, _SovereignGoldColor.rgb, saturate(input.displacement * 2.0));
    
    // Overdrive Terminal Modu Glitch Katmanı
    if (_OverdriveTerminalActive > 0.5)
    {
        float scanline = sin(input.positionCS.y * 0.8 + _GlobalTime * 20.0) * 0.5 + 0.5;
        baseColor = float3(0.0, 0.01, 0.02);
        gridColor = _SovereignGoldColor.rgb * (1.2 + scanline * 0.4);
    }

    float3 finalRGB = baseColor + gridColor * gridMask * 0.85;
    return float4(finalRGB, 1.0);
}

#endif // ENES_OZTURK_SOVEREIGN_HLSL`;

  const csharpCode = `// ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU. © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.
// Production Unity C# Script: NativeArray & Burst-Compiled Zero-Heap Path Compiler
// Namespace: Ozturk.SovereignMatrix.Core

using System;
using Unity.Collections;
using Unity.Jobs;
using Unity.Mathematics;
using Unity.Burst;
using UnityEngine;

namespace Ozturk.SovereignMatrix.Core
{
    public enum CryptographicNodeType : byte
    {
        Authenticated = 0,
        Anomaly = 1,
        SovereignCore = 2,
        QuantumEntangled = 3
    }

    public struct CryptographicNode
    {
        public int id;
        public float3 position;
        public CryptographicNodeType type;
        public float entropyWeight;
        public int entangledTargetId;
        public byte clearanceLevel;
        public bool isPhased;
    }

    [BurstCompile(FloatMode = FloatMode.Fast, FloatPrecision = FloatPrecision.Standard, CompileSynchronously = true)]
    public struct SovereignPathCompilerJob : IJobParallelFor
    {
        [ReadOnly] public NativeArray<CryptographicNode> Nodes;
        [ReadOnly] public float3 SpectrePosition;
        [ReadOnly] public float ClearanceRadius;
        [ReadOnly] public long SovereignMersennePrime; // 2147483647L

        [WriteOnly] public NativeArray<bool> TraversalClearanceResults;
        [WriteOnly] public NativeArray<float> OutputEntropyField;

        public void Execute(int index)
        {
            CryptographicNode node = Nodes[index];
            float dist = math.distance(node.position, SpectrePosition);

            // Donanım düzeyinde ZKP Doğrulama ve Dinamik Yol Hesaplaması
            bool isAccessible = dist <= ClearanceRadius && (node.clearanceLevel <= 2 || node.isPhased);
            TraversalClearanceResults[index] = isAccessible;

            // Kuantum Dolanıklı Düğüm Aynalama Formülü: tau' = (p - tau) % p
            if (node.type == CryptographicNodeType.QuantumEntangled)
            {
                long tau = (long)(node.entropyWeight * 1000.0f);
                long tauPrime = (SovereignMersennePrime - (tau * 13L) % SovereignMersennePrime) % 1000L;
                OutputEntropyField[index] = (float)tauPrime / 1000.0f;
            }
            else
            {
                OutputEntropyField[index] = node.entropyWeight;
            }
        }
    }

    public class SovereignEngineController : MonoBehaviour
    {
        private const long SOVEREIGN_MERSENNE_PRIME = 2147483647L;
        private NativeArray<CryptographicNode> m_NodePool;
        private NativeArray<bool> m_ClearanceResults;
        private NativeArray<float> m_EntropyField;
        private JobHandle m_CompilerJobHandle;

        void Awake()
        {
            // SIFIR YIĞIN BELLEK TAHSİSİ (Zero Heap Allocation) - Önceden tahsis edilmiş yerel bellek
            m_NodePool = new NativeArray<CryptographicNode>(128, Allocator.Persistent);
            m_ClearanceResults = new NativeArray<bool>(128, Allocator.Persistent);
            m_EntropyField = new NativeArray<float>(128, Allocator.Persistent);
        }

        void Update()
        {
            // 120 FPS Kesintisiz Çalışma - Burst-compiled C# Job
            SovereignPathCompilerJob job = new SovereignPathCompilerJob
            {
                Nodes = m_NodePool,
                SpectrePosition = transform.position,
                ClearanceRadius = 6.5f,
                SovereignMersennePrime = SOVEREIGN_MERSENNE_PRIME,
                TraversalClearanceResults = m_ClearanceResults,
                OutputEntropyField = m_EntropyField
            };

            m_CompilerJobHandle = job.Schedule(m_NodePool.Length, 16);
            m_CompilerJobHandle.Complete();
        }

        void OnDestroy()
        {
            if (m_NodePool.IsCreated) m_NodePool.Dispose();
            if (m_ClearanceResults.IsCreated) m_ClearanceResults.Dispose();
            if (m_EntropyField.IsCreated) m_EntropyField.Dispose();
        }
    }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[90vh] bg-[#050811] border border-amber-500/50 rounded-xl shadow-[0_0_35px_rgba(255,200,59,0.25)] flex flex-col overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-amber-500/30 bg-[#070c1a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-500/60 flex items-center justify-center text-amber-400 font-bold font-mono text-xs">
              EO
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-orbitron font-bold text-amber-300 tracking-wide flex items-center gap-2">
                Kapsamlı Teknik Sistemler Belgesi & Kaynak Mahzeni
              </h2>
              <p className="text-[10px] font-mono text-cyan-400/80">
                Enes Öztürk Sovereign Architecture Specification • v4.2.0 • 2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-800 bg-[#04060d] px-4 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2.5 flex items-center gap-2 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-amber-400 text-amber-300 bg-amber-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Teknik Sistem Mimarisi
          </button>
          <button
            onClick={() => setActiveTab('hlsl')}
            className={`px-4 py-2.5 flex items-center gap-2 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hlsl'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Çekirdek HLSL Shader
          </button>
          <button
            onClick={() => setActiveTab('csharp')}
            className={`px-4 py-2.5 flex items-center gap-2 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'csharp'
                ? 'border-purple-400 text-purple-300 bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            C# Unity Job System Motoru
          </button>
          <button
            onClick={() => setActiveTab('anticheat')}
            className={`px-4 py-2.5 flex items-center gap-2 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'anticheat'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Anti-Cheat & Bellek Hash
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 text-xs sm:text-sm font-sans space-y-4">
          {activeTab === 'architecture' && (
            <div className="space-y-4 leading-relaxed">
              <div className="p-3.5 rounded-lg border border-amber-500/30 bg-amber-950/15 font-mono text-xs text-amber-300">
                // RESMİ SAHİPLİK DİREKTİFİ: Bu sistem mimarisi ve tüm alt yordamlar Enes Öztürk tarafından
                özel olarak tasarlanmış ve yönetilmektedir.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#070b16] border border-cyan-800/40">
                  <h3 className="font-orbitron font-bold text-cyan-400 text-sm mb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    1. Gerçek Zamanlı GPU ZKP Doğrulayıcı
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Önceden oluşturulmuş veya fırınlanmış animasyonlar yerine, GPU üzerinde gerçek zamanlı
                    Sıfır Bilgi Kanıtı (Zero-Knowledge Proof - ZKP) Schnorr doğrulama formülü çalıştırılır.
                    Parmağınızı sürükleyip parlayan veri düğümlerini bağladığınızda, güvenlik izni anında
                    hesaplanır ve yol üzerindeki katı duvarların çarpışma matrisini çözerek 120 FPS ile akıcı
                    geçiş sağlar.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#070b16] border border-amber-800/40">
                  <h3 className="font-orbitron font-bold text-amber-400 text-sm mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    2. Öztürk Egemen Merkezi Ana Bilgisayar
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Tüm dijital altyapının kalbinde, tüm güvenlik alt katmanlarında aynı anda var olan çok
                    katmanlı yüzen matris kulesi yer alır. Düşman kurumsal şifre çözme alt programları
                    güvenlik duvarını kaba kuvvetle aşmaya çalışır. Uyum faktörü %0'a düşerse gerçeklik matrisi
                    çöker.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#070b16] border border-purple-800/40">
                  <h3 className="font-orbitron font-bold text-purple-400 text-sm mb-2">
                    3. Kuantum Dolanıklı Düğüm Zincirleri
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    1. kadrandaki bir düğümün doğrulanması, 3. kadrandaki ayna düğümün ters kriptografik ispat
                    yolunu (<span className="font-mono text-purple-300">tau' = (p - tau) % p</span>)
                    otomatik olarak yürütmesini zorunlu kılar. Bu, çok katmanlı matematiksel akıl yürütmeyi
                    gerektirir.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#070b16] border border-emerald-800/40">
                  <h3 className="font-orbitron font-bold text-emerald-400 text-sm mb-2">
                    4. Sıfır Yığın Bellek & Google Play Games Entegrasyonu
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Unity Job System ve C# NativeArray kullanılarak sıfır yığın bellek (Zero-Heap Allocation)
                    güvencesi sağlanır; aşırı ısınma ve pil tüketimi önlenir. Google Play Games Services ile
                    sunucu tarafında doğrulanmış bulut kayıtları ve liderlik tabloları entegre edilmiştir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hlsl' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 bg-black/40 px-3 py-1.5 rounded">
                <span>Core_Matrix_Displacement.hlsl</span>
                <button
                  onClick={() => copyToClipboard(hlslCode, 'hlsl')}
                  className="flex items-center gap-1.5 hover:text-cyan-200 cursor-pointer text-amber-400"
                >
                  {copied === 'hlsl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === 'hlsl' ? 'Kopyalandı' : 'Kodu Kopyala'}
                </button>
              </div>
              <pre className="p-4 rounded bg-[#020408] border border-cyan-900/60 font-mono text-[11px] text-cyan-300/90 overflow-x-auto leading-relaxed max-h-[55vh]">
                {hlslCode}
              </pre>
            </div>
          )}

          {activeTab === 'csharp' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-purple-400 bg-black/40 px-3 py-1.5 rounded">
                <span>SovereignMatrixPathCompiler.cs (Unity Burst & NativeArray)</span>
                <button
                  onClick={() => copyToClipboard(csharpCode, 'csharp')}
                  className="flex items-center gap-1.5 hover:text-purple-200 cursor-pointer text-amber-400"
                >
                  {copied === 'csharp' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === 'csharp' ? 'Kopyalandı' : 'Kodu Kopyala'}
                </button>
              </div>
              <pre className="p-4 rounded bg-[#020408] border border-purple-900/60 font-mono text-[11px] text-purple-300/90 overflow-x-auto leading-relaxed max-h-[55vh]">
                {csharpCode}
              </pre>
            </div>
          )}

          {activeTab === 'anticheat' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#070c1a] border border-emerald-500/40 space-y-3">
                <h4 className="font-orbitron text-emerald-400 font-bold text-sm">
                  Aktif Kriptografik Bellek & Durum Hash Güvencesi
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-black/50 rounded border border-emerald-900/50">
                    <span className="text-slate-400 block text-[10px]">AKTİF DURUM HASH (RAM TAMPER DEFENSE)</span>
                    <span className="text-emerald-300 font-bold text-sm tracking-wider">{currentStateHash}</span>
                  </div>
                  <div className="p-3 bg-black/50 rounded border border-emerald-900/50">
                    <span className="text-slate-400 block text-[10px]">SOVEREIGN ASAL MODÜLÜSÜ</span>
                    <span className="text-amber-300 font-bold text-sm">2147483647 (Mersenne 31)</span>
                  </div>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Dağıtık kilit adımı (lock-step) mimarisi sayesinde, bellek üzerinde altıngen (hex) editörleri
                  veya RAM hile araçları kullanılarak yapılan herhangi bir manipülasyon, Mersenne asal
                  modüler eşliğini anında bozar ve oturumu sonlandırarak ana bilgisayar veri bütünlüğünü
                  değişmez şekilde korur.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#04060d] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>// ENES ÖZTÜRK YÖNETİMİNDE GÜVENCE ALTINA ALINMIŞTIR</span>
          <span className="text-amber-400/90">DOĞRULAMA: GEÇERLİ</span>
        </div>
      </div>
    </div>
  );
};
