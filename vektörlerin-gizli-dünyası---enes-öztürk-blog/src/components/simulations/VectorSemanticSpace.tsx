import React, { useState } from 'react';
import { Compass, Sparkles, MoveRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface VectorConcept {
  id: string;
  name: string;
  category: string;
  x: number; // 2D projection coordinates
  y: number;
  color: string;
}

const CONCEPTS: VectorConcept[] = [
  { id: 'kral', name: 'Kral', category: 'Rol/Cinsiyet', x: 0.65, y: 0.75, color: '#f59e0b' },
  { id: 'kralice', name: 'Kraliçe', category: 'Rol/Cinsiyet', x: 0.70, y: 0.25, color: '#ec4899' },
  { id: 'erkek', name: 'Erkek', category: 'Cinsiyet', x: 0.15, y: 0.75, color: '#3b82f6' },
  { id: 'kadin', name: 'Kadın', category: 'Cinsiyet', x: 0.20, y: 0.25, color: '#a855f7' },
  { id: 'paris', name: 'Paris', category: 'Başkent', x: -0.65, y: 0.55, color: '#06b6d4' },
  { id: 'fransa', name: 'Fransa', category: 'Ülke', x: -0.80, y: 0.15, color: '#3b82f6' },
  { id: 'ankara', name: 'Ankara', category: 'Başkent', x: -0.20, y: 0.50, color: '#10b981' },
  { id: 'turkiye', name: 'Türkiye', category: 'Ülke', x: -0.35, y: 0.10, color: '#ef4444' },
  { id: 'python', name: 'Python', category: 'Teknoloji', x: 0.10, y: -0.60, color: '#6366f1' },
  { id: 'veri_bilimi', name: 'Veri Bilimi', category: 'Teknoloji', x: 0.35, y: -0.75, color: '#8b5cf6' },
];

export const VectorSemanticSpace: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<'monarch' | 'capitals' | 'custom'>('monarch');
  const [vectorA, setVectorA] = useState<string>('kral');
  const [vectorB, setVectorB] = useState<string>('erkek');
  const [vectorC, setVectorC] = useState<string>('kadin');
  const [showArrowProjection, setShowArrowProjection] = useState<boolean>(true);

  const getConcept = (id: string) => CONCEPTS.find((c) => c.id === id) || CONCEPTS[0];

  const objA = getConcept(vectorA);
  const objB = getConcept(vectorB);
  const objC = getConcept(vectorC);

  // Target resulting point: A - B + C
  const targetX = objA.x - objB.x + objC.x;
  const targetY = objA.y - objB.y + objC.y;

  // Find closest concept to target
  let closestConcept = CONCEPTS[0];
  let minDistance = Infinity;

  CONCEPTS.forEach((c) => {
    // Avoid picking one of the components if possible, or calculate pure distance
    const dist = Math.hypot(c.x - targetX, c.y - targetY);
    if (dist < minDistance) {
      minDistance = dist;
      closestConcept = c;
    }
  });

  // Cosine similarity between A and B
  const dotProd = objA.x * objB.x + objA.y * objB.y;
  const magA = Math.hypot(objA.x, objA.y) || 1;
  const magB = Math.hypot(objB.x, objB.y) || 1;
  const cosSim = dotProd / (magA * magB);
  const angleDeg = Math.round((Math.acos(Math.max(-1, Math.min(1, cosSim))) * 180) / Math.PI);

  const applyPreset = (preset: 'monarch' | 'capitals') => {
    setSelectedPreset(preset);
    if (preset === 'monarch') {
      setVectorA('kral');
      setVectorB('erkek');
      setVectorC('kadin');
    } else {
      setVectorA('paris');
      setVectorB('fransa');
      setVectorC('turkiye');
    }
  };

  // Canvas scaling: from [-1, 1] to [0, 360]
  const toCanvasX = (val: number) => ((val + 1.2) / 2.4) * 360;
  const toCanvasY = (val: number) => ((-val + 1.2) / 2.4) * 280;

  return (
    <div className="my-10 rounded-2xl border border-stone-200 bg-stone-900 text-stone-100 p-6 md:p-8 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm shadow-purple-500/20">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-sans-ui text-lg font-bold text-white">
              Laboratuvar #3: Vektör Aritmetiği & Anlamsal Geometri
            </h4>
            <p className="text-xs text-stone-400 font-sans-ui">
              "Kral - Erkek + Kadın = Kraliçe" cebirinin ardındaki gizli geometri
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => applyPreset('monarch')}
            className={`px-3 py-1 text-xs rounded-lg font-sans-ui transition-colors ${
              selectedPreset === 'monarch' ? 'bg-purple-600 text-white font-bold' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            Kral / Kraliçe
          </button>
          <button
            onClick={() => applyPreset('capitals')}
            className={`px-3 py-1 text-xs rounded-lg font-sans-ui transition-colors ${
              selectedPreset === 'capitals' ? 'bg-purple-600 text-white font-bold' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            Başkentler (Paris / Ankara)
          </button>
        </div>
      </div>

      {/* Arithmetic Formula Display */}
      <div className="mt-5 rounded-xl bg-stone-800/80 p-4 border border-stone-700/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-sm md:text-base">
          <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
            {objA.name}
          </span>
          <span className="text-stone-400 font-black text-lg">−</span>
          <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
            {objB.name}
          </span>
          <span className="text-stone-400 font-black text-lg">+</span>
          <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30">
            {objC.name}
          </span>
          <span className="text-stone-400 font-black text-lg">≈</span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/40 text-base shadow-sm">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            {closestConcept.name}
          </span>
        </div>

        <div className="text-xs text-stone-400 font-sans-ui">
          Hedefe En Yakın Vektör: <span className="font-mono text-emerald-400 font-bold">{closestConcept.name}</span> (Mesafe: {minDistance.toFixed(3)})
        </div>
      </div>

      {/* 2D Projected Canvas Vector Field */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 relative bg-stone-950 rounded-xl border border-stone-800 p-4 overflow-hidden">
          <div className="absolute top-2 left-3 text-[11px] font-mono text-stone-500">
            2D Latent Projeksiyon (PCA / t-SNE Görünümü)
          </div>

          <svg viewBox="0 0 360 280" className="w-full h-64 md:h-72">
            {/* Grid axes */}
            <line x1="0" y1="140" x2="360" y2="140" stroke="#333" strokeDasharray="3 3" />
            <line x1="180" y1="0" x2="180" y2="280" stroke="#333" strokeDasharray="3 3" />

            {/* Arithmetic vector arrows */}
            {showArrowProjection && (
              <>
                {/* Vector from B to A (Gender difference vector) */}
                <line
                  x1={toCanvasX(objB.x)}
                  y1={toCanvasY(objB.y)}
                  x2={toCanvasX(objA.x)}
                  y2={toCanvasY(objA.y)}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                {/* Vector from C to Target (Parallel shift) */}
                <line
                  x1={toCanvasX(objC.x)}
                  y1={toCanvasY(objC.y)}
                  x2={toCanvasX(targetX)}
                  y2={toCanvasY(targetY)}
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
                {/* Calculated Result Marker */}
                <circle
                  cx={toCanvasX(targetX)}
                  cy={toCanvasY(targetY)}
                  r="6"
                  fill="#10b981"
                  className="animate-pulse"
                />
              </>
            )}

            {/* Plot all concept points */}
            {CONCEPTS.map((c) => {
              const cx = toCanvasX(c.x);
              const cy = toCanvasY(c.y);
              const isSelected = c.id === vectorA || c.id === vectorB || c.id === vectorC;
              const isResult = c.id === closestConcept.id;

              return (
                <g key={c.id} className="cursor-pointer">
                  {/* Origin line */}
                  <line
                    x1="180"
                    y1="140"
                    x2={cx}
                    y2={cy}
                    stroke={c.color}
                    strokeOpacity={isSelected ? '0.4' : '0.1'}
                    strokeWidth="1"
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isResult ? 7 : isSelected ? 6 : 4}
                    fill={c.color}
                    stroke={isResult ? '#fff' : '#1c1917'}
                    strokeWidth="2"
                  />
                  <text
                    x={cx + 8}
                    y={cy + 4}
                    fill={isResult ? '#34d399' : '#e5e5e5'}
                    fontSize={isResult ? '12' : '10'}
                    fontWeight={isResult || isSelected ? 'bold' : 'normal'}
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    {c.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Info: Angle & Orthogonality Intuition */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl bg-stone-800/60 border border-stone-700/60 p-4">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-mono block">
              Açısal Geometri (Kosinüs)
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-sm font-sans-ui text-stone-200">
                {objA.name} ↔ {objB.name} Açısı:
              </span>
              <span className="font-mono text-lg font-bold text-amber-400">
                {angleDeg}°
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between text-xs text-stone-400 font-mono">
              <span>Kosinüs Benzerliği:</span>
              <span className="text-white font-semibold">{cosSim.toFixed(3)}</span>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-700/50 text-xs text-stone-300 font-sans-ui leading-relaxed">
              Yüksek boyutlarda rastgele iki vektörün açısı daima <strong>90° (dik)</strong> civarındadır.
              Bu sayede yapay zeka aynı vektör uzayında milyonlarca farklı kavramı birbirine dolanmadan saklayabilir!
            </div>
          </div>

          <div className="rounded-xl bg-purple-950/40 border border-purple-800/40 p-4 text-xs text-purple-200 leading-relaxed font-sans-ui">
            <strong className="text-purple-300 block mb-1">Sezgisel Çıkarım:</strong>
            Yapay zeka modelleri sözlük ezberlemez; anlamları geometrik yönler olarak kodlar.
            "Kral" ile "Erkek" arasındaki yön farkı, tam olarak "Kraliçe" ile "Kadın" arasındaki yön farkına eşittir.
          </div>
        </div>
      </div>
    </div>
  );
};
