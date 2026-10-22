import React, { useState } from 'react';
import { AUTHOR_NAME, AUTHOR_TITLE } from '../data/constructorContent';
import { Play, Sparkles, Box, Check, ArrowRight, RotateCcw } from 'lucide-react';

interface HeroSectionProps {
  onOpenSimulator: () => void;
  onExploreOverload: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSimulator,
  onExploreOverload,
}) => {
  // Mini interactive state for instant gratification in the hero
  const [activeConstructorMode, setActiveConstructorMode] = useState<'default' | 'custom'>('default');
  const [isSpawned, setIsSpawned] = useState(false);
  const [spawnTimestamp, setSpawnTimestamp] = useState<string | null>(null);

  const handleSpawn = () => {
    setIsSpawned(false);
    setTimeout(() => {
      setIsSpawned(true);
      setSpawnTimestamp(new Date().toLocaleTimeString('tr-TR'));
    }, 120);
  };

  return (
    <section className="relative pt-12 pb-16 px-6 border-b border-slate-800/60 overflow-hidden">
      {/* Background architectural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Editorial & Hero Context */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Clean unboxed metadata kicker */}
              <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 mb-4">
                <span>Nesne Yönelimli Programlama (OOP)</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Bellek & Yaşam Döngüsü</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>C# / Java / TS / C++</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5 [text-wrap:balance]">
                Constructor (Kurucu Metot) Kavramı ve Bellek Mimarisi
              </h1>

              {/* Core Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl">
                Bir sınıftan bir nesne oluşturulduğunda biz tanımlamasak bile arka planda çalışan varsayılan yapıcı metotlara <strong className="text-cyan-300 font-semibold">kurucu (constructor)</strong> denir. Nesnenin hayata ilk başladığı anda özelliklerine ilk değer ataması yapılır ve bellek (Heap) üzerinde güvenli bir başlangıç durumu oluşturulur.
              </p>

              {/* Author Signature & Accreditation Banner */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-8 max-w-xl">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-bold flex items-center justify-center text-sm shadow-inner shrink-0">
                  EÖ
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white tracking-tight">Hazırlayan: {AUTHOR_NAME}</span>
                    <span className="text-[11px] text-cyan-400/90 font-mono">· İmzalı Anlatım</span>
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {AUTHOR_TITLE} · Nesne yönelimli sistem mimarileri ve bellek ilkeleri
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenSimulator}
                className="px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-sm flex items-center gap-2 transition-colors shadow-sm shadow-cyan-400/20 active:scale-95"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Bellek Simülatörünü İncele</span>
              </button>
              <button
                onClick={onExploreOverload}
                className="px-5 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium text-sm flex items-center gap-2 border border-slate-700/60 transition-colors"
              >
                <span>Aşırı Yükleme (Overloading) Laboratuvarı</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Object Instantiation Preview */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-200">Canlı Nesne Üretim Tezgâhı</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  Heap: 0x00F82C
                </div>
              </div>

              {/* Mode Selection */}
              <div className="mb-4">
                <span className="text-xs text-slate-400 block mb-2 font-medium">Kurucu Türünü Seçin:</span>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => {
                      setActiveConstructorMode('default');
                      setIsSpawned(false);
                    }}
                    className={`py-1.5 px-3 text-xs font-medium rounded-md transition-all ${
                      activeConstructorMode === 'default'
                        ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    1. Varsayılan (Default)
                  </button>
                  <button
                    onClick={() => {
                      setActiveConstructorMode('custom');
                      setIsSpawned(false);
                    }}
                    className={`py-1.5 px-3 text-xs font-medium rounded-md transition-all ${
                      activeConstructorMode === 'custom'
                        ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    2. Parametreli Kurucu
                  </button>
                </div>
              </div>

              {/* Code preview of the selected call */}
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-800/80 mb-4 font-mono text-xs">
                <div className="text-slate-500 mb-1">// Yürütülecek Satır:</div>
                {activeConstructorMode === 'default' ? (
                  <div className="text-emerald-400">
                    Ogrenci ogr = <span className="text-yellow-300">new</span> Ogrenci();
                  </div>
                ) : (
                  <div className="text-emerald-400">
                    Ogrenci ogr = <span className="text-yellow-300">new</span> Ogrenci(<span className="text-amber-200">"Ahmet"</span>, <span className="text-cyan-300">22</span>);
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={handleSpawn}
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-cyan-500/10 mb-4"
              >
                <Sparkles className="w-4 h-4" />
                <span>`new` İle Nesneyi Heap'te Başlat</span>
              </button>

              {/* Instantiated Memory State Visual */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-400">Heap Belleğindeki Durum (Object Fields)</span>
                  {isSpawned && (
                    <span className="text-[10px] text-emerald-400 font-mono">
                      ● Nesne Canlı ({spawnTimestamp})
                    </span>
                  )}
                </div>

                {isSpawned ? (
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">Ad (string):</span>
                      {activeConstructorMode === 'default' ? (
                        <span className="text-amber-400 font-semibold">null (Varsayılan atanmış)</span>
                      ) : (
                        <span className="text-emerald-400 font-semibold">"Ahmet"</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">Yas (int):</span>
                      {activeConstructorMode === 'default' ? (
                        <span className="text-cyan-400 font-semibold">0 (Varsayılan atanmış)</span>
                      ) : (
                        <span className="text-cyan-400 font-semibold">22</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">KayitliMi (bool):</span>
                      <span className="text-purple-400 font-semibold">false (Varsayılan)</span>
                    </div>

                    <div className="text-[11px] text-slate-400 pt-1 font-sans">
                      {activeConstructorMode === 'default' ? (
                        <span>
                          💡 <strong>Enes Öztürk'ün Vurgusu:</strong> Değer ataması yapmadığımız için varsayılan kurucu string'i <code>null</code>, int'i <code>0</code> olarak set etti!
                        </span>
                      ) : (
                        <span>
                          ✨ <strong>Özel Kurucu:</strong> Argüman olarak gönderdiğimiz değerler kurucu metot tarafından alanlara başarıyla mühürlendi.
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-500 text-xs">
                    Yukarıdaki butona tıklayarak bellek atamasını anında gözlemleyin.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
