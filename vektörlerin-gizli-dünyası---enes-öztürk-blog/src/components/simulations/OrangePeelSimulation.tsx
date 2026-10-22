import React, { useState, useId } from 'react';
import { Layers, Sparkles, AlertCircle, Info, RefreshCw } from 'lucide-react';

export const OrangePeelSimulation: React.FC = () => {
  const [dimension, setDimension] = useState<number>(10);
  const [peelThicknessPercent, setPeelThicknessPercent] = useState<number>(5); // 5%
  const [showPreset, setShowPreset] = useState<string>('10D');

  const peelThickness = peelThicknessPercent / 100;
  const coreRadius = 1 - peelThickness;
  
  // Ratio of inner fruit volume to total volume: (1 - t)^d
  const innerVolumeRatio = Math.pow(coreRadius, dimension);
  const peelVolumeRatio = 1 - innerVolumeRatio;

  const innerPercent = Math.max(0, innerVolumeRatio * 100);
  const peelPercent = Math.min(100, peelVolumeRatio * 100);

  // Benchmarks across familiar dimensions
  const benchmarks = [
    { name: '1D Çizgi', d: 1, label: 'Tek Boyut' },
    { name: '2D Daire', d: 2, label: 'Düzlem' },
    { name: '3D Portakal', d: 3, label: 'Günlük Yaşam' },
    { name: '10D Uzay', d: 10, label: 'Tablo Verisi' },
    { name: '50D Uzay', d: 50, label: 'PCA / t-SNE' },
    { name: '100D Uzay', d: 100, label: 'Küçük Embedding' },
    { name: '768D (BERT)', d: 768, label: 'Modern LLM' },
    { name: '1536D (GPT/Ada)', d: 1536, label: 'Vektör Arama' },
  ];

  const setPreset = (d: number, label: string) => {
    setDimension(d);
    setShowPreset(label);
  };

  return (
    <div className="my-10 rounded-2xl border border-stone-200 bg-gradient-to-b from-stone-50/90 to-amber-50/30 p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm shadow-amber-500/20">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-sans-ui text-lg font-bold text-stone-900">
              İnteraktif Deney: N-Boyutlu Portakalın Kabuk Hacmi
            </h4>
            <p className="text-xs text-stone-500 font-sans-ui">
              Boyutu ve kabuk kalınlığını değiştirerek hacmin nereye kaydığını anlık inceleyin
            </p>
          </div>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 font-mono text-xs font-semibold text-amber-800">
          Laboratuvar #1
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans-ui mb-2 block">
              Hazır Boyut Senaryoları
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {benchmarks.slice(0, 8).map((b) => (
                <button
                  key={b.d}
                  onClick={() => setPreset(b.d, b.name)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                    dimension === b.d
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <div className="font-semibold">{b.d}D</div>
                  <div className="text-[10px] opacity-75 truncate">{b.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Slider: Dimension */}
          <div className="rounded-xl bg-white p-4 border border-stone-200/70 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-stone-800 font-sans-ui">
                Boyut Sayısı (<span className="font-mono text-amber-700 font-bold">D = {dimension}</span>)
              </label>
              <span className="text-xs text-stone-500 font-mono">1 – 1536 Boyut</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              value={dimension > 200 ? 200 : dimension}
              onChange={(e) => {
                setDimension(Number(e.target.value));
                setShowPreset('Özel');
              }}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
              <span>1D</span>
              <span>50D</span>
              <span>100D</span>
              <span>200D+</span>
            </div>
          </div>

          {/* Slider: Peel Thickness */}
          <div className="rounded-xl bg-white p-4 border border-stone-200/70 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-stone-800 font-sans-ui">
                Kabuk Kalınlığı (<span className="font-mono text-amber-700 font-bold">t = %{peelThicknessPercent}</span>)
              </label>
              <span className="text-xs text-stone-500 font-mono">Yarıçapın {peelThicknessPercent / 100} katı</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={peelThicknessPercent}
              onChange={(e) => setPeelThicknessPercent(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
              <span>%1 (İncecik zar)</span>
              <span>%5 (Normal kabuk)</span>
              <span>%20 (Kalın kabuk)</span>
            </div>
          </div>
        </div>

        {/* Visual & Metric Output Column */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          {/* Visual sphere/circle cross section */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Outer sphere / peel */}
            <div
              className="absolute rounded-full transition-all duration-300 flex items-center justify-center border-4 border-amber-500 bg-amber-400/20 shadow-inner"
              style={{ width: '210px', height: '210px' }}
            >
              <span className="absolute top-2 text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                Kabuk ({peelPercent.toFixed(1)}%)
              </span>

              {/* Inner core fruit */}
              <div
                className="rounded-full bg-amber-600 transition-all duration-300 flex items-center justify-center text-white shadow-md"
                style={{
                  width: `${Math.max(8, 200 * (1 - peelThickness)) * (innerPercent > 0.5 ? 1 : 0.8)}px`,
                  height: `${Math.max(8, 200 * (1 - peelThickness)) * (innerPercent > 0.5 ? 1 : 0.8)}px`,
                  opacity: Math.max(0.2, innerPercent / 100),
                }}
              >
                <div className="text-center p-1">
                  <div className="text-[11px] font-bold font-sans-ui leading-tight">
                    İç Meyve
                  </div>
                  <div className="font-mono text-xs font-black">
                    {innerPercent < 0.01 ? '< %0.01' : `%${innerPercent.toFixed(1)}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="w-full mt-4 space-y-2">
            <div className="flex justify-between text-xs font-semibold font-sans-ui text-stone-700">
              <span className="flex items-center gap-1.5 text-amber-900">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Kabuk Hacmi Payı
              </span>
              <span className="font-mono text-amber-700 font-bold">
                {peelPercent > 99.99 ? '>%99.99' : `%${peelPercent.toFixed(2)}`}
              </span>
            </div>
            
            {/* Visual breakdown bar */}
            <div className="h-4 w-full bg-amber-600 rounded-full overflow-hidden flex shadow-inner">
              <div
                className="bg-amber-400 transition-all duration-300 h-full relative"
                style={{ width: `${peelPercent}%` }}
                title={`Kabuk: %${peelPercent.toFixed(2)}`}
              />
            </div>

            <div className="flex justify-between text-[11px] text-stone-500 font-sans-ui">
              <span>İç Meyve: {innerPercent < 0.01 ? '< %0.01' : `%${innerPercent.toFixed(2)}`}</span>
              <span className="font-mono">Hacim Oranı = (1 - {peelThickness})^{dimension}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Intuitive Takeaway Card */}
      <div className="mt-6 rounded-xl bg-amber-100/70 p-4 border border-amber-200/80 text-amber-950 text-sm leading-relaxed">
        <div className="flex items-start gap-2.5">
          <Sparkles className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-900">Sezgisel Çıkarım: </span>
            {dimension <= 3 ? (
              <span>
                3 boyutta sezgimiz iyi çalışır: %5'lik kabuk meyvenin sadece %14'ünü kaplar, içi dolgun kalır.
              </span>
            ) : dimension <= 20 ? (
              <span>
                {dimension} boyuta çıktığımızda kabuk hacmin %{peelPercent.toFixed(1)}'sini yuttu! Meyvenin merkezi hızla ıssızlaşıyor.
              </span>
            ) : (
              <span>
                <strong>{dimension} boyutta portakalın %{peelPercent > 99.9 ? '99.9' : peelPercent.toFixed(1)}'u kabuktur!</strong>
                Yani yüksek boyutlu uzayda tüm veri noktaları merkeze değil, hiperkürenin dış çeperine (kabuğuna) savrulur.
                İçeride neredeyse hiçbir veri noktası barınamaz. Uzayın kalbi boştur!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
