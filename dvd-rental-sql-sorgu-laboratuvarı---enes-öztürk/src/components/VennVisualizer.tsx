import React from 'react';
import { SetStats } from '../utils/sqlEngine';
import { ScenarioDefinition } from '../types/database';

interface VennVisualizerProps {
  stats: SetStats;
  currentScenario: ScenarioDefinition;
  onSelectScenario: (id: number) => void;
}

export const VennVisualizer: React.FC<VennVisualizerProps> = ({
  stats,
  currentScenario,
  onSelectScenario,
}) => {
  const isUnion = currentScenario.id === 1 || currentScenario.id === 4;
  const isIntersect = currentScenario.id === 2 || currentScenario.id === 5;
  const isExcept = currentScenario.id === 3 || currentScenario.id === 6;
  const isAll = currentScenario.category === 'all';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <span>Küme Teorisi & Euler/Venn Diyagramı</span>
            <span className="text-xs text-slate-400 font-normal">
              · {isAll ? 'Tekrarlayan Veriler (Multiset / Bag Semantics)' : 'Tekrarsız Veriler (Set Semantics)'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Mevcut İşlem: <strong className="text-amber-400 font-mono">{currentScenario.operationName}</strong> ({currentScenario.mathematicalNotation})
          </p>
        </div>

        {/* Quick Set Statistics Text */}
        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
          <span>Actor: <strong className="text-slate-200 tabular-nums">200</strong> ({stats.actorDistinctNames} tekil)</span>
          <span>·</span>
          <span>Customer: <strong className="text-slate-200 tabular-nums">599</strong> ({stats.customerDistinctNames} tekil)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Venn SVG Stage */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-[16/10]">
            <svg
              viewBox="0 0 500 300"
              className="w-full h-full drop-shadow-md select-none"
            >
              <defs>
                {/* Clip path for Left Circle only */}
                <clipPath id="leftCircleClip">
                  <circle cx="190" cy="150" r="115" />
                </clipPath>
                {/* Clip path for Right Circle only */}
                <clipPath id="rightCircleClip">
                  <circle cx="310" cy="150" r="115" />
                </clipPath>
              </defs>

              {/* Background Glows */}
              {/* Left Circle: Actor */}
              <circle
                cx="190"
                cy="150"
                r="115"
                className={`transition-all duration-300 cursor-pointer ${
                  isUnion || isExcept
                    ? 'fill-amber-500/25 stroke-amber-400 stroke-2'
                    : 'fill-slate-800/60 stroke-slate-700 stroke-1'
                }`}
                onClick={() => onSelectScenario(isAll ? 6 : 3)}
              />

              {/* Right Circle: Customer */}
              <circle
                cx="310"
                cy="150"
                r="115"
                className={`transition-all duration-300 cursor-pointer ${
                  isUnion
                    ? 'fill-amber-500/25 stroke-amber-400 stroke-2'
                    : 'fill-slate-800/60 stroke-slate-700 stroke-1'
                }`}
                onClick={() => onSelectScenario(isAll ? 4 : 1)}
              />

              {/* Intersect Overlap Slice (Left clipped by Right) */}
              <circle
                cx="190"
                cy="150"
                r="115"
                clipPath="url(#rightCircleClip)"
                className={`transition-all duration-300 cursor-pointer ${
                  isIntersect || isUnion
                    ? 'fill-amber-400/40 stroke-amber-300 stroke-2'
                    : 'fill-slate-700/50 stroke-slate-600 stroke-1'
                }`}
                onClick={() => onSelectScenario(isAll ? 5 : 2)}
              />

              {/* Text Labels inside Left: Actor Only */}
              <g className="cursor-pointer" onClick={() => onSelectScenario(isAll ? 6 : 3)}>
                <text x="125" y="135" textAnchor="middle" className="fill-slate-200 text-xs font-bold tracking-wider">
                  ACTOR
                </text>
                <text x="125" y="155" textAnchor="middle" className="fill-amber-300 text-sm font-mono font-bold">
                  {isAll ? `${stats.exceptAllCount}` : `${stats.exceptDistinctCount}`}
                </text>
                <text x="125" y="172" textAnchor="middle" className="fill-slate-400 text-[10px]">
                  {isAll ? 'Frekans Farkı' : 'Sadece Aktör'}
                </text>
              </g>

              {/* Text Labels inside Middle: Intersect */}
              <g className="cursor-pointer" onClick={() => onSelectScenario(isAll ? 5 : 2)}>
                <text x="250" y="135" textAnchor="middle" className="fill-slate-200 text-xs font-bold tracking-wider">
                  KESİŞİM
                </text>
                <text x="250" y="155" textAnchor="middle" className="fill-amber-300 text-sm font-mono font-bold">
                  {isAll ? `${stats.intersectAllCount}` : `${stats.intersectDistinctCount}`}
                </text>
                <text x="250" y="172" textAnchor="middle" className="fill-slate-400 text-[10px]">
                  {isAll ? 'Frekans Kesişimi' : 'Ortak İsimler'}
                </text>
              </g>

              {/* Text Labels inside Right: Customer Only */}
              <g className="cursor-pointer" onClick={() => onSelectScenario(isAll ? 4 : 1)}>
                <text x="375" y="135" textAnchor="middle" className="fill-slate-200 text-xs font-bold tracking-wider">
                  CUSTOMER
                </text>
                <text x="375" y="155" textAnchor="middle" className="fill-slate-300 text-sm font-mono font-bold">
                  {stats.customerDistinctNames - stats.intersectDistinctCount}
                </text>
                <text x="375" y="172" textAnchor="middle" className="fill-slate-400 text-[10px]">
                  Sadece Müşteri
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Set Theory Explanation Deck */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Aktif Küme Dilimi:</span>
              <span className="font-semibold text-amber-400 font-mono">
                {currentScenario.operationName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Sonuç Satır Sayısı:</span>
              <span className="font-bold text-white font-mono tabular-nums">
                {currentScenario.id === 1 && `${stats.unionDistinctCount} tekil satır`}
                {currentScenario.id === 2 && `${stats.intersectDistinctCount} tekil satır`}
                {currentScenario.id === 3 && `${stats.exceptDistinctCount} tekil satır`}
                {currentScenario.id === 4 && `${stats.unionAllCount} satır (200 + 599)`}
                {currentScenario.id === 5 && `${stats.intersectAllCount} satır (min frekans)`}
                {currentScenario.id === 6 && `${stats.exceptAllCount} satır (fazlalıklar)`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Matematiksel İfade:</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {currentScenario.mathematicalNotation}
              </span>
            </div>
          </div>

          {/* Interactive Set Shortcuts */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button
              onClick={() => onSelectScenario(isAll ? 4 : 1)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors text-center cursor-pointer ${
                isUnion ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isAll ? 'UNION ALL' : 'UNION'}
            </button>
            <button
              onClick={() => onSelectScenario(isAll ? 5 : 2)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors text-center cursor-pointer ${
                isIntersect ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isAll ? 'INTERSECT ALL' : 'INTERSECT'}
            </button>
            <button
              onClick={() => onSelectScenario(isAll ? 6 : 3)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors text-center cursor-pointer ${
                isExcept ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isAll ? 'EXCEPT ALL' : 'EXCEPT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
