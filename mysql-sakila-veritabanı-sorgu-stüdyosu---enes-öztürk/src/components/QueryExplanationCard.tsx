import React from 'react';
import { BookOpen, Lightbulb, Compass, Database, ArrowUpDown, Layers, CheckCircle2 } from 'lucide-react';
import { QueryPreset } from '../types/database';

interface QueryExplanationCardProps {
  preset: QueryPreset;
}

export const QueryExplanationCard: React.FC<QueryExplanationCardProps> = ({ preset }) => {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-sm space-y-4">
      {/* Title & Overview */}
      <div className="flex items-start justify-between gap-4 border-b border-[#30363d] pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#38bdf8]" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Sorgu Mantığı & Adım Adım Analiz
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-[#21262d] px-2 py-0.5 rounded border border-[#30363d]">
          {preset.explanation.targetTable}
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed font-sans">
        {preset.explanation.overview}
      </p>

      {/* 3 Step Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        {/* Step 1: Filter */}
        <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#38bdf8] mb-1.5 font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>1. Filtreleme (WHERE)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {preset.explanation.filterCondition}
            </p>
          </div>
        </div>

        {/* Step 2: Sorting */}
        <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1.5 font-mono">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>2. Sıralama (ORDER BY)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {preset.explanation.sortingLogic}
            </p>
          </div>
        </div>

        {/* Step 3: Pagination */}
        <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1.5 font-mono">
              <Layers className="w-3.5 h-3.5" />
              <span>3. Sayfalama (LIMIT)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {preset.explanation.paginationLogic}
            </p>
          </div>
        </div>
      </div>

      {/* MySQL Pro Tip */}
      <div className="bg-[#1a222e] border border-[#30363d] rounded-lg p-3 flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-amber-300 block mb-0.5">
            MySQL Optimizasyon & İpucu:
          </span>
          {preset.explanation.mysqlTip}
        </div>
      </div>
    </div>
  );
};
