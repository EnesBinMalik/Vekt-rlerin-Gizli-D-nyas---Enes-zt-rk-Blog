import React, { useState } from 'react';
import { UserCheck, Check, Copy, Sparkles, Database, Mail, MapPin, Store } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MarySpotlightProps {
  onRunMaryQuery: () => void;
}

export const MarySpotlight: React.FC<MarySpotlightProps> = ({ onRunMaryQuery }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAnswer = () => {
    navigator.clipboard.writeText('SMITH');
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-cyan-950/30 p-6 shadow-2xl backdrop-blur-xl">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Senaryo 4 Cevap Özeti & Doğrulama</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <UserCheck className="h-6 w-6 text-emerald-400" />
              Müşteri Mary'nin Soyadı (last_name):
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              DVD Rental ve Sakila örnek veri tabanındaki <code className="text-cyan-300 bg-slate-800/80 px-1.5 py-0.5 rounded font-mono text-xs">customer</code> tablosunda, 
              <code className="text-cyan-300 bg-slate-800/80 px-1.5 py-0.5 rounded font-mono text-xs">first_name = 'Mary'</code> olan müşterinin soyadı tam olarak aşağıdadır:
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center gap-2 bg-slate-950/90 border-2 border-emerald-500/60 rounded-xl px-5 py-3 shadow-inner">
              <span className="text-xs uppercase font-mono text-slate-400 font-bold">last_name =</span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono tracking-wider">
                SMITH
              </span>
            </div>

            <button
              onClick={handleCopyAnswer}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 text-sm font-semibold shadow-lg shadow-emerald-950 transition-all hover:scale-102 active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Cevabı Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={onRunMaryQuery}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/60 px-4 py-3 text-sm font-medium transition-colors"
            >
              <Database className="h-4 w-4" />
              <span>Sorguyu Canlı Doğrula</span>
            </button>
          </div>
        </div>

        {/* Customer Mini Card Preview */}
        <div className="rounded-xl border border-slate-700/60 bg-slate-900/90 p-4 min-w-[270px] shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span className="text-xs font-mono uppercase text-slate-400">customer_id: #1</span>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 rounded-full">
              Aktif Müşteri
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Ad & Soyad:</span>
              <span className="font-bold text-white font-mono">Mary SMITH</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500 flex items-center gap-1">
                <Mail className="h-3 w-3" /> E-posta:
              </span>
              <span className="font-mono text-[11px] text-cyan-300">mary.smith@...</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500 flex items-center gap-1">
                <Store className="h-3 w-3" /> Mağaza:
              </span>
              <span className="font-mono text-slate-300">Store #1</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> Adres ID:
              </span>
              <span className="font-mono text-slate-300">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
