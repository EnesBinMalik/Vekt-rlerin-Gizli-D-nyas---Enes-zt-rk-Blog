import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  MinusCircle,
  Coins,
  Shield,
  Layers,
} from 'lucide-react';
import { AUDIT_METRICS } from '../data/casesData';

export const MetricsBar: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {/* Total Cases */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 shadow-sm relative overflow-hidden group hover:border-slate-700 transition">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Toplam Vaka
          </span>
          <Layers className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-white">
            {AUDIT_METRICS.totalCases}
          </span>
          <span className="text-[10px] text-cyan-400/80 font-mono">100% Dataset</span>
        </div>
        <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
          <div className="bg-cyan-500 h-full w-full" />
        </div>
      </div>

      {/* Complete */}
      <div className="bg-slate-900/80 border border-emerald-900/40 rounded-xl p-3.5 shadow-sm relative overflow-hidden group hover:border-emerald-700/60 transition">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider">
            Tamamlandı (COMPLETE)
          </span>
          <CheckCircle className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-emerald-300">
            {AUDIT_METRICS.completeCount}
          </span>
          <span className="text-[10px] text-emerald-400/80 font-mono">
            {((AUDIT_METRICS.completeCount / AUDIT_METRICS.totalCases) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-emerald-500 h-full"
            style={{
              width: `${(AUDIT_METRICS.completeCount / AUDIT_METRICS.totalCases) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Incomplete */}
      <div className="bg-slate-900/80 border border-amber-900/40 rounded-xl p-3.5 shadow-sm relative overflow-hidden group hover:border-amber-700/60 transition">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wider">
            İyileştirme (INCOMPLETE)
          </span>
          <AlertTriangle className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-amber-300">
            {AUDIT_METRICS.incompleteCount}
          </span>
          <span className="text-[10px] text-amber-400/80 font-mono">
            {((AUDIT_METRICS.incompleteCount / AUDIT_METRICS.totalCases) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-amber-500 h-full"
            style={{
              width: `${(AUDIT_METRICS.incompleteCount / AUDIT_METRICS.totalCases) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Not Applicable */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 shadow-sm relative overflow-hidden group hover:border-slate-700 transition">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Kapsam Dışı (N/A)
          </span>
          <MinusCircle className="w-4 h-4 text-slate-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-300">
            {AUDIT_METRICS.notApplicableCount}
          </span>
          <span className="text-[10px] text-slate-400/80 font-mono">
            {((AUDIT_METRICS.notApplicableCount / AUDIT_METRICS.totalCases) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-slate-500 h-full"
            style={{
              width: `${(AUDIT_METRICS.notApplicableCount / AUDIT_METRICS.totalCases) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Accuracy Rate */}
      <div className="bg-slate-900/80 border border-indigo-900/40 rounded-xl p-3.5 shadow-sm relative overflow-hidden group hover:border-indigo-700/60 transition">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-indigo-400 uppercase tracking-wider">
            Vaka Doğruluğu
          </span>
          <Shield className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-indigo-300">
            {AUDIT_METRICS.accuracyRate}%
          </span>
          <span className="text-[10px] text-emerald-400 font-mono font-medium">
            %100 Sıralı
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
          <div className="bg-indigo-500 h-full w-[99.4%]" />
        </div>
      </div>

      {/* Model & Token Cost */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 shadow-sm relative overflow-hidden group hover:border-slate-700 transition">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Token Maliyeti
          </span>
          <Coins className="w-4 h-4 text-yellow-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-yellow-300">
            ${AUDIT_METRICS.totalCostUsd.toFixed(2)}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">1.73M Tok</span>
        </div>
        <div className="text-[10px] text-slate-500 truncate mt-1">
          Claude 3.5 Sonnet / GPT-4o
        </div>
      </div>
    </div>
  );
};
