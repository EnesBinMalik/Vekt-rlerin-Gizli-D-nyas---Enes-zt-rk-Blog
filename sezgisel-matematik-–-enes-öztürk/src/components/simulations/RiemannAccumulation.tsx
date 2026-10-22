import React, { useState } from 'react';
import { Gauge, Milestone, Sparkles } from 'lucide-react';

export const RiemannAccumulation: React.FC = () => {
  const [slices, setSlices] = useState<number>(8);
  const [upperLimit, setUpperLimit] = useState<number>(4);

  // Velocity function v(t) = 0.5 * t^2 + 2
  const v = (t: number) => 0.4 * t * t + 1.5;

  // Exact integral of v(t) from 0 to upperLimit: (0.4/3)*t^3 + 1.5*t
  const exactArea = (0.4 / 3) * Math.pow(upperLimit, 3) + 1.5 * upperLimit;

  // Riemann sum approximation (Left sum)
  const dt = upperLimit / slices;
  let riemannSum = 0;
  const bars: { t: number; height: number; width: number }[] = [];

  for (let i = 0; i < slices; i++) {
    const t = i * dt;
    const height = v(t);
    riemannSum += height * dt;
    bars.push({ t, height, width: dt });
  }

  // SVG dimensions
  const svgWidth = 560;
  const svgHeight = 240;
  const margin = { top: 20, right: 30, bottom: 40, left: 45 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const maxT = 6;
  const maxV = 18;

  const scaleX = (t: number) => margin.left + (t / maxT) * plotWidth;
  const scaleY = (val: number) => margin.top + plotHeight - (val / maxV) * plotHeight;

  // Generate curve path
  const curvePoints: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = (i / 60) * maxT;
    curvePoints.push(`${scaleX(t).toFixed(1)},${scaleY(v(t)).toFixed(1)}`);
  }
  const curvePath = `M ${curvePoints.join(' L ')}`;

  // Shaded area under curve up to upperLimit
  const shadedPoints: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = (i / 40) * upperLimit;
    shadedPoints.push(`${scaleX(t).toFixed(1)},${scaleY(v(t)).toFixed(1)}`);
  }
  const shadedPath = `M ${scaleX(0)},${scaleY(0)} L ${shadedPoints.join(' L ')} L ${scaleX(upperLimit)},${scaleY(0)} Z`;

  return (
    <div className="my-8 rounded-xl border border-stone-300/80 bg-stone-50/70 p-5 md:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200/80 gap-3">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-rose-800">
            İnteraktif Deney 05
          </span>
          <h4 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
            İntegral ve Türev Neden Birbirinin Tersidir? (Hız Göstergesi ve Kilometre)
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-stone-600 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
          <Gauge className="w-4 h-4 text-rose-700" />
          <span>Hız (v) → Alan = Alınan Yol (x)</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="mt-5 bg-white rounded-lg border border-stone-200/80 p-3 overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto max-h-[260px] select-none">
          {/* Axes */}
          <line
            x1={margin.left}
            y1={margin.top + plotHeight}
            x2={margin.left + plotWidth}
            y2={margin.top + plotHeight}
            stroke="#A8A29E"
            strokeWidth="1.5"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={margin.top + plotHeight}
            stroke="#A8A29E"
            strokeWidth="1.5"
          />

          {/* Shaded True Area */}
          <path d={shadedPath} fill="rgba(244, 63, 94, 0.12)" />

          {/* Riemann Slices (Strips) */}
          {bars.map((bar, idx) => {
            const bx = scaleX(bar.t);
            const bw = scaleX(bar.t + bar.width) - bx;
            const by = scaleY(bar.height);
            const bh = margin.top + plotHeight - by;
            return (
              <rect
                key={`bar-${idx}`}
                x={bx}
                y={by}
                width={Math.max(1, bw - 1)}
                height={bh}
                fill="rgba(244, 63, 94, 0.45)"
                stroke="#BE123C"
                strokeWidth="1"
                rx="0.5"
              />
            );
          })}

          {/* Continuous velocity function curve */}
          <path d={curvePath} fill="none" stroke="#E11D48" strokeWidth="2.5" />

          {/* Tiny incremental slice dx preview at upperLimit */}
          <line
            x1={scaleX(upperLimit)}
            y1={margin.top}
            x2={scaleX(upperLimit)}
            y2={margin.top + plotHeight}
            stroke="#1C1917"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Axis labels */}
          <text
            x={margin.left + plotWidth}
            y={margin.top + plotHeight + 25}
            textAnchor="end"
            className="text-xs font-serif italic fill-stone-700"
          >
            Zaman t (saniye)
          </text>
          <text
            x={margin.left - 10}
            y={margin.top + 10}
            textAnchor="end"
            className="text-xs font-serif italic fill-stone-700"
          >
            Hız v(t) (m/s)
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
            <span className="font-medium">Zaman Dilimleme Sayısı (İntegral Hassasiyeti)</span>
            <span className="font-mono font-bold text-stone-900 tabular-nums">
              {slices} Dilim
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="40"
            step="1"
            value={slices}
            onChange={(e) => setSlices(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-stone-600 mt-1">
            <span>2 Dilim (Kaba)</span>
            <span>20 Dilim (Yakın)</span>
            <span>40 Dilim (Sonsuz Küçük)</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
            <span className="font-medium">Geçen Süre (Üst Limit t)</span>
            <span className="font-mono font-bold text-stone-900 tabular-nums">
              t = {upperLimit} sn
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5.5"
            step="0.5"
            value={upperLimit}
            onChange={(e) => setUpperLimit(parseFloat(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-stone-600 mt-1">
            <span>t = 1 sn</span>
            <span>t = 3.5 sn</span>
            <span>t = 5.5 sn</span>
          </div>
        </div>
      </div>

      {/* Numerical Comparison Readout */}
      <div className="mt-4 p-3.5 bg-white rounded-lg border border-stone-200 text-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-stone-500 font-medium">Dilimlerin Toplamı (Riemann):</span>{' '}
          <span className="font-mono font-bold text-stone-800">{riemannSum.toFixed(2)} metre</span>
        </div>
        <div>
          <span className="text-stone-500 font-medium">Kesin İntegral (Gerçek Yol):</span>{' '}
          <span className="font-mono font-bold text-rose-800">{exactArea.toFixed(2)} metre</span>
        </div>
        <div>
          <span className="text-stone-500 font-medium">Hata Payı:</span>{' '}
          <span className="font-mono font-medium text-stone-600">
            %{Math.abs(((riemannSum - exactArea) / exactArea) * 100).toFixed(1)}
          </span>
        </div>
      </div>

      {/* Discovery Callout */}
      <div className="mt-4 p-4 rounded-lg bg-rose-50/70 border border-rose-200/70 text-stone-800 text-sm">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-5 h-5 text-rose-800 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-stone-900 font-serif">
              Kalkülüsün Temel Teoreminin Tek Cümlelik Sırrı
            </p>
            <p className="mt-1 text-xs text-stone-700 leading-relaxed">
              Arabayla giderken hızınız sürekli değişir. Her an hızınızla o minicik zamanı çarparsanız (<span className="font-mono font-medium">v(t) × dt</span>), o an aldığınız minik mesafeyi bulursunuz.
              Tüm bu minik mesafeleri uç uca topladığınızda (<strong>İntegral</strong>), toplam katettiğiniz yolu bulursunuz!
              Tersine; arabanın kilometre sayacındaki artışın zamana göre ne kadar hızlı değiştiğine bakarsanız (<strong>Türev</strong>), hız göstergesindeki sayıyı görürsünüz.
              <strong> İntegral birikim yapmaktır, türev ise birikimi anlık dilimlemektir.</strong> İşte bu yüzden birbirinin tam tersidirler!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
