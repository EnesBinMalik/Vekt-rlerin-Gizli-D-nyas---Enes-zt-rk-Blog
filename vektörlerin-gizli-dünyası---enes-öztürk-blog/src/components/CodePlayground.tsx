import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, RefreshCw } from 'lucide-react';

interface CodePlaygroundProps {
  title: string;
  description: string;
  code: string;
  defaultOutput: string;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  title,
  description,
  code,
  defaultOutput,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<string>(defaultOutput);
  const [executionTime, setExecutionTime] = useState<string>('0.042s');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      // Small simulated jitter in random numbers to feel alive
      const randomRatio = (0.9991 + Math.random() * 0.0008).toFixed(4);
      const randomMin = (11.82 + Math.random() * 0.1).toFixed(2);
      const randomMax = (13.91 + Math.random() * 0.1).toFixed(2);
      setOutput(`>>> python portakal_deneyi.py
[Boyut: 100D] 500 Rastgele Nokta Üretildi.
Kabuk Kalınlığı (%5) İç Hacim Oranı: 0.0059 (%0.59)
Maksimum Mesafe: ${randomMax} | Minimum Mesafe: ${randomMin}
Tezat Oranı (Max - Min) / Min: 0.1768  <-- Komşular farksızlaştı!
Sonuç: Noktaların %99.41'i kabuk bölgesine yığıldı.`);
      setExecutionTime(`${(0.035 + Math.random() * 0.02).toFixed(3)}s`);
    }, 450);
  };

  return (
    <div className="my-8 rounded-2xl border border-stone-800 bg-stone-950 text-stone-200 overflow-hidden shadow-xl">
      {/* Code Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 bg-stone-900/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-mono text-xs text-stone-400 ml-2 font-semibold">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-xs"
          >
            {isRunning ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-white" />
            )}
            <span>{isRunning ? 'Hesaplanıyor...' : 'Çalıştır & Test Et'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-lg border border-stone-700 bg-stone-800 px-2.5 py-1 text-xs text-stone-300 hover:bg-stone-700 transition-colors"
            title="Kodu Kopyala"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-stone-300 bg-stone-950">
        <pre>{code}</pre>
      </div>

      {/* Terminal Output */}
      <div className="border-t border-stone-800/80 bg-black/60 p-4">
        <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-2">
          <span className="flex items-center gap-1.5 text-stone-300 font-semibold">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" /> Terminal Çıktısı
          </span>
          <span>Süre: {executionTime}</span>
        </div>
        <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed">
          {output}
        </pre>
      </div>
    </div>
  );
};
