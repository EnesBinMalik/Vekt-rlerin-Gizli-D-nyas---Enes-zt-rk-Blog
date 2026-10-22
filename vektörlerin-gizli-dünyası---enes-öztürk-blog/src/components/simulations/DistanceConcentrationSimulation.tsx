import React, { useState, useEffect, useMemo, useTransition } from 'react';
import { BarChart3, Play, Activity, HelpCircle, ArrowRight } from 'lucide-react';

export const DistanceConcentrationSimulation: React.FC = () => {
  const [dimension, setDimension] = useState<number>(2);
  const [pointCount, setPointCount] = useState<number>(100);
  const [isPending, startTransition] = useTransition();
  const [seed, setSeed] = useState<number>(1);

  // Compute pairwise distances
  const simulationResults = useMemo(() => {
    // Generate N points with D dimensions in [0, 1]
    const points: number[][] = [];
    // Pseudo-random deterministic or seeded
    let localSeed = seed;
    const random = () => {
      localSeed = (localSeed * 9301 + 49297) % 233280;
      return localSeed / 233280;
    };

    for (let i = 0; i < pointCount; i++) {
      const p: number[] = new Array(dimension);
      for (let j = 0; j < dimension; j++) {
        p[j] = random();
      }
      points.push(p);
    }

    const distances: number[] = [];
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;

    // Calculate pairwise distances
    for (let i = 0; i < pointCount; i++) {
      for (let j = i + 1; j < pointCount; j++) {
        let sumSq = 0;
        for (let k = 0; k < dimension; k++) {
          const diff = points[i][k] - points[j][k];
          sumSq += diff * diff;
        }
        const dist = Math.sqrt(sumSq);
        distances.push(dist);
        if (dist < min) min = dist;
        if (dist > max) max = dist;
        sum += dist;
      }
    }

    const avg = distances.length > 0 ? sum / distances.length : 0;
    
    // Relative contrast: (max - min) / min
    const contrastRatio = min > 0 ? (max - min) / min : 0;

    // Standard deviation
    let varianceSum = 0;
    for (const d of distances) {
      varianceSum += (d - avg) * (d - avg);
    }
    const stdDev = distances.length > 0 ? Math.sqrt(varianceSum / distances.length) : 0;

    // Histogram bins (20 bins)
    const binCount = 20;
    const bins = new Array(binCount).fill(0);
    const range = max - min || 1;

    distances.forEach((d) => {
      const binIndex = Math.min(binCount - 1, Math.floor(((d - min) / range) * binCount));
      bins[binIndex]++;
    });

    const maxBinCount = Math.max(...bins, 1);

    return {
      min,
      max,
      avg,
      stdDev,
      contrastRatio,
      bins,
      maxBinCount,
      totalPairs: distances.length,
    };
  }, [dimension, pointCount, seed]);

  const handleDimensionChange = (val: number) => {
    startTransition(() => {
      setDimension(val);
    });
  };

  const handleRerun = () => {
    setSeed((s) => s + 1);
  };

  return (
    <div className="my-10 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-sans-ui text-lg font-bold text-stone-900">
              Laboratuvar #2: "Mesafe Yoğunlaşması" Simülatörü
            </h4>
            <p className="text-xs text-stone-500 font-sans-ui">
              Boyut arttıkça tüm noktalar birbirine neredeyse eşit mesafede kalır
            </p>
          </div>
        </div>
        <button
          onClick={handleRerun}
          className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <Play className="h-3.5 w-3.5 text-blue-600" />
          Rastgele Noktaları Yenile
        </button>
      </div>

      {/* Preset Dimensions */}
      <div className="mt-5 flex flex-wrap gap-2 items-center">
        <span className="text-xs text-stone-500 font-sans-ui font-medium">Hızlı Boyut Seç:</span>
        {[2, 5, 20, 50, 100, 300].map((d) => (
          <button
            key={d}
            onClick={() => handleDimensionChange(d)}
            className={`px-3 py-1 text-xs rounded-full font-mono transition-all ${
              dimension === d
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {d} Boyut (D={d})
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Histogram Chart */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between text-xs text-stone-500 font-sans-ui mb-2">
            <span>Mesafe Frekans Dağılımı (Histogram)</span>
            <span className="font-mono text-stone-700 font-medium">
              {simulationResults.totalPairs} çift mesafe incelendi
            </span>
          </div>

          {/* Histogram Bars */}
          <div className="h-44 w-full bg-stone-50 rounded-xl border border-stone-200/80 p-3 flex items-end gap-1 relative overflow-hidden">
            {simulationResults.bins.map((count, idx) => {
              const heightPercent = (count / simulationResults.maxBinCount) * 100;
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col justify-end items-center h-full group relative"
                >
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-sm transition-all duration-300"
                    style={{ height: `${Math.max(4, heightPercent)}%` }}
                  />
                  {/* Tooltip on hover */}
                  <div className="pointer-events-none absolute -top-8 hidden group-hover:flex z-10 bg-stone-900 text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap font-mono shadow-md">
                    {count} çift
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex justify-between text-xs font-mono text-stone-500">
            <span>En Yakın: {simulationResults.min.toFixed(3)}</span>
            <span className="font-bold text-blue-700">Ortalama: {simulationResults.avg.toFixed(3)}</span>
            <span>En Uzak: {simulationResults.max.toFixed(3)}</span>
          </div>
        </div>

        {/* Statistical Insights */}
        <div className="lg:col-span-5 space-y-4">
          {/* Key Metric: Contrast */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-semibold text-blue-900 font-sans-ui">
                Göreceli Tezat Oranı (Kontrast)
              </span>
              <span className="font-mono text-lg font-bold text-blue-700">
                {simulationResults.contrastRatio.toFixed(3)}
              </span>
            </div>
            <div className="text-[11px] text-blue-800/80 font-mono mt-0.5">
              (Maks - Min) / Min
            </div>
            <p className="text-xs text-stone-600 mt-2 font-sans-ui leading-relaxed">
              {dimension <= 3 ? (
                <>
                  Düşük boyutta bu oran <strong>yüksektir ({simulationResults.contrastRatio.toFixed(2)})</strong>.
                  Yani "en yakın komşu" ile "en uzak komşu" arasında devasa bir ayrım vardır. KNN burada harika çalışır!
                </>
              ) : dimension <= 20 ? (
                <>
                  Oran <strong>{simulationResults.contrastRatio.toFixed(2)}</strong> seviyesine düştü.
                  Komşular arasındaki mesafe farkları erimeye başlıyor.
                </>
              ) : (
                <>
                  Oran <strong>{simulationResults.contrastRatio.toFixed(3)}</strong> değerine çöktü!
                  En uzak nokta, en yakın noktadan sadece %{(simulationResults.contrastRatio * 100).toFixed(1)} daha uzak.
                  Algoritmalar için tüm noktalar birbirinin aynısı haline geldi!
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-stone-50 border border-stone-200/80 p-3">
              <span className="text-stone-500 block font-sans-ui">Standart Sapma (σ)</span>
              <span className="font-mono font-bold text-stone-900 text-sm mt-0.5 block">
                {simulationResults.stdDev.toFixed(4)}
              </span>
              <span className="text-[10px] text-stone-400 mt-1 block">
                Boyut arttıkça varyans / ortalama oranı sıfıra yaklaşır.
              </span>
            </div>

            <div className="rounded-lg bg-stone-50 border border-stone-200/80 p-3">
              <span className="text-stone-500 block font-sans-ui">Öklid Yanılsaması</span>
              <span className="font-mono font-bold text-emerald-700 text-sm mt-0.5 block">
                {dimension > 50 ? 'Çöktü ⚠️' : 'İşlevsel ✓'}
              </span>
              <span className="text-[10px] text-stone-400 mt-1 block">
                {dimension > 50 ? 'Kosinüs Benzerliği Şart!' : 'Öklid Kullanılabilir'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-stone-100/80 p-3.5 text-xs text-stone-700 flex items-start gap-2.5">
        <HelpCircle className="h-4 w-4 text-stone-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Enes Öztürk'ün Notu:</strong> 100 boyutta KNN (K-En Yakın Komşu) çalıştırdığınızda modelinizin neden saçmaladığını hiç merak ettiniz mi?
          Çünkü yüksek boyutta "yakınlık" kavramı fiziksel anlamını yitirir. Tüm noktalar birbirine neredeyse eşit mesafede kümelenir. İşte bu yüzden modern vektör arama motorları (FAISS, Milvus, Qdrant) Öklid mesafesi yerine açısal <em>kosinüs benzerliğini (cosine similarity)</em> tercih eder!
        </p>
      </div>
    </div>
  );
};
