import React, { useState, useEffect } from 'react';
import { SIMULATION_STEPS } from '../data/constructorContent';
import { Play, Pause, SkipForward, RotateCcw, Cpu, HardDrive, ArrowRight, Check, Zap } from 'lucide-react';

export const MemorySimulator: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2000); // 2 seconds per step

  // User customizable parameters for the memory test
  const [customName, setCustomName] = useState('Enes');
  const [customAge, setCustomAge] = useState(25);

  const step = SIMULATION_STEPS[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStepIndex < SIMULATION_STEPS.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, playbackSpeed]);

  const handleNext = () => {
    if (currentStepIndex < SIMULATION_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
            <span>02. İnteraktif Bellek Simülatörü</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Stack & Heap Yaşam Döngüsü</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            RAM'de Bir Nesnenin Doğuşu: Adım Adım Constructor
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            <code>Ogrenci ogr = new Ogrenci("{customName}", {customAge});</code> satırı çalıştırıldığında işletim sistemi, derleyici ve CPU'nun bellek üzerinde gerçekleştirdiği 5 aşamayı interaktif olarak izleyin.
          </p>
        </div>

        {/* Live parameter inputs */}
        <div className="flex items-center gap-3 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">Ad:</span>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value || 'Öğrenci')}
              className="w-20 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">Yaş:</span>
            <input
              type="number"
              value={customAge}
              onChange={(e) => setCustomAge(parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Main Two-Zone Sandbox Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center Zone: Interactive Memory Diagram (60-70% width) */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-slate-200">RAM Mimarisi (Stack vs Heap)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Aşama:</span>
              <span className="font-mono text-cyan-300 font-bold">{currentStepIndex + 1} / 5</span>
            </div>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="grid grid-cols-5 gap-2 mb-8">
            {SIMULATION_STEPS.map((s, idx) => (
              <button
                key={s.stepNumber}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`py-2 px-1 text-center rounded-lg text-[11px] font-medium transition-all ${
                  idx === currentStepIndex
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : idx < currentStepIndex
                    ? 'bg-slate-800/80 text-emerald-400 border border-slate-700'
                    : 'bg-slate-950/60 text-slate-500 border border-slate-800'
                }`}
              >
                <div className="font-mono text-[10px] mb-0.5">0{s.stepNumber}</div>
                <div className="truncate px-1">
                  {idx === 0 && 'Stack'}
                  {idx === 1 && 'new & Heap'}
                  {idx === 2 && 'Defaults'}
                  {idx === 3 && 'Constructor'}
                  {idx === 4 && 'Pointer'}
                </div>
              </button>
            ))}
          </div>

          {/* RAM Diagram Canvas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800 relative min-h-[340px]">
            {/* STACK COLUMN */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  STACK (Yığın Bellek)
                </span>
                <span className="text-[10px] font-mono text-slate-500">Hızlı · Yerel</span>
              </div>

              <div className="space-y-3 flex-1">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-2 font-mono">
                    <span>Değişken: <strong className="text-white">ogr1</strong></span>
                    <span className="text-[10px]">64-bit Pointer</span>
                  </div>

                  <div className="p-3 rounded bg-slate-950 border border-slate-800 font-mono text-center">
                    {step.stackState.pointerAddress ? (
                      <div className="text-emerald-400 font-bold text-sm tracking-wider flex items-center justify-center gap-2">
                        <span>{step.stackState.pointerAddress}</span>
                        <Zap className="w-3.5 h-3.5 text-yellow-400" />
                      </div>
                    ) : (
                      <div className="text-slate-600 italic text-xs">
                        {currentStepIndex === 0 ? "0x00000000 (null / unassigned)" : "Adres bekleniyor..."}
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 font-sans">
                    {step.stackState.pointerAddress ? (
                      <span className="text-emerald-400 font-medium">
                        ✓ Heap üzerindeki nesnenin bellek adresi referans olarak bağlandı.
                      </span>
                    ) : (
                      <span>Referans yuvası açık, nesne henüz üretilmedi.</span>
                    )}
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 p-2.5 rounded bg-slate-900/40 border border-slate-800/40">
                  Stack, metot çağrısı bitince anında temizlenir. Asıl nesne verisi Heap'te yaşar.
                </div>
              </div>
            </div>

            {/* HEAP COLUMN */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  HEAP (Öbek Bellek)
                </span>
                <span className="text-[10px] font-mono text-cyan-400">Dinamik Alan</span>
              </div>

              {step.heapState.allocated ? (
                <div className="p-4 rounded-lg bg-slate-900 border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs font-mono">
                      <span className="text-yellow-300 font-bold">Ogrenci Instance</span>
                      <span className="text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                        {step.heapState.address}
                      </span>
                    </div>

                    <div className="space-y-2 font-mono text-xs">
                      {/* Ad field */}
                      <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Ad (string):</span>
                        {currentStepIndex <= 1 && (
                          <span className="text-slate-600 italic">0x0000 (ham)</span>
                        )}
                        {currentStepIndex === 2 && (
                          <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">
                            null (Varsayılan)
                          </span>
                        )}
                        {currentStepIndex >= 3 && (
                          <span className="text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded">
                            "{customName}"
                          </span>
                        )}
                      </div>

                      {/* Yas field */}
                      <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Yas (int):</span>
                        {currentStepIndex <= 1 && (
                          <span className="text-slate-600 italic">0x00 (ham)</span>
                        )}
                        {currentStepIndex === 2 && (
                          <span className="text-cyan-400 font-bold bg-cyan-400/10 px-1.5 py-0.5 rounded">
                            0 (Varsayılan)
                          </span>
                        )}
                        {currentStepIndex >= 3 && (
                          <span className="text-cyan-400 font-bold bg-cyan-400/10 px-1.5 py-0.5 rounded">
                            {customAge}
                          </span>
                        )}
                      </div>

                      {/* KayitliMi field */}
                      <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">KayitliMi (bool):</span>
                        {currentStepIndex <= 1 ? (
                          <span className="text-slate-600 italic">0x00</span>
                        ) : (
                          <span className="text-purple-400 font-bold bg-purple-400/10 px-1.5 py-0.5 rounded">
                            false (Varsayılan)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                    {currentStepIndex === 2 && (
                      <span className="text-amber-300">
                        ✦ <strong>Varsayılan Kurucu Etkisi:</strong> string = null, int = 0 olarak atandı!
                      </span>
                    )}
                    {currentStepIndex === 3 && (
                      <span className="text-emerald-300">
                        ✦ <strong>Kurucu Gövdesi Çalıştı:</strong> Girilen değerler alanlara mühürlendi.
                      </span>
                    )}
                    {currentStepIndex >= 4 && (
                      <span className="text-cyan-300">
                        ✦ Nesne Heap üzerinde tam anlamıyla yaşamaya başladı.
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 rounded-lg bg-slate-900/40 border border-dashed border-slate-800 text-center">
                  <HardDrive className="w-8 h-8 text-slate-700 mb-2" />
                  <span className="text-xs text-slate-500 font-medium">Heap Henüz Tahsis Edilmedi</span>
                  <span className="text-[11px] text-slate-600 mt-1">'new' anahtarı bekleniyor...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Zone: Control Deck & Concept Annotations (30-40% width) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Current Step Description Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wide">
                AŞAMA {step.stepNumber} / 5
              </span>
              <span className="text-[11px] text-slate-400">
                {step.phase.toUpperCase()}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-snug">
              {step.title}
            </h3>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 mb-3 overflow-x-auto">
              <code>{step.codeLine}</code>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {step.explanation}
            </p>

            {/* Step Controls */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs text-slate-200 transition-colors"
                >
                  Geri
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStepIndex === SIMULATION_STEPS.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <span>İleri</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-2 rounded-lg transition-colors text-xs flex items-center gap-1 ${
                    isPlaying
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                  title={isPlaying ? "Durdur" : "Otomatik Oynat"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Başa Dön"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Speed control slider */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Oynatma Hızı:</span>
              <span className="font-mono text-cyan-400 font-semibold">{playbackSpeed / 1000}s / adım</span>
            </div>
            <input
              type="range"
              min="1000"
              max="4000"
              step="500"
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Enes Öztürk quote callout */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs text-slate-300 leading-relaxed">
            <span className="text-cyan-400 font-semibold block mb-1 font-mono text-[11px]">
              ENES ÖZTÜRK NOTU
            </span>
            "Default constructor'ın en hayati görevi, bellekte rastgele çöp değerler (garbage memory) kalmasını önleyerek string alanları null, sayısal alanları ise 0 olarak sterilize etmektir."
          </div>
        </div>
      </div>
    </section>
  );
};
