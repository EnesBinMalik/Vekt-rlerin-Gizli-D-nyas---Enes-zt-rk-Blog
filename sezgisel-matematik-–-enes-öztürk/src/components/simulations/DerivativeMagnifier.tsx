import React, { useState } from 'react';
import { ZoomIn, Search, MoveRight, Eye } from 'lucide-react';

export const DerivativeMagnifier: React.FC = () => {
  const [curveType, setCurveType] = useState<'parabola' | 'sine' | 'cubic'>('parabola');
  const [xVal, setXVal] = useState<number>(1.2);
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 1x to 40x
  const [showSecant, setShowSecant] = useState<boolean>(true);

  // Curve definitions
  const fn = (x: number) => {
    switch (curveType) {
      case 'parabola':
        return 0.5 * x * x;
      case 'sine':
        return 1.8 * Math.sin(x * 1.2);
      case 'cubic':
        return 0.25 * (x * x * x - 3 * x);
    }
  };

  const derivative = (x: number) => {
    switch (curveType) {
      case 'parabola':
        return x; // d/dx (0.5 x^2) = x
      case 'sine':
        return 1.8 * 1.2 * Math.cos(x * 1.2);
      case 'cubic':
        return 0.25 * (3 * x * x - 3);
    }
  };

  const currentSlope = derivative(xVal);
  const currentY = fn(xVal);

  // SVG coordinate transformation for the main view
  const width = 640;
  const height = 300;
  const originX = width / 2;
  const originY = height / 2 + 20;
  const baseScale = 45; // pixels per unit

  // Effective scale based on zoom
  const scale = baseScale * zoomLevel;
  // Center the view on (xVal, currentY) as zoom increases
  const centerWeight = Math.min(1, (zoomLevel - 1) / 5);
  const targetX = originX - (xVal * scale * centerWeight);
  const targetY = originY + (currentY * scale * centerWeight);

  const toSvgX = (x: number) => {
    if (zoomLevel === 1) return originX + x * baseScale;
    return originX + (x - xVal) * scale;
  };

  const toSvgY = (y: number) => {
    if (zoomLevel === 1) return originY - y * baseScale;
    return originY - (y - currentY) * scale;
  };

  // Generate curve path
  const points: [number, number][] = [];
  const span = 6 / zoomLevel;
  const minX = zoomLevel === 1 ? -5 : xVal - span;
  const maxX = zoomLevel === 1 ? 5 : xVal + span;
  const steps = 140;

  for (let i = 0; i <= steps; i++) {
    const x = minX + (i / steps) * (maxX - minX);
    const y = fn(x);
    points.push([toSvgX(x), toSvgY(y)]);
  }

  const pathString = points.reduce((acc, [px, py], idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${px.toFixed(1)},${py.toFixed(1)}`;
  }, '');

  // Tangent line endpoints
  const tanSpan = 2.5 / Math.sqrt(zoomLevel);
  const tanX1 = xVal - tanSpan;
  const tanY1 = currentY - currentSlope * tanSpan;
  const tanX2 = xVal + tanSpan;
  const tanY2 = currentY + currentSlope * tanSpan;

  // Secant point for h
  const h = 0.8 / Math.max(1, zoomLevel * 0.7);
  const secX = xVal + h;
  const secY = fn(secX);
  const secSlope = (secY - currentY) / h;

  return (
    <div className="my-8 rounded-xl border border-stone-300/80 bg-stone-50/70 p-5 md:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200/80 gap-3">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-800">
            İnteraktif Deney 02
          </span>
          <h4 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
            Türev Mikroskobu: Yaklaştıkça Düzleşen Evren (Lokal Doğrusallık)
          </h4>
        </div>

        {/* Function selector tabs */}
        <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setCurveType('parabola')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              curveType === 'parabola'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Parabol f(x)=½x²
          </button>
          <button
            type="button"
            onClick={() => setCurveType('sine')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              curveType === 'sine'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Dalga f(x)=sin(x)
          </button>
          <button
            type="button"
            onClick={() => setCurveType('cubic')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              curveType === 'cubic'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Kübik f(x)=x³-3x
          </button>
        </div>
      </div>

      {/* Graph Area */}
      <div className="relative mt-5 bg-white rounded-lg border border-stone-200/80 p-3 overflow-hidden">
        <div className="absolute top-3 left-4 flex items-center gap-3 text-xs text-stone-500 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded border border-stone-200">
          <span className="font-medium text-stone-700">Seçilen Nokta:</span>
          <span className="font-mono font-semibold text-blue-900">
            x = {xVal.toFixed(2)}, f(x) = {currentY.toFixed(2)}
          </span>
          <span>·</span>
          <span className="font-medium text-stone-700">Anlık Eğim (Türev):</span>
          <span className="font-mono font-bold text-amber-900">
            f'(x) = {currentSlope.toFixed(2)}
          </span>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none max-h-[300px]">
          {/* Subtle Grid */}
          <line x1="0" y1={originY} x2={width} y2={originY} stroke="#E7E5E4" strokeWidth="1" />
          <line x1={originX} y1="0" x2={originX} y2={height} stroke="#E7E5E4" strokeWidth="1" />

          {/* Dotted axis marks */}
          {[-4, -2, 2, 4].map((v) => (
            <line
              key={`x-grid-${v}`}
              x1={toSvgX(v)}
              y1="0"
              x2={toSvgX(v)}
              y2={height}
              stroke="#F5F5F4"
              strokeWidth="1"
            />
          ))}

          {/* Tangent line (Gold/Amber) */}
          <line
            x1={toSvgX(tanX1)}
            y1={toSvgY(tanY1)}
            x2={toSvgX(tanX2)}
            y2={toSvgY(tanY2)}
            stroke="#D97706"
            strokeWidth={zoomLevel > 10 ? '3' : '2'}
            strokeDasharray={zoomLevel > 15 ? 'none' : '4 3'}
          />

          {/* Main Function Curve */}
          <path d={pathString} fill="none" stroke="#2563EB" strokeWidth="2.5" />

          {/* Secant chord if enabled & not zoomed in infinitely */}
          {showSecant && zoomLevel < 20 && (
            <>
              <line
                x1={toSvgX(xVal)}
                y1={toSvgY(currentY)}
                x2={toSvgX(secX)}
                y2={toSvgY(secY)}
                stroke="#9333EA"
                strokeWidth="1.5"
              />
              <circle cx={toSvgX(secX)} cy={toSvgY(secY)} r="4" fill="#9333EA" />
              <line
                x1={toSvgX(xVal)}
                y1={toSvgY(secY)}
                x2={toSvgX(secX)}
                y2={toSvgY(secY)}
                stroke="#A855F7"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <line
                x1={toSvgX(xVal)}
                y1={toSvgY(currentY)}
                x2={toSvgX(xVal)}
                y2={toSvgY(secY)}
                stroke="#A855F7"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
            </>
          )}

          {/* Active Target Point */}
          <circle
            cx={toSvgX(xVal)}
            cy={toSvgY(currentY)}
            r={zoomLevel > 10 ? '5' : '4'}
            fill="#DC2626"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* Microscope Circle overlay if zoomed in */}
          {zoomLevel > 3 && (
            <circle
              cx={toSvgX(xVal)}
              cy={toSvgY(currentY)}
              r={70}
              fill="none"
              stroke="#9A3412"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              opacity="0.4"
            />
          )}
        </svg>

        {/* Microscopic feedback notice */}
        {zoomLevel >= 15 && (
          <div className="absolute bottom-3 right-3 bg-amber-50/95 border border-amber-300 text-amber-950 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 shadow-xs">
            <Eye className="w-3.5 h-3.5 text-amber-700" />
            <span>Fark ettiniz mi? Eğri artık tamamen bir düz çizgiye dönüştü!</span>
          </div>
        )}
      </div>

      {/* Control Sliders */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
            <span className="font-medium flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5 text-stone-500" /> Büyütme Faktörü (Mikroskop Zoom)
            </span>
            <span className="font-mono font-bold text-stone-900 tabular-nums">
              {zoomLevel}x {zoomLevel > 15 ? '(Mikroskobik Düzlem)' : ''}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-stone-600 mt-1">
            <span>1x (Kuşbakışı Eğri)</span>
            <span>15x (Düzleşme Eşiği)</span>
            <span>30x (Sonsuz Küçük / Doğru)</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
            <span className="font-medium">İncelenen Nokta (x Konumu)</span>
            <span className="font-mono font-bold text-stone-900 tabular-nums">
              x = {xVal.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.05"
            value={xVal}
            onChange={(e) => setXVal(parseFloat(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-stone-600 mt-1">
            <span>x = -3</span>
            <span>x = 0 (Zirve/Dip)</span>
            <span>x = +3</span>
          </div>
        </div>
      </div>

      {/* Intuitive Explanation Deck */}
      <div className="mt-5 p-4 rounded-lg bg-stone-100/90 border border-stone-200 text-stone-800 text-sm">
        <p className="font-serif font-bold text-stone-900">
          Sezgisel Kavrayış: Dünya Neden Düz Görünür?
        </p>
        <p className="mt-1 text-xs text-stone-700 leading-relaxed">
          Dünyamız küresel bir eğridir; ancak sokakta yürürken bastığımız zemin bize tamamen düz görünür.
          Çünkü devasa bir eğriye mikroskobik bir ölçekten bakıyoruz.
          <strong> Türev tam olarak budur:</strong> Herhangi bir pürüzsüz fonksiyona yeterince yakından bakarsanız,
          eğrilik hissi kaybolur ve karşınıza sıradan bir doğru çıkar.
          Türev, o minicik düz çizginin yerçekimine veya ufka göre ne kadar eğik durduğunun (eğiminin) sayısal adıdır.
        </p>
      </div>
    </div>
  );
};
