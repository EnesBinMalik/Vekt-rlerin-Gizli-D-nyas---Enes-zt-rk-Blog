import React, { useState } from 'react';
import { PITFALLS } from '../data/constructorContent';
import { AlertCircle, CheckCircle2, XCircle, Code2, ShieldAlert } from 'lucide-react';

export const PitfallsSection: React.FC = () => {
  const [selectedPitfallId, setSelectedPitfallId] = useState<string>(PITFALLS[0].id);

  const activePitfall = PITFALLS.find((p) => p.id === selectedPitfallId) || PITFALLS[0];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <span>04. Kritik Tuzaklar & Hata Analizi</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Derleyici Davranışları</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Constructor Tanımlarken Sık Yapılan 4 Büyük Hata
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-3xl leading-relaxed">
          Kurucu metot kurallarının ihlali bazen derleme hatası verirken, bazen de derleyicinin sessizce kodu kabul edip çalışma zamanında beklenmeyen felaketlere yol açmasına neden olur.
        </p>
      </div>

      {/* Trap Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {PITFALLS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setSelectedPitfallId(item.id)}
            className={`p-4 rounded-xl text-left border transition-all ${
              selectedPitfallId === item.id
                ? 'bg-slate-900 border-red-500/60 shadow-md shadow-red-500/5'
                : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-[11px] font-mono text-red-400 mb-1">TUZAK 0{idx + 1}</div>
            <div className="text-xs font-bold text-white mb-1">{item.title.split(':')[1]?.trim() || item.title}</div>
            <div className="text-[11px] text-slate-400 line-clamp-2">{item.description}</div>
          </button>
        ))}
      </div>

      {/* Comparison Grid: Bad Code vs Good Code */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span>{activePitfall.title}</span>
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            {activePitfall.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* BAD CODE */}
          <div className="bg-slate-950 rounded-xl border border-red-900/50 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-red-950/20 border-b border-red-900/40">
              <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                <span>YANLIŞ KULLANIM (Antipattern)</span>
              </span>
            </div>

            <pre className="p-4 text-xs font-mono text-red-200/90 leading-relaxed overflow-x-auto flex-1 bg-red-950/5">
              <code>{activePitfall.badCode}</code>
            </pre>

            <div className="p-4 bg-red-950/30 border-t border-red-900/30 text-xs text-red-300/90 leading-relaxed">
              <strong>Neden Hatalı?</strong> {activePitfall.badReason}
            </div>
          </div>

          {/* GOOD CODE */}
          <div className="bg-slate-950 rounded-xl border border-emerald-900/50 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-emerald-950/20 border-b border-emerald-900/40">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>DOĞRU KULLANIM (En İyi Pratik)</span>
              </span>
            </div>

            <pre className="p-4 text-xs font-mono text-emerald-200/90 leading-relaxed overflow-x-auto flex-1 bg-emerald-950/5">
              <code>{activePitfall.goodCode}</code>
            </pre>

            <div className="p-4 bg-emerald-950/30 border-t border-emerald-900/30 text-xs text-emerald-300/90 leading-relaxed">
              <strong>Doğru Yaklaşım:</strong> {activePitfall.goodReason}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
