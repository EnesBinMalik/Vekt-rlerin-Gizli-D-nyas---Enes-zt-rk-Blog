import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Eye, Sparkles } from 'lucide-react';

export const CircleAreaUnroller: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [ringCount, setRingCount] = useState<number>(10);
  const [showFormulas, setShowFormulas] = useState<boolean>(true);

  const radius = 100;

  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      animId = window.requestAnimationFrame(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            setIsPlaying(false);
            return 1;
          }
          return Math.min(1, prev + 0.008);
        });
      });
    }
    return () => window.cancelAnimationFrame(animId);
  }, [isPlaying, progress]);

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  // Generate rings
  const rings = Array.from({ length: ringCount }, (_, i) => {
    const fraction = (i + 1) / ringCount;
    const ringRadius = radius * fraction;
    const circumference = 2 * Math.PI * ringRadius;
    const thickness = radius / ringCount;
    return {
      index: i,
      fraction,
      ringRadius,
      circumference,
      thickness,
      color: `hsl(${25 + (i / ringCount) * 45}, 85%, ${48 + (i % 2) * 6}%)`,
    };
  });

  return (
    <div className="my-8 rounded-xl border border-stone-300/80 bg-stone-50/70 p-5 md:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200/80 gap-3">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
            İnteraktif Deney 01
          </span>
          <h4 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
            Çemberin Alanı Neden πr²? (Soğan Katmanlarını Açma)
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Duraklat
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> {progress >= 1 ? 'Yeniden Oynat' : 'Açılmayı Başlat'}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            title="Sıfırla"
            className="p-1.5 text-stone-600 hover:text-stone-900 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas / SVG Stage */}
      <div className="relative mt-6 flex flex-col items-center justify-center min-h-[340px] bg-white rounded-lg border border-stone-200/80 p-4 overflow-hidden">
        <svg
          viewBox="0 0 760 320"
          className="w-full h-auto max-h-[320px] select-none"
        >
          {/* Grid background reference lines */}
          <line x1="20" y1="280" x2="740" y2="280" stroke="#E7E5E4" strokeWidth="1.5" />
          <line x1="420" y1="280" x2="420" y2="60" stroke="#E7E5E4" strokeDasharray="3 3" />

          {/* Left Zone: Circular concentric view */}
          <g transform="translate(180, 160)">
            <text x="0" y="-120" textAnchor="middle" className="text-xs font-sans fill-stone-500 font-medium">
              Eşmerkezli Halka Katmanları (Soğan Modeli)
            </text>
            <circle cx="0" cy="0" r={radius} fill="none" stroke="#D6D3D1" strokeDasharray="4 4" />
            
            {rings.map((ring) => {
              // Fade out circles as progress increases
              const ringOpacity = Math.max(0.12, 1 - progress * 0.95);
              return (
                <circle
                  key={`circ-${ring.index}`}
                  cx="0"
                  cy="0"
                  r={ring.ringRadius}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={ring.thickness * 0.9}
                  opacity={ringOpacity}
                />
              );
            })}

            {/* Radius line */}
            <line x1="0" y1="0" x2={radius} y2="0" stroke="#9A3412" strokeWidth="2" />
            <circle cx="0" cy="0" r="3" fill="#9A3412" />
            <text x={radius / 2} y="-6" textAnchor="middle" className="text-xs font-serif italic fill-[#9A3412] font-semibold">
              r
            </text>
          </g>

          {/* Transformation Arrow */}
          <g transform="translate(345, 160)">
            <path
              d="M 0,0 L 35,0 M 25,-6 L 35,0 L 25,6"
              fill="none"
              stroke="#A8A29E"
              strokeWidth="2"
            />
            <text x="18" y="-14" textAnchor="middle" className="text-[11px] font-sans fill-stone-500">
              Kes & Düzleştir
            </text>
          </g>

          {/* Right Zone: Unrolled Strip / Triangle transformation */}
          <g transform="translate(420, 280)">
            <text x="140" y="-240" textAnchor="middle" className="text-xs font-sans fill-stone-500 font-medium">
              Açılan Şeritler → Dik Üçgen
            </text>

            {/* Triangle reference outline */}
            <polygon
              points={`0,0 ${2 * Math.PI * radius * 0.42},0 0,${-radius * 1.8}`}
              fill="rgba(154, 52, 18, 0.05)"
              stroke="#E2E8F0"
              strokeDasharray="4 4"
            />

            {rings.map((ring) => {
              // As progress increases, the ring uncurls into a straight strip
              const maxStripLen = ring.circumference * 0.42; // scaled for svg
              const stripY = -ring.ringRadius * 1.8;
              const stripWidth = maxStripLen * progress;
              const curX = 0;

              return (
                <rect
                  key={`strip-${ring.index}`}
                  x={curX}
                  y={stripY}
                  width={Math.max(2, stripWidth)}
                  height={ring.thickness * 1.6}
                  fill={ring.color}
                  rx="1"
                  opacity={0.15 + progress * 0.85}
                  style={{ transition: 'opacity 0.2s ease' }}
                />
              );
            })}

            {/* Triangle labels appearing at high progress */}
            {progress > 0.4 && (
              <>
                {/* Vertical height axis */}
                <line x1="-8" y1="0" x2="-8" y2={-radius * 1.8} stroke="#1C1917" strokeWidth="1.5" />
                <text x="-16" y={(-radius * 1.8) / 2} textAnchor="end" className="text-xs font-serif italic fill-stone-800 font-bold">
                  Yükseklik = r
                </text>

                {/* Horizontal base axis */}
                <line x1="0" y1="12" x2={2 * Math.PI * radius * 0.42} y2="12" stroke="#1C1917" strokeWidth="1.5" />
                <text
                  x={(2 * Math.PI * radius * 0.42) / 2}
                  y="28"
                  textAnchor="middle"
                  className="text-xs font-serif italic fill-stone-800 font-bold"
                >
                  Taban = Çevre = 2πr
                </text>
              </>
            )}
          </g>
        </svg>
      </div>

        {/* Controls Bar */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
              <span className="font-medium">Açılma İlerlemesi (Çemberden Üçgene)</span>
              <span className="font-mono font-semibold text-stone-900 tabular-nums">
                %{Math.round(progress * 100)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={progress}
              onChange={(e) => {
                setIsPlaying(false);
                setProgress(parseFloat(e.target.value));
              }}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-600 mt-1">
              <span>0% (Bütün Çember)</span>
              <span>100% (Düz Üçgen)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
              <span className="font-medium">Halka / Dilim Hassasiyeti (İntegral Yaklaşımı)</span>
              <span className="font-mono font-semibold text-stone-900 tabular-nums">
                {ringCount} Katman
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="24"
              step="2"
              value={ringCount}
              onChange={(e) => setRingCount(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-600 mt-1">
              <span>4 (Kaba Merdiven)</span>
              <span>24 (Pürüzsüz Süreklilik)</span>
            </div>
          </div>
        </div>

        {/* Mathematical Intuition Reveal Callout */}
        <div className="mt-5 p-4 rounded-lg bg-amber-50/80 border border-amber-200/70 text-stone-800 text-sm">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-900 font-serif">
                Sezgisel Keşif: Neden Tek Bir İntegral Formülü Bile Ezberlemedik?
              </p>
              <p className="mt-1 text-xs text-stone-700 leading-relaxed">
                Bir soğanı yarıçapı boyunca kesip katmanlarını açtığınızda kütle ya da alan kaybolmaz!
                En dıştaki halkanın boyu çemberin tüm çevresidir (<span className="font-mono font-medium">2πr</span>).
                En içteki çekirdeğin boyu ise sıfırdır (<span className="font-mono font-medium">0</span>).
                Bu halkaları yan yana dizdiğimizde, tabanı <span className="font-mono font-semibold text-amber-900">2πr</span> ve
                yüksekliği <span className="font-mono font-semibold text-amber-900">r</span> olan bir dik üçgen elde ederiz.
              </p>
              <div className="mt-2.5 pt-2 border-t border-amber-200/80 flex flex-wrap items-center gap-x-4 gap-y-1 font-serif text-sm">
                <span>
                  <strong className="text-stone-900">Üçgen Alanı:</strong> ½ × Taban × Yükseklik
                </span>
                <span className="text-amber-800">→</span>
                <span>
                  ½ × (<span className="text-amber-900 font-mono">2πr</span>) × (<span className="text-amber-900 font-mono">r</span>)
                </span>
                <span className="text-amber-800 font-bold">=</span>
                <span className="font-bold text-amber-950 font-mono bg-white px-2 py-0.5 rounded border border-amber-300">
                  πr²
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
