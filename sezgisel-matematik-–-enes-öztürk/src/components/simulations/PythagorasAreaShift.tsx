import React, { useState } from 'react';
import { Shapes, Sparkles, RefreshCw } from 'lucide-react';

export const PythagorasAreaShift: React.FC = () => {
  const [shapeMode, setShapeMode] = useState<'squares' | 'semicircles' | 'triangles' | 'einstein'>('einstein');
  const [aSide, setASide] = useState<number>(3);
  const [bSide, setBSide] = useState<number>(4);

  const cSide = Math.hypot(aSide, bSide); // 5 for 3,4
  const cSquared = aSide * aSide + bSide * bSide;

  // Scaling factor for rendering
  const scale = 26;
  const aPx = aSide * scale;
  const bPx = bSide * scale;
  const cPx = cSide * scale;

  return (
    <div className="my-8 rounded-xl border border-stone-300/80 bg-stone-50/70 p-5 md:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200/80 gap-3">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-purple-800">
            İnteraktif Deney 04
          </span>
          <h4 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
            Pisagor Karelerden İbaret Değildir: Einstein'ın Benzerlik İspatı
          </h4>
        </div>

        {/* Shape selector tabs */}
        <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setShapeMode('einstein')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              shapeMode === 'einstein'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Einstein (Üçgenin İçi)
          </button>
          <button
            type="button"
            onClick={() => setShapeMode('squares')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              shapeMode === 'squares'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Klasik Kareler
          </button>
          <button
            type="button"
            onClick={() => setShapeMode('semicircles')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              shapeMode === 'semicircles'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Yarım Daireler
          </button>
          <button
            type="button"
            onClick={() => setShapeMode('triangles')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              shapeMode === 'triangles'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Eşkenar Üçgen
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative mt-5 min-h-[300px] flex items-center justify-center bg-white rounded-lg border border-stone-200/80 p-4 overflow-hidden">
        {shapeMode === 'einstein' ? (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 540 260" className="w-full max-w-[500px] h-auto select-none">
              {/* Main right triangle with altitude from right angle to hypotenuse */}
              <polygon
                points="60,200 480,200 211.2,40"
                fill="#F3F4F6"
                stroke="#4B5563"
                strokeWidth="2"
              />

              {/* Sub-triangle 1 (Left, base a) */}
              <polygon
                points="60,200 211.2,200 211.2,40"
                fill="rgba(59, 130, 246, 0.18)"
                stroke="#2563EB"
                strokeWidth="2"
              />

              {/* Sub-triangle 2 (Right, base b) */}
              <polygon
                points="211.2,200 480,200 211.2,40"
                fill="rgba(245, 158, 11, 0.18)"
                stroke="#D97706"
                strokeWidth="2"
              />

              {/* Altitude line (h) */}
              <line
                x1="211.2"
                y1="40"
                x2="211.2"
                y2="200"
                stroke="#DC2626"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Right angle marker at top */}
              <rect x="211.2" y="184" width="16" height="16" fill="none" stroke="#DC2626" strokeWidth="1.5" />

              {/* Labels */}
              <text x="135" y="115" textAnchor="middle" className="text-xs font-serif font-bold fill-blue-800">
                Küçük Kopya (a)
              </text>
              <text x="345" y="115" textAnchor="middle" className="text-xs font-serif font-bold fill-amber-800">
                Orta Kopya (b)
              </text>
              <text x="270" y="230" textAnchor="middle" className="text-sm font-serif font-bold fill-stone-900">
                Büyük Hipotenüs (c) = Küçük + Orta
              </text>
            </svg>
            <p className="text-xs text-stone-500 font-sans mt-2 text-center max-w-md">
              Albert Einstein'ın 12 yaşında hayran kaldığı ispat: Dik üçgenin içine indirilen dikme,
              üçgeni kendisinin iki küçük benzer kopyasına böler. Dışarıya hiçbir şekil çizmeye gerek yoktur!
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 540 300" className="w-full max-w-[500px] h-auto select-none">
              {/* Base triangle */}
              <polygon points="190,190 310,190 190,100" fill="#E5E7EB" stroke="#374151" strokeWidth="2" />

              {shapeMode === 'squares' && (
                <>
                  {/* Square on side a (vertical 90) */}
                  <rect x="100" y="100" width="90" height="90" fill="rgba(59, 130, 246, 0.25)" stroke="#2563EB" strokeWidth="1.5" />
                  <text x="145" y="150" textAnchor="middle" className="text-xs font-mono font-bold fill-blue-900">
                    a² = {(aSide * aSide).toFixed(0)}
                  </text>

                  {/* Square on side b (horizontal 120) */}
                  <rect x="190" y="190" width="120" height="120" fill="rgba(245, 158, 11, 0.25)" stroke="#D97706" strokeWidth="1.5" />
                  <text x="250" y="255" textAnchor="middle" className="text-xs font-mono font-bold fill-amber-900">
                    b² = {(bSide * bSide).toFixed(0)}
                  </text>

                  {/* Square on hypotenuse c */}
                  <g transform="translate(190,100) rotate(36.87)">
                    <rect x="0" y="-150" width="150" height="150" fill="rgba(16, 185, 129, 0.25)" stroke="#059669" strokeWidth="1.5" />
                    <text x="75" y="-70" textAnchor="middle" className="text-xs font-mono font-bold fill-emerald-900">
                      c² = {cSquared.toFixed(0)}
                    </text>
                  </g>
                </>
              )}

              {shapeMode === 'semicircles' && (
                <>
                  <path d="M 190,100 A 45,45 0 0,0 190,190" fill="rgba(59, 130, 246, 0.3)" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M 190,190 A 60,60 0 0,0 310,190" fill="rgba(245, 158, 11, 0.3)" stroke="#D97706" strokeWidth="1.5" />
                  <text x="160" y="150" textAnchor="middle" className="text-[11px] font-mono fill-blue-900">
                    ½π(a/2)²
                  </text>
                  <text x="250" y="235" textAnchor="middle" className="text-[11px] font-mono fill-amber-900">
                    ½π(b/2)²
                  </text>
                  <text x="330" y="120" textAnchor="middle" className="text-xs font-serif font-bold fill-emerald-900">
                    Toplam Alan = Hipotenüs Dairesi!
                  </text>
                </>
              )}

              {shapeMode === 'triangles' && (
                <g>
                  <text x="270" y="150" textAnchor="middle" className="text-sm font-serif font-bold fill-stone-800">
                    Eşkenar üçgenlerin alanı da a² ve b² ile orantılıdır!
                  </text>
                </g>
              )}
            </svg>
          </div>
        )}
      </div>

      {/* Numerical Proof Bar */}
      <div className="mt-5 p-4 rounded-lg bg-stone-100/90 border border-stone-200">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-stone-500 font-medium">Kenar a:</span>{' '}
            <span className="font-mono font-bold text-stone-900">{aSide} birim</span>
            <span className="mx-2 text-stone-300">|</span>
            <span className="text-stone-500 font-medium">Kenar b:</span>{' '}
            <span className="font-mono font-bold text-stone-900">{bSide} birim</span>
            <span className="mx-2 text-stone-300">|</span>
            <span className="text-stone-500 font-medium">Hipotenüs c:</span>{' '}
            <span className="font-mono font-bold text-stone-900">{cSide.toFixed(2)} birim</span>
          </div>

          <div className="font-mono text-sm font-bold text-stone-900">
            {aSide * aSide} + {bSide * bSide} = {cSquared} (Alan Tamamen Korunur)
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 p-4 rounded-lg bg-purple-50/70 border border-purple-200/70 text-stone-800 text-sm">
        <p className="font-serif font-bold text-stone-900">
          Ezber Bozan Gerçek: Neden 'Kare' Olmak Zorunda Değil?
        </p>
        <p className="mt-1 text-xs text-stone-700 leading-relaxed">
          Geometride herhangi bir 2 boyutlu şekli ölçeklediğinizde (büyüttüğünüzde), alanı kenar uzunluğunun karesiyle (<span className="font-mono">k × L²</span>) orantılı olarak büyür.
          İster kare olsun, ister yarım daire, isterse bir kedinin silüeti...
          Her iki dik kenar üzerindeki alanların toplamı, daima hipotenüs üzerindeki aynı şeklin alanına eşittir!
          Pisagor aslında cebirsel bir formül değil; <strong>evrendeki 2 boyutlu benzerliğin ve alan korunumunun yasasıdır.</strong>
        </p>
      </div>
    </div>
  );
};
