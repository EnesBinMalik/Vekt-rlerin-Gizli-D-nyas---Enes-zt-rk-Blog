import React from 'react';
import { ScenarioDefinition } from '../types/database';
import { SCENARIOS } from '../data/scenarios';
import { Layers, Combine, Split, Hash } from 'lucide-react';

interface ScenarioSelectorProps {
  selectedScenarioId: number;
  onSelectScenario: (id: number) => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  selectedScenarioId,
  onSelectScenario,
}) => {
  const distinctScenarios = SCENARIOS.filter(s => s.category === 'distinct');
  const allScenarios = SCENARIOS.filter(s => s.category === 'all');

  const getIcon = (id: number) => {
    switch (id) {
      case 1:
      case 4:
        return <Combine className="w-4 h-4 text-amber-400" />;
      case 2:
      case 5:
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 3:
      case 6:
        return <Split className="w-4 h-4 text-sky-400" />;
      default:
        return <Hash className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category 1: Tekrarsız Sorgular */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>Bölüm 1: Tekrarsız (Distinct) Sorgular</span>
            <span className="text-xs text-slate-400 font-normal">· İlk 3 Temel Senaryo</span>
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">DISTINCT Filtresi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {distinctScenarios.map(sc => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc.id)}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400/80 shadow-md shadow-amber-500/5 ring-1 ring-amber-400/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-slate-800 border border-slate-700/60">
                      {getIcon(sc.id)}
                    </div>
                    <span className="text-xs font-bold font-mono tracking-wide text-amber-400">
                      {sc.operationName}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Senaryo {sc.id}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {sc.id === 1 && "Tüm Verileri Sıralama"}
                  {sc.id === 2 && "Kesişen Verileri Sıralama"}
                  {sc.id === 3 && "Sadece İlk Tabloda Olanlar"}
                </h4>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {sc.shortDescription}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category 2: Tekrarlayan Veriler İçin */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>Bölüm 2: Tekrarlayan (Duplicates Dahil) Sorgular</span>
            <span className="text-xs text-slate-400 font-normal">· İlk 3 Sorgunun ALL Varyasyonları</span>
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">Frekans Korumalı (ALL)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {allScenarios.map(sc => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc.id)}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400/80 shadow-md shadow-amber-500/5 ring-1 ring-amber-400/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-slate-800 border border-slate-700/60">
                      {getIcon(sc.id)}
                    </div>
                    <span className="text-xs font-bold font-mono tracking-wide text-amber-400">
                      {sc.operationName}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Senaryo {sc.id}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {sc.id === 4 && "Tüm Veriler (Tekrarlı)"}
                  {sc.id === 5 && "Kesişen Veriler (Tekrarlı)"}
                  {sc.id === 6 && "Sadece İlk Tabloda (Tekrarlı)"}
                </h4>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {sc.shortDescription}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
